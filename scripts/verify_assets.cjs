// Verifies every asset path referenced in lib/gallery.ts is served correctly.
const fs = require("fs");

const src = fs.readFileSync("lib/gallery.ts", "utf8");
const paths = [...src.matchAll(/"(\/assets\/[^"]+)"/g)].map((m) => m[1]);
const uniq = [...new Set(paths)];

(async () => {
  let ok = 0;
  const bad = [];
  let bytes = 0;
  for (const p of uniq) {
    const res = await fetch("http://localhost:3100" + p);
    if (res.ok) {
      ok++;
      const buf = await res.arrayBuffer();
      bytes += buf.byteLength;
    } else {
      bad.push(p + " -> " + res.status);
      await res.arrayBuffer();
    }
  }
  console.log("assets referenced:", uniq.length);
  console.log("served ok:", ok);
  console.log("failed:", bad.length);
  console.log("total MB:", (bytes / 1048576).toFixed(2));
  if (bad.length) console.log(bad.join("\n"));
})();
