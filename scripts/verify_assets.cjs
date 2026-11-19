// Verifies every asset path referenced in lib/gallery.ts is served correctly.
// Usage: node scripts/verify_assets.cjs [baseUrl]
const fs = require("fs");

const base = process.argv[2] || "http://localhost:3100";
const src = fs.readFileSync("lib/gallery.ts", "utf8");
// Only single file paths: srcSet values are also quoted "/assets/..." strings, but
// they contain spaces and descriptors, so exclude anything that is not one clean path.
const paths = [...src.matchAll(/"(\/assets\/[^"\s]+)"/g)].map((m) => m[1]);
const uniq = [...new Set(paths)];

(async () => {
  let ok = 0;
  const bad = [];
  let bytes = 0;
  for (const p of uniq) {
    const res = await fetch(base + p);
    if (res.ok) {
      ok++;
      const buf = await res.arrayBuffer();
      bytes += buf.byteLength;
    } else {
      bad.push(p + " -> " + res.status);
      await res.arrayBuffer();
    }
  }
  console.log("base:", base);
  console.log("assets referenced:", uniq.length);
  console.log("served ok:", ok);
  console.log("failed:", bad.length);
  console.log("total MB:", (bytes / 1048576).toFixed(2));
  if (bad.length) console.log(bad.join("\n"));
})();
