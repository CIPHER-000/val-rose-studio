#!/usr/bin/env python3
"""Inspect how image URLs appear in the TikTok photo page HTML."""
import re

from curl_cffi import requests as cr

URL = "https://www.tiktok.com/@valrose.studio0/photo/7709115570213424391"
r = cr.get(URL, impersonate="chrome", timeout=30)
html = r.text
print("status", r.status_code, "len", len(html))

i = html.find("photomode")
print("\n--- context around first 'photomode' ---")
print(html[max(0, i - 300):i + 500] if i > 0 else "not found")

print("\n--- any occurrence of imagePost / images array ---")
for key in ("imagePost", "imageURL", "images\":", "displayImage", "carousel"):
    j = html.find(key)
    print(f"{key!r}: {'found at ' + str(j) if j > 0 else 'absent'}")

print("\n--- count of tplv tokens ---")
print("tplv:", html.count("tplv"))

m = re.search(r"https[^\"\\]{0,120}tplv[^\"\\]{0,80}", html)
print("\nsample raw URL-ish token:", m.group(0)[:200] if m else "none")
