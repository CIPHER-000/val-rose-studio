#!/usr/bin/env python3
"""
Local asset receiver + helper page.

TikTok's CSP forbids a tiktok.com page from calling loopback, and the browser
sandbox has no filesystem access. So:
  * assets are fetched with Playwright's request context (bypasses CSP/CORS),
  * bytes are POSTed from a CSP-free page served here,
  * and written to raw-assets/<category>/<slug>-NN.jpg.
"""
import base64
import io
import json
import os
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from PIL import Image

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(BASE, "raw-assets")
os.makedirs(ASSETS, exist_ok=True)

PAGE = b"""<!doctype html><html><head><meta charset="utf-8"><title>asset sink</title></head>
<body><h1 id="s">ready</h1><script>
window.sink = async (payload) => {
  const r = await fetch('/save_blob', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  return await r.json();
};
</script></body></html>"""

MAX_W = 1600


def sanitise(s):
    return re.sub(r"[^a-z0-9]+", "-", (s or "asset").lower()).strip("-")[:60]


def write_blobs(category, slug, items, start_index=1):
    outdir = os.path.join(ASSETS, sanitise(category))
    os.makedirs(outdir, exist_ok=True)
    saved = []
    for i, it in enumerate(items, start=start_index):
        try:
            raw = base64.b64decode(it["b64"])
            im = Image.open(io.BytesIO(raw)).convert("RGB")
            if im.width > MAX_W:
                h = int(im.height * (MAX_W / im.width))
                im = im.resize((MAX_W, h), Image.LANCZOS)
            name = f"{sanitise(slug)}-{i:02d}.jpg"
            path = os.path.join(outdir, name)
            im.save(path, "JPEG", quality=90, optimize=True, progressive=True)
            saved.append({"file": f"{sanitise(category)}/{name}", "w": im.width,
                          "h": im.height, "kb": round(os.path.getsize(path) / 1024, 1)})
        except Exception as e:
            saved.append({"file": None, "error": repr(e)[:80]})
    return saved


class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Private-Network", "true")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(PAGE)))
        self.end_headers()
        self.wfile.write(PAGE)

    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0))
        try:
            payload = json.loads(self.rfile.read(n) or b"{}")
            saved = write_blobs(payload["category"], payload["slug"],
                                payload.get("items", []),
                                payload.get("startIndex", 1))
            resp = {"saved": saved}
        except Exception as e:
            resp = {"error": repr(e)[:150]}
        data = json.dumps(resp).encode()
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    srv = ThreadingHTTPServer(("127.0.0.1", 8765), Handler)
    print("asset sink on http://127.0.0.1:8765", flush=True)
    srv.serve_forever()
