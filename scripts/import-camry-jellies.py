#!/usr/bin/env python3
"""Copy a Toyota.ca Camry jelly folder into the site as 16-frame PNG turntables.

Source layout (folder names from the user dump):

  Camry Hybrid SE FWD/White/000_0deg_ft_front.png
  Camry Hybrid XSE AWD/Wind Chill Pearl with Black Roof/045_0deg_....png

Each colour is copied byte-for-byte to:

  public/jellies/camry/{trim}/{paint}/1.png … 16.png
  jellies/camry/{trim}/{paint}/1.png … 16.png

Then TRIM_SPINS in src/lib/assets.generated.ts is rewritten.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src/lib/assets.generated.ts"

TRIM_FOLDERS = {
    "Camry Hybrid SE FWD": "se",
    "Camry Hybrid SE FWD (SE Upgrade FWD)": "se-upgrade",
    "Camry Hybrid SE Upgrade AWD": "se-upgrade-awd",
    "Camry Hybrid SE Upgrade AWD (Nightshade)": "nightshade",
    "Camry Hybrid XLE AWD": "xle",
    "Camry Hybrid XSE AWD": "xse",
}

PAINT_FOLDERS = {
    "Midnight Black Metallic": "midnight-black",
    "Supersonic Red": "supersonic-red",
    "Underground": "underground",
    "White": "ice-cap",
    "Heavy Metal": "heavy-metal",
    "Cosmos Blue": "dark-cosmos",
    "Ocean Gem": "ocean-gem",
    "Wind Chill Pearl": "wind-chill",
    "Heavy Metal with Black Roof": "heavy-metal-black-roof",
    "Ocean Gem with Black Roof": "ocean-gem-black-roof",
    "Wind Chill Pearl with Black Roof": "wind-chill-black-roof",
}

ANGLE_RE = re.compile(r"^(\d+)_")


def install_combo(src_dir: Path, trim_id: str, paint_id: str) -> bool:
    frames = []
    for p in src_dir.glob("*.png"):
        m = ANGLE_RE.match(p.name)
        if m:
            frames.append((int(m.group(1)), p))
    frames.sort()
    if len(frames) != 16:
        print(f"  skip {src_dir} — {len(frames)} pngs, need 16")
        return False
    dests = [
        ROOT / "public/jellies/camry" / trim_id / paint_id,
        ROOT / "jellies/camry" / trim_id / paint_id,
    ]
    for dest in dests:
        dest.mkdir(parents=True, exist_ok=True)
        for old in dest.glob("*"):
            if old.suffix.lower() in {".png", ".webp", ".jpg"}:
                old.unlink()
    for i, (_, src) in enumerate(frames, 1):
        im = Image.open(src).convert("RGBA")
        for dest in dests:
            im.save(dest / f"{i}.png", "PNG")
    print(f"  {trim_id}/{paint_id}  ({frames[0][1].name} … {frames[-1][1].name})")
    return True


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
        raise SystemExit("could not patch TRIM_SPINS in assets.generated.ts")
    ASSETS.write_text(text2)


def collect_existing() -> list[str]:
    keys = []
    root = ROOT / "public/jellies/camry"
    if not root.exists():
        return keys
    for trim_dir in root.iterdir():
        if not trim_dir.is_dir() or trim_dir.name == "trims":
            continue
        for paint_dir in trim_dir.iterdir():
            if paint_dir.is_dir() and (paint_dir / "1.png").exists() and (paint_dir / "16.png").exists():
                keys.append(f"camry/{trim_dir.name}/{paint_dir.name}")
    return keys


def main() -> None:
    src_root = Path(sys.argv[1]).expanduser().resolve() if len(sys.argv) > 1 else ROOT / "incoming/camry"
    if not src_root.exists():
        raise SystemExit(f"source folder not found: {src_root}")

    installed: list[str] = []
    for folder, trim_id in TRIM_FOLDERS.items():
        trim_path = src_root / folder
        if not trim_path.is_dir():
            # allow already-normalized incoming/camry/se/white
            alt = src_root / trim_id
            trim_path = alt if alt.is_dir() else None
        if trim_path is None or not trim_path.is_dir():
            continue
        for child in sorted(trim_path.iterdir()):
            if not child.is_dir():
                continue
            paint_id = PAINT_FOLDERS.get(child.name, child.name)
            if install_combo(child, trim_id, paint_id):
                installed.append(f"camry/{trim_id}/{paint_id}")

    keys = sorted(set(collect_existing() + installed))
    rewrite_trim_spins(keys)
    print(f"done — {len(keys)} Camry 360 sets")


if __name__ == "__main__":
    main()
