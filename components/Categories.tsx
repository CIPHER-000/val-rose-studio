import { works } from "@/lib/gallery";
import CarouselTile from "./CarouselTile";
import Reveal from "./Reveal";

const BLOCKS = [
  {
    key: "fashion" as const,
    label: "Fashion & Styling",
    slug: "lukacev-couture",
    copy:
      "Outfit stories, lookbooks and editorial styling. Seasonal collections, occasion dressing, street style and silhouette-led features.",
    tags: ["Outfit inspiration", "Lookbooks", "Collection features", "Street style"],
  },
  {
    key: "beauty" as const,
    label: "Beauty & Skincare",
    slug: "beauty-edit",
    copy:
      "Product-forward beauty content: skincare steps, fragrance campaigns, make-up looks and getting-ready sequences built around a brand's hero product.",
    tags: ["Product showcases", "Skincare", "Fragrance", "GRWM"],
  },
  {
    key: "lifestyle" as const,
    label: "Haircare & Lifestyle",
    slug: "haircare-edit",
    copy:
      "Haircare routines, home and beauty rituals, and lifestyle moments — softer, atmospheric content that places a product inside a lived-in scene.",
    tags: ["Haircare", "Home fragrance", "Rituals", "Lifestyle"],
  },
];

export default function Categories() {
  return (
    <section id="categories" className="wash-deep grain border-t border-line bg-panel">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow">Content</p>
              <h2 className="display-tight mt-5 font-display text-5xl md:text-6xl lg:text-7xl">
                Three directions
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[15px] leading-relaxed text-muted">
                Work is organised across three content directions, each with its own visual
                language and format.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 space-y-16 md:space-y-24">
          {BLOCKS.map((b, i) => {
            const w = works.find((x) => x.slug === b.slug);
            const flip = i % 2 === 1;
            return (
              <div
                key={b.key}
                className={`grid items-center gap-8 md:grid-cols-12 md:gap-12 ${
                  flip ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="md:col-span-7 md:[direction:ltr]">
                  <Reveal>
                    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm md:aspect-[6/5]">
                      {w && (
                        <CarouselTile
                          images={w.images}
                          sizes="(max-width: 768px) 100vw, 56vw"
                          alt={`${b.label} content by Valentina Rose`}
                          priority={i === 0}
                        />
                      )}
                    </div>
                  </Reveal>
                </div>
                <div className="md:col-span-5 md:[direction:ltr]">
                  <Reveal delay={0.08}>
                    <span className="eyebrow">0{i + 1}</span>
                    <h3 className="mt-4 font-display text-3xl md:text-4xl">{b.label}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{b.copy}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2">
                      {b.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-widest text-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
