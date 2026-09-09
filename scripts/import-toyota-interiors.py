#!/usr/bin/env python3
"""Import the supplied Toyota interior index and every available view, by exact trim/code.

Usage: python scripts/import-toyota-interiors.py path/to/archive.zip
Preserves image dimensions and transparency, encoding WebP for the website.
Missing packages stay empty; images are never borrowed from another trim.
"""
from __future__ import annotations

import csv
import io
import json
import re
import runpy
import sys
import zipfile
from collections import defaultdict
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TRIMS = runpy.run_path(str(ROOT / "scripts/import-toyota-folder.py"))["TRIM_MAP"]
SLUGS = {"prius-plug-in-hybrid": "prius-phev", "rav4-plug-in-hybrid": "rav4-prime"}
VIEWS = ("side", "driver", "passenger", "bird")
COLORS = {
    "Black": ("שחור", "#202020"), "Black / Red": ("שחור / אדום", "linear-gradient(135deg, #202020 50%, #86252b 50%)"),
    "Cockpit Red": ("אדום קוקפיט", "#86252b"), "Red": ("אדום", "#86252b"),
    "Gray": ("אפור", "#999a96"), "Grey": ("אפור", "#999a96"),
    "Gray/ Black": ("אפור / שחור", "linear-gradient(135deg, #aaa9a4 50%, #202020 50%)"),
    "Seat: Grey/Black": ("אפור / שחור", "linear-gradient(135deg, #aaa9a4 50%, #202020 50%)"),
    "Java": ("ג׳אווה", "#674332"), "Macadamia": ("מקדמיה", "#c4ad8c"),
    "Portobello": ("פורטובלו", "#796252"), "Shale": ("שייל", "#c8c3b7"),
}
MATERIALS = {
    "Cloth": "בד", "Fabric": "בד", "Leather": "עור", "Mixed Fabric & SofTex": "בד וסופטקס",
    "Mixed Synthetic Suede & Softex": "זמש סינתטי וסופטקס", "Quilting Leather": "עור בתפירת קווילט",
    "Semi-Aniline Leather": "עור חצי־אנילין", "SofTex/Fabric": "סופטקס ובד", "SofTex": "סופטקס",
    "Softex": "סופטקס", "Sports Leather": "עור ספורטיבי",
}


def main(archive_path: str):
    with zipfile.ZipFile(archive_path) as archive:
        names = archive.namelist()
        index = next(n for n in names if n.endswith("/interior_index.csv"))
        rows = list(csv.DictReader(io.StringIO(archive.read(index).decode("utf-8-sig"))))
        # Match folders by exact vehicle, trim and Toyota upholstery code; ignore ZIP trademark encoding.
        images = defaultdict(dict)
        for name in names:
            parts = name.split("/")
            if not name.lower().endswith(".png"):
                continue
            if len(parts) != 5 or Path(parts[-1]).stem not in VIEWS:
                raise ValueError(f"Unexpected image path: {name}")
            model, year = parts[1].rsplit("_", 1)
            code = parts[3].rsplit("_", 1)[-1].upper()
            key = (model, year, parts[2], code)
            images[key][Path(parts[-1]).stem] = name

        registry = defaultdict(dict)
        gaps = set()
        used = set()
        installed = []
        total_bytes = 0
        for row in rows:
            slug = SLUGS.get(row["slug"], row["slug"])
            trim = TRIMS[row["trim_name"]]
            code = row["interior_code"].upper()
            if not re.fullmatch(r"[A-Z0-9]+", code):
                raise ValueError(f"Invalid interior code: {code}")
            options = registry[slug].setdefault(trim, [])
            if any(o["id"] == code.lower() for o in options):
                continue
            key = (row["model_name"], row["year"], row["trim_name"], code)
            sources = images.get(key, {})
            if not sources:
                gaps.add(f"{slug}/{trim}")
                continue
            color = row["interior_color_name"]
            material = row["interior_trim_name"].replace("®", "").replace("\ufffd", "").strip()
            color_he, hex_value = COLORS[color]
            material_he = MATERIALS[material]
            suffix = f" · {code}" if color == "Seat: Grey/Black" else ""
            choice = {"id": code.lower(), "code": code,
                      "name": {"en": f"{color.removeprefix('Seat: ')} {material}{suffix}", "he": f"{material_he} {color_he}{suffix}"},
                      "hex": hex_value, "views": []}
            destination = ROOT / "public/interiors/toyota" / slug / trim / code.lower()
            if not destination.resolve().is_relative_to((ROOT / "public/interiors/toyota").resolve()):
                raise ValueError("Interior destination is outside the asset directory")
            destination.mkdir(parents=True, exist_ok=True)
            for view in VIEWS:
                source = sources.get(view)
                if not source:
                    continue
                dest = destination / f"{view}.webp"
                with Image.open(io.BytesIO(archive.read(source))) as image:
                    image.save(dest, "WEBP", quality=90, method=6)
                choice["views"].append({"id": view, "src": dest.relative_to(ROOT / "public").as_posix()})
                used.add(source)
                installed.append(dest.relative_to(ROOT).as_posix())
                total_bytes += dest.stat().st_size
            options.append(choice)
        supplied = {name for views in images.values() for name in views.values()}
        if supplied != used:
            raise ValueError(f"Unmapped supplied images: {sorted(supplied - used)}")
        output = {slug: {trim: options for trim, options in sorted(trims.items())} for slug, trims in sorted(registry.items())}
        header = "// Generated by scripts/import-toyota-interiors.py from the supplied Toyota index.\n"
        header += 'export type InteriorView = "side" | "driver" | "passenger" | "bird";\n'
        header += 'export type ToyotaInterior = { id: string; code: string; name: { he: string; en: string }; hex: string; views: { id: InteriorView; src: string }[] };\n'
        text = header + "export const TOYOTA_INTERIORS: Record<string, Record<string, ToyotaInterior[]>> = " + json.dumps(output, ensure_ascii=False, indent=2) + ";\n"
        (ROOT / "src/lib/toyota-interiors.generated.ts").write_text(text, encoding="utf-8")
        print(json.dumps({"vehicles": len(output), "trims": sum(map(len, output.values())), "interiorOptions": sum(len(o) for t in output.values() for o in t.values()), "images": len(installed), "webpBytes": total_bytes, "missingTrimPhotos": sorted(gaps)}, indent=2))


if __name__ == "__main__":
    main(sys.argv[1])
