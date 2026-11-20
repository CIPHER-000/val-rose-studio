#!/usr/bin/env python3
"""
Prepare web assets for the Val Rose Studio site.

Reads raw-assets/ and emits responsive, optimised images into public/assets/
plus a content inventory (JSON + Markdown) recording each asset's source post.

Crispness rules:
  * every image gets responsive variants up to its NATIVE width (never upscaled),
  * the largest variant is always the source resolution,
  * WebP is encoded at q92 with method=6 (near-visual-lossless, sharp detail).
The site then picks a variant with <img srcset/sizes>, so no second re-encode and
no browser-side upscaling happens.
"""
import json
import os

from PIL import Image

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(BASE, "raw-assets")
PUB = os.path.join(BASE, "public", "assets")

# slug -> post id, title, category
POSTS = {
    # fashion
    "lukacev-couture": ("7709115570213424391", "Lukacev Couture", "fashion"),
    "street-style-bags": ("7704416610462780690", "Street Style & Statement Bags", "fashion"),
    "trinity-collection": ("7702112550586141970", "The Trinity Collection", "fashion"),
    "burgundy-looks": ("7701978198073969928", "Burgundy Looks", "fashion"),
    "runway-collection": ("7706928361880210706", "Runway Edit", "fashion"),
    "streetwear-sneakers": ("7706059500494572808", "Streetwear & Sneakers", "fashion"),
    "paris-fashion-week": ("7708516666623200520", "Paris Fashion Week", "fashion"),
    "navy-burgundy": ("7706521375812390151", "Navy & Burgundy", "fashion"),
    "halloween-romance": ("7702795356060339474", "Halloween Romance", "fashion"),
    "halloween-peek": ("7702224676579298568", "Halloween Preview", "fashion"),
    "halloween-looks": ("7702535243588291847", "Halloween Looks", "fashion"),
    "tom-ford-editorial": ("7702221003094641938", "Tom Ford Editorial", "fashion"),
    "city-coffee": ("7702506225749085458", "City & Coffee", "fashion"),
    "parisian-summer": ("7702479453288484114", "Parisian Summer", "fashion"),
    "ootd-styling": ("7702478324743851272", "Everyday Styling", "fashion"),
    # beauty / skincare
    "sultry-fragrance": ("7707948802816281874", "Sultry Extrait de Parfum", "beauty"),
    # lifestyle
    "green-door-candle": ("7708144920048979218", "Green Door Candle Co.", "lifestyle"),
}

VIDEOS = {
    "beauty-7705255935966547207": ("7705255935966547207", "Morning Glow — Squalane Routine", "skincare"),
    "beauty-7707596540352744712": ("7707596540352744712", "Bone & Bees — Tallow & Honey", "skincare"),
    "haircare-7709816611305262344": ("7709816611305262344", "Get Ready — Skin & Hair", "haircare"),
    "fashion-7702357591774661895": ("7702357591774661895", "Autumn Street Style", "fashion"),
}

# Candidate widths. Each is only used if the source is at least that wide, and the
# native width is always added as the top variant, so nothing is ever upscaled.
CANDIDATE_WIDTHS = (480, 900, 1200, 1600)
QUALITY = 88
TIKTOK = "https://www.tiktok.com/@valrose.studio0"

# Folders that are not published content: the hero portrait has its own script
# and anything prefixed with "_" is deliberately held back.
SKIP_DIRS = {"hero", "_unused"}


def out_dir(cat):
    d = os.path.join(PUB, cat)
    os.makedirs(d, exist_ok=True)
    return d


def widths_for(native):
    ws = [w for w in CANDIDATE_WIDTHS if w < native]
    ws.append(native)  # always include the source resolution
    return sorted(set(ws))


