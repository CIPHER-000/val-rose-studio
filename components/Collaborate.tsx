import Reveal from "./Reveal";

const FORMATS = [
  {
    n: "01",
    title: "Product Showcases",
    copy:
      "Product-led imagery and short-form video built around a single hero product — texture, packaging and detail shot with an editorial eye.",
    items: ["Launch content", "Detail & texture film", "Static and carousel assets"],
  },
  {
    n: "02",
    title: "Beauty & Skincare Content",
    copy:
      "Skincare steps, routines and fragrance or make-up stories, with your product as the leading character rather than an incidental prop.",
    items: ["Skincare routines", "Fragrance storytelling", "Beauty transformations"],
  },
  {
    n: "03",
    title: "Fashion & Styling",
    copy:
      "Outfit builds, lookbooks and collection features — styled to show how pieces move, layer and read on camera.",
    items: ["Outfit inspiration", "Seasonal lookbooks", "Collection features"],
  },
  {
    n: "04",
    title: "Lifestyle Content",
    copy:
      "Getting-ready sequences and daily rituals, placing a product naturally inside a scene rather than in a studio vacuum.",
    items: ["GRWM sequences", "Ritual & routine films", "In-scene product features"],
  },
  {
    n: "05",
    title: "Creative Brand Content",
    copy:
      "A tailored concept developed with your team — art direction, palette, styling and narrative, produced end to end.",
    items: ["Concept development", "Art direction", "Full production"],
  },
];

export default function Collaborate() {
  return (
    <section id="collaborate" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow">Collaborations</p>
              <h2 className="display-tight mt-5 font-display text-5xl md:text-6xl lg:text-7xl">
                Ways to work
                <br />
                together
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[15px] leading-relaxed text-muted">
                Formats available for brand partnerships. Scope, deliverables and usage are agreed
                per project.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-line">
          {FORMATS.map((f, i) => (
            <Reveal key={f.n} delay={0.03 * i}>
              <div className="group grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-white md:grid-cols-12 md:gap-8 md:py-10">
                <div className="md:col-span-1">
                  <span className="font-display text-lg text-accent">{f.n}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl md:text-[1.7rem]">{f.title}</h3>
                </div>
                <div className="md:col-span-4">
                  <p className="text-[15px] leading-relaxed text-ink/75">{f.copy}</p>
                </div>
                <div className="md:col-span-3">
                  <ul className="space-y-1.5 text-[13px] text-muted">
                    {f.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className="mt-2 h-px w-3 shrink-0 bg-muted/60" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
