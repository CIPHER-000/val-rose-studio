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

1. **Hero** — wordmark, name, positioning line, "Explore the Work" / "Collaborate"
2. **About** — creative direction and practice
3. **Selected Work** — film rail plus editorial grid; click any piece for a keyboard-navigable lightbox with links back to the original TikTok post
4. **Content Directions** — Fashion & Styling / Beauty & Skincare / Haircare & Lifestyle
5. **Collaboration Formats** — five ways to work together
6. **Contact** — email, TikTok, published follower/like figures

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
  Reveal.tsx        scroll-reveal wrapper (no-op under reduced motion)
lib/
  gallery.ts        typed content data (generated)
public/assets/
  fashion/ beauty/ haircare/ skincare/ lifestyle/   optimised WebP + MP4
scripts/
  asset_server.py   local sink used while collecting assets from the browser
  prepare_assets.py raw originals -> optimised WebP (+ inventory)
  gen_gallery.py    inventory -> lib/gallery.ts
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
