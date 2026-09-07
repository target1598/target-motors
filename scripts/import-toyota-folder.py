#!/usr/bin/env python3
"""Install every Toyota 16-frame jelly from the uploaded model zips.

Source layout:
  ModelZip/Inner/Trim folder/Color folder/000_0deg_....png

Writes:
  public/jellies/{slug}/{trimId}/{paintId}/1.png … 16.png

Rewrites TRIM_SPINS in src/lib/assets.generated.ts.
Prints the folder-driven trim/color map used to rebuild cars.ts.
"""
from __future__ import annotations

import re
import shutil
from collections import defaultdict
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src/lib/assets.generated.ts"
SRC = Path("/tmp/toyota-2026")
DEST_ROOT = ROOT / "public/jellies"
ANGLE_RE = re.compile(r"^(\d+)_")

# zip-root folder -> site slug
MODEL_SLUG = {
    "4Runner_2026": "4runner",
    "Camry_2026": "camry",
    "Crown_2026": "crown",
    "Grand_Highlander_2026": "grand-highlander",
    "Grand_Highlander_Hybrid_2026": "grand-highlander",
    "Land_Cruiser_2027": "land-cruiser",
    "Prius_PHEV_2027": "prius-phev",
    "RAV4_Plug-in_Hybrid_2026": "rav4-prime",
    "Sequoia_2026": "sequoia",
    "Sienna_2026": "sienna",
}

TRIM_MAP = {
    "4Runner": "sr5",
    "4Runner (Limited 7 Passenger)": "limited",
    "4Runner (TRD Off Road Premium)": "trd-off-road",
    "4Runner (TRD Sport)": "trd-sport",
    "Camry Hybrid SE FWD": "se",
    "Camry Hybrid SE FWD (SE Upgrade FWD)": "se-upgrade",
    "Camry Hybrid SE Upgrade AWD": "se-upgrade-awd",
    "Camry Hybrid SE Upgrade AWD (Nightshade)": "nightshade",
    "Camry Hybrid XLE AWD": "xle",
    "Camry Hybrid XSE AWD": "xse",
    "Crown Limited": "limited",
    "Crown Platinum": "platinum",
    "Limited": "limited",
    "XLE": "xle",
    "Grand Highlander Hybrid Limited (Limited 7-Pass)": "hybrid-limited-7",
    "Grand Highlander Hybrid Limited (Limited 8-Pass)": "hybrid-limited-8",
    "Grand Highlander Hybrid Platinum Hybrid MAX": "platinum",
    "Grand Highlander Hybrid XLE": "hybrid-xle",
    "Land Cruiser": "land-cruiser",
    "Land Cruiser (Land Cruiser Premium)": "premium",
    "Land Cruiser 1958": "1958",
    "Prius Plug-in Hybrid SE": "se",
    "Prius Plug-in Hybrid XSE": "xse",
    "Prius Plug-in Hybrid XSE Premium": "xse-premium",
    "RAV4 Plug-in Hybrid GR SPORT AWD": "gr-sport",
    "RAV4 Plug-in Hybrid SE AWD": "se",
    "RAV4 Plug-in Hybrid XSE AWD": "xse",
    "RAV4 Plug-in Hybrid XSE AWD (XSE Technology)": "xse-tech",
    "Sequoia Capstone": "capstone",
    "Sequoia Capstone (Capstone (with Towing Mirrors))": "capstone-tow",
    "Sequoia Limited (Nightshade Edition)": "nightshade",
    "Sequoia Limited (TRD Pro)": "trd-pro",
    "Sequoia Platinum": "platinum",
    "Sequoia Platinum (Platinum (with Towing Mirrors))": "platinum-tow",
    "Sequoia SR5 TRD Off Road": "sr5-trd-off-road",
    "Sienna LE AWD 8-Pass": "le-awd",
    "Sienna LE AWD 8-Pass (Sienna LE Mobility)": "le-awd-mobility",
    "Sienna LE FWD 8-Pass": "le-fwd",
    "Sienna LE FWD 8-Pass (Sienna LE Mobility)": "le-fwd-mobility",
    "Sienna Limited AWD 7-Pass": "limited",
    "Sienna Limited AWD 7-Pass (Platinum)": "platinum",
    "Sienna XLE FWD 8-Pass": "xle",
    "Sienna XLE FWD 8-Pass (Sienna XLE Mobility)": "xle-mobility",
    "Sienna XSE AWD 7-Pass": "xse-awd",
    "Sienna XSE AWD 7-Pass (Sienna XSE Mobility)": "xse-mobility",
    "Sienna XSE AWD 7-Pass (XSE Technology)": "xse-tech",
    "Sienna XSE FWD 7-Pass": "xse-fwd",
}

