#!/usr/bin/env python3
"""
Prepare the owner-supplied hero portrait.

The hero image is not a TikTok post, so it is handled separately from the
content pipeline: it is encoded into public/assets/hero/ and is intentionally
NOT added to content-inventory.json, which documents published content only.
"""
import os

from PIL import Image

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "raw-assets", "hero", "hero-source.png")
OUT = os.path.join(BASE, "public", "assets", "hero")

CANDIDATE_WIDTHS = (480, 900, 1200)
QUALITY = 90


def main():
    if not os.path.exists(SRC):
        raise SystemExit(f"hero source not found: {SRC}")

    os.makedirs(OUT, exist_ok=True)
    im = Image.open(SRC).convert("RGB")
    native = im.width

    widths = sorted({w for w in CANDIDATE_WIDTHS if w < native} | {native})
    for w in widths:
        h = int(round(im.height * (w / im.width)))
        out = im if w == native else im.resize((w, h), Image.LANCZOS)
        path = os.path.join(OUT, f"hero-{w}.webp")
        out.save(path, "WEBP", quality=QUALITY, method=6)
        print(f"hero-{w}.webp  {w}x{h}  {round(os.path.getsize(path)/1024)} KB")

    print("native source:", native, "px")
    print("srcset:", ", ".join(f"/assets/hero/hero-{w}.webp {w}w" for w in widths))


if __name__ == "__main__":
    main()
