#!/usr/bin/env python3
"""Probe: can we fetch a TikTok photo post page and its signed carousel images?"""
import io
import re

from curl_cffi import requests as cr
from PIL import Image

URL = "https://www.tiktok.com/@valrose.studio0/photo/7709115570213424391"
IMG_RE = re.compile(r'https://p16-[^"\\\']+?tplv-photomode-image\.jpeg[^"\\\']*')

r = cr.get(URL, impersonate="chrome", timeout=30)
print("page status:", r.status_code, "bytes:", len(r.text))

urls = IMG_RE.findall(r.text)
seen = []
for u in urls:
    u = u.replace("\\u002F", "/").replace("\\/", "/")
    if u not in seen:
        seen.append(u)
print("unique image urls:", len(seen))

if seen:
    print("sample:", seen[0][:140])
    d = cr.get(seen[0], impersonate="chrome", timeout=30,
               headers={"Referer": "https://www.tiktok.com/"})
    print("image status:", d.status_code, "bytes:", len(d.content))
    if d.status_code == 200 and len(d.content) > 2000:
        im = Image.open(io.BytesIO(d.content))
        print("DIMENSIONS:", im.size, im.format)
