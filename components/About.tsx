import Reveal from "./Reveal";

const CAPABILITIES = [
  {
    title: "Direction",
    items: ["Creative direction", "Editorial styling", "Shot lists & treatment"],
  },
  {
    title: "Formats",
    items: ["Photo carousels", "Vertical film", "Product detail stills"],
  },
  {
    title: "Verticals",
    items: ["Fashion & apparel", "Skincare & fragrance", "Haircare & lifestyle"],
  },
];

export default function About() {
  return (
    <section id="about" className="grain relative border-t border-line bg-shell">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">About</p>
              <h2 className="display-tight mt-5 font-display text-4xl md:text-5xl">
                A considered eye for
                <br />
                fashion and beauty
              </h2>
              <p className="mt-8 max-w-sm font-display text-2xl leading-snug text-ink/85">
                &ldquo;Every frame is art-directed before it is photographed — palette, silhouette
                and light agreed first.&rdquo;
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.06}>
              <div className="space-y-5 text-[15px] leading-[1.75] text-ink/80">
                <p>
                  Valentina Rose is a fashion, beauty and lifestyle content creator working across
                  editorial styling, skincare and haircare. Her work centres on visual storytelling —
                  building a mood, a look and a narrative frame by frame, then shaping it into
                  content that belongs on a brand&rsquo;s own feed.
                </p>
                <p>
                  Each piece begins with art direction: a palette, a setting, a silhouette, the way
                  light falls across a product. Outfits are styled to be read as looks rather than
                  garments; skincare and haircare are shot as rituals rather than demonstrations.
                </p>
                <p>
                  She works with brands across fashion and apparel, skincare, beauty and haircare to
                  create imagery for launches, evergreen campaigns and seasonal features.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-ink/10 sm:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={0.05 * i} className="bg-panel/70 p-7">
              <p className="eyebrow">{c.title}</p>
              <ul className="mt-4 space-y-2 text-[14px] text-ink/80">
                {c.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-2.5">
                    <span className="mt-1.5 h-px w-3 shrink-0 bg-accent/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