def process_image(src_path, cat, slug, idx):
    im = Image.open(src_path).convert("RGB")
    native = im.width
    variants = {}
    for w in widths_for(native):
        h = int(round(im.height * (w / im.width)))
        r = im if w == native else im.resize((w, h), Image.LANCZOS)
        name = f"{slug}-{idx:02d}-{w}.webp"
        path = os.path.join(out_dir(cat), name)
        r.save(path, "WEBP", quality=QUALITY, method=6)
        variants[w] = {
            "file": f"/assets/{cat}/{name}",
            "w": w,
            "h": h,
            "kb": round(os.path.getsize(path) / 1024, 1),
        }

    ordered = [variants[w] for w in sorted(variants)]
    biggest = ordered[-1]
    return {
        "slug": slug,
        "index": idx,
        "category": cat,
        "width": biggest["w"],
        "height": biggest["h"],
        "ratio": round(biggest["w"] / biggest["h"], 3),
        "variants": {str(v["w"]): v for v in ordered},
        "src": biggest["file"],
        "srcSet": ", ".join(f"{v['file']} {v['w']}w" for v in ordered),
    }


def main():
    inventory = {"images": [], "videos": []}

    for cat in sorted(os.listdir(RAW)):
        cdir = os.path.join(RAW, cat)
        if not os.path.isdir(cdir) or cat in SKIP_DIRS or cat.startswith("_"):
            continue
        for f in sorted(os.listdir(cdir)):
            if not f.lower().endswith((".jpg", ".jpeg", ".png")):
                continue
            slug = f.rsplit("-", 1)[0]
            try:
                idx = int(f.rsplit("-", 1)[1].split(".")[0])
            except ValueError:
                idx = 1
            meta = POSTS.get(slug)
            asset = process_image(os.path.join(cdir, f), cat, slug, idx)
            if meta:
                post_id, title, _ = meta
                asset["post_url"] = f"{TIKTOK}/photo/{post_id}"
                asset["title"] = title
            inventory["images"].append(asset)

    for cat in ("beauty", "haircare", "fashion"):
        cdir = os.path.join(RAW, cat)
        if not os.path.isdir(cdir):
            continue
        for f in sorted(os.listdir(cdir)):
            if not f.lower().endswith(".mp4"):
                continue
            key = f.rsplit(".", 1)[0]
            meta = VIDEOS.get(key)
            src = os.path.join(cdir, f)
            dest_dir = out_dir(meta[2] if meta else "fashion")
            dest = os.path.join(dest_dir, f"{key}.mp4")
            if not os.path.exists(dest):
                with open(src, "rb") as a, open(dest, "wb") as b:
                    b.write(a.read())
            inventory["videos"].append({
                "id": key,
                "category": meta[2] if meta else "fashion",
                "title": meta[1] if meta else key,
                "post_url": f"{TIKTOK}/video/{meta[0]}" if meta else "",
                "file": f"/assets/{(meta[2] if meta else 'fashion')}/{key}.mp4",
                "mb": round(os.path.getsize(dest) / 1024 / 1024, 2),
            })

    with open(os.path.join(BASE, "content-inventory.json"), "w", encoding="utf-8") as f:
        json.dump(inventory, f, indent=2, ensure_ascii=False)

    lines = ["# Val Rose Studio — content inventory", "",
             f"All assets are Valentina Rose's own published TikTok content.",
             f"Profile: {TIKTOK}", "",
             f"## Images ({len(inventory['images'])})", "",
             "| # | Title | Category | Native size | Variants | Source post |",
             "|---|---|---|---|---|---|"]
    for i, a in enumerate(inventory["images"], 1):
        vs = ", ".join(sorted(a["variants"], key=int))
        lines.append(
            f"| {i} | {a.get('title','')} | {a['category']} | {a['width']}×{a['height']} | {vs} | {a.get('post_url','')} |"
        )
    lines += ["", f"## Videos ({len(inventory['videos'])})", "",
              "| # | Title | Category | Size | Source post |", "|---|---|---|---|---|"]
    for i, v in enumerate(inventory["videos"], 1):
        lines.append(f"| {i} | {v['title']} | {v['category']} | {v['mb']} MB | {v['post_url']} |")
    with open(os.path.join(BASE, "CONTENT-INVENTORY.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    print("images:", len(inventory["images"]), "videos:", len(inventory["videos"]))
    cats = {}
    for a in inventory["images"]:
        cats[a["category"]] = cats.get(a["category"], 0) + 1
    print("by category:", cats)
    total_kb = sum(v["kb"] for a in inventory["images"] for v in a["variants"].values())
    print("total variant weight:", round(total_kb / 1024, 1), "MB")


if __name__ == "__main__":
    main()
