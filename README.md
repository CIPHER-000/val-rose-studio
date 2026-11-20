# Val Rose Studio

Editorial portfolio for **Valentina Rose** — fashion, beauty and lifestyle content creator.
Built as a single-page, brand-facing site for use in collaboration outreach.

Live: **https://val-rose-studio.vercel.app**

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |
| Icons | Lucide |
| Images | `next/image` — WebP, responsive `sizes`, lazy by default |
| Fonts | Fraunces (display) + Inter (text) via `next/font` |

## Sections

1. **Hero** — name, positioning, published-figure strip, full (uncropped) portrait
2. **Ticker** — slow discipline strip that pauses on hover
3. **About** — statement, practice copy, capability cards
4. **Selected Work** — film rail, three lead pieces (Lukačev Couture, The Trinity
   Collection, Halloween) at screen-filling size, then a **Show more** panel that
   reveals the remaining ten pieces and a **Show less** control to collapse them.
   Every image is shown at its own aspect ratio (nothing cropped), hover holds a
   frame, and clicking opens a keyboard-navigable lightbox with links back to the
   original post
5. **Content Directions** — Fashion & Styling / Beauty & Skincare / Haircare & Lifestyle
6. **Process** — how a collaboration runs, in four agreed stages
7. **Collaboration Formats** — five ways to work together
8. **Social Presence** — TikTok, followers, likes (as published)
9. **Contact** — email, what to include, TikTok

Surfaces alternate across paper / shell / rose panel / deep rose with a fine grain
overlay and soft radial washes, so no section is a flat white fill.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Project structure

```
app/
  layout.tsx        metadata, fonts, OG/Twitter tags
  page.tsx          section composition
  globals.css       design tokens, motion + reduced-motion rules
  icon.svg          favicon (VR monogram)
components/
  Nav.tsx           fixed nav + mobile drawer
  Hero.tsx  About.tsx  Work.tsx  Categories.tsx  Collaborate.tsx  Contact.tsx
  SmoothImage.tsx   <img> + srcset, bypasses the optimiser (no re-encode, no upscaling)
  CarouselTile.tsx  advances a carousel on its own while in view (2s desktop /
                    3s mobile); a cursor hovering freezes the frame and leaving
                    resumes from it; static under reduced motion
  Reveal.tsx        scroll-reveal wrapper (no-op under reduced motion)
lib/
  gallery.ts        typed content data (generated)
public/assets/
  hero/             owner-supplied hero portrait (480/900/1200/1254)
  fashion/ beauty/ haircare/ skincare/ lifestyle/   WebP variants + MP4
scripts/
  asset_server.py   local sink used while collecting assets from the browser
  prepare_assets.py raw originals -> WebP variants (480/900/1200/native) + inventory
  prepare_hero.py   hero portrait -> public/assets/hero
  gen_gallery.py    inventory -> lib/gallery.ts (merges related posts into one carousel)
content-inventory.json / CONTENT-INVENTORY.md
```

## Content provenance

All imagery and video is Valentina Rose's own published TikTok content from
[@valrose.studio0](https://www.tiktok.com/@valrose.studio0). Assets were collected at
full resolution from the creator's own posts, re-encoded to WebP (two widths) and MP4,
and each item retains a link to its original post in the lightbox.

Follower and like figures are taken from the public TikTok profile and are labelled as such.
No performance statistics, brand partnerships, testimonials or campaign results are claimed
anywhere on the site.

## Deployment

Deployed on Vercel from the `main` branch of this repository. No environment variables or
secrets are required to build.

```bash
vercel --prod
```

## Notes

- `app/icon.svg`, `app/robots.ts` and `app/sitemap.ts` are deliberately **not** used. Next's
  metadata-route loader injects the absolute source path into generated code, which breaks the
  build when the checkout path contains an apostrophe (as this one does). The favicon, robots and
  sitemap are therefore static files in `public/`.
- `scripts/verify_assets.cjs` requests every asset referenced by `lib/gallery.ts` and reports any
  that fail, which is a quick pre-deploy smoke test against `npm start`.