PAINT_MAP = {
    "White": "ice-cap",
    "Black": "midnight-black",
    "Midnight Black Metallic": "midnight-black",
    "Supersonic Red": "supersonic-red",
    "Underground": "underground",
    "Heavy Metal": "heavy-metal",
    "Wind Chill Pearl": "wind-chill",
    "Ocean Gem": "ocean-gem",
    "Cosmos Blue": "dark-cosmos",
    "Heavy Metal with Black Roof": "heavy-metal-black-roof",
    "Ocean Gem with Black Roof": "ocean-gem-black-roof",
    "Wind Chill Pearl with Black Roof": "wind-chill-black-roof",
    "Oxygen White": "oxygen-white",
    "Finish Line Red": "finish-line-red",
    "Blueprint": "blueprint",
    "Storm Cloud": "storm-cloud",
    "Celestial Silver Metallic": "celestial-silver",
    "Ruby Flare Pearl": "ruby-flare",
    "Cement": "cement",
    "Brown Sugar Metallic": "brown-sugar",
    "Ink": "ink",
    "Heritage Blue": "heritage-blue",
    "Heritage Blue with Light Grey Roof": "heritage-blue-grey-roof",
    "Trail Dust with Light Grey Roof": "trail-dust-grey-roof",
    "Cutting Edge Silver": "cutting-edge",
    "Guardian Gray": "guardian-gray",
    "Maximum Yellow": "maximum-yellow",
    "Reservoir Blue": "reservoir-blue",
    "Storm Cloud with Black Roof": "storm-cloud-black-roof",
    "Supersonic Red with Black Roof": "supersonic-red-black-roof",
    "Brown Sugar Metallic with Black Roof": "brown-sugar-black-roof",
    "Magnetic Grey Metallic": "magnetic-gray",
    "Lunar Rock": "lunar-rock",
    "Wave Maker": "wave-maker",
    "Mudbath": "mudbath",
}


def discover():
    combos = []
    for model_dir in sorted(SRC.iterdir()):
        if not model_dir.is_dir():
            continue
        slug = MODEL_SLUG.get(model_dir.name)
        if not slug:
            raise SystemExit(f"unknown model folder {model_dir.name}")
        for color_dir in model_dir.rglob("*"):
            if not color_dir.is_dir():
                continue
            frames = []
            for p in color_dir.glob("*.png"):
                m = ANGLE_RE.match(p.name)
                if m:
                    frames.append((int(m.group(1)), p))
            if len(frames) != 16:
                continue
            frames.sort()
            trim_name = color_dir.parent.name
            paint_name = color_dir.name
            trim_id = TRIM_MAP.get(trim_name)
            paint_id = PAINT_MAP.get(paint_name)
            if not trim_id:
                raise SystemExit(f"unmapped trim: {trim_name} ({color_dir})")
            if not paint_id:
                raise SystemExit(f"unmapped paint: {paint_name} ({color_dir})")
            combos.append((slug, trim_id, paint_id, frames, trim_name, paint_name))
    return combos


def install(combos):
    keys = []
    for i, (slug, trim_id, paint_id, frames, _tn, _pn) in enumerate(combos, 1):
        dest = DEST_ROOT / slug / trim_id / paint_id
        dest.mkdir(parents=True, exist_ok=True)
        for old in dest.glob("*"):
            if old.suffix.lower() in {".png", ".webp", ".jpg"}:
                old.unlink()
        ims = []
        for _, src in frames:
            ims.append(Image.open(src).convert("RGBA"))
        for n, im in enumerate(ims, 1):
            im.save(dest / f"{n}.png", "PNG", compress_level=6)
            im.close()
        keys.append(f"{slug}/{trim_id}/{paint_id}")
        if i % 15 == 0 or i == len(combos):
            print(f"  {i}/{len(combos)}  {slug}/{trim_id}/{paint_id}")
    return keys


def rewrite_trim_spins(keys: list[str]) -> None:
    text = ASSETS.read_text()
    block = "export const TRIM_SPINS: string[] = [\n" + "".join(f'  "{k}",\n' for k in sorted(set(keys))) + "];"
    text2, n = re.subn(
        r"export const TRIM_SPINS: string\[\] = \[[^\]]*\]",
        block,
        text,
        count=1,
        flags=re.S,
    )
    if n != 1:
        raise SystemExit("could not patch TRIM_SPINS")
    ASSETS.write_text(text2)


def main():
    combos = discover()
    print(f"found {len(combos)} 16-frame sets")
    by = defaultdict(lambda: defaultdict(list))
    for slug, trim_id, paint_id, _f, trim_name, paint_name in combos:
        by[slug][trim_id].append((paint_id, paint_name, trim_name))
    for slug, trims in by.items():
        print(f"\n== {slug} ==")
        for trim_id, paints in trims.items():
            names = ", ".join(p[0] for p in paints)
            print(f"  {trim_id} ({paints[0][2]}): {names}")
    keys = install(combos)
    rewrite_trim_spins(keys)
    print(f"\ndone — {len(keys)} TRIM_SPINS")


if __name__ == "__main__":
    main()
