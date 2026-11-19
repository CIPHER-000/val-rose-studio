import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Enquiry",
    copy: "You send the product, the timing and where the content needs to live — feed, ads, site or all three.",
  },
  {
    n: "02",
    title: "Direction",
    copy: "A short treatment: moodboard, palette, shot list and wardrobe, so the shoot is agreed before anything is filmed.",
  },
  {
    n: "03",
    title: "Production",
    copy: "Styled, lit and shot in one session — stills and vertical film captured together on the same set.",
  },
  {
    n: "04",
    title: "Delivery",
    copy: "Edited assets with captions and usage window agreed up front, delivered ready to publish.",
  },
];

/**
 * How a collaboration actually runs. Deliberately describes the process rather
 * than promising results — no campaign outcomes are claimed here.
 */
export default function Process() {
  return (
    <section id="process" className="wash-clay grain border-t border-line bg-deep">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow">Process</p>
              <h2 className="display-tight mt-5 font-display text-5xl md:text-6xl lg:text-7xl">
                How a collaboration runs
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.08}>
              <p className="text-[15px] leading-relaxed text-ink/70">
                Four stages, agreed in writing before anything is shot — so both sides know what
                they are getting and when.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.05 * i} className="bg-shell/80 p-7 md:p-8">
              <p className="font-display text-4xl text-accent/70">{s.n}</p>
              <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{s.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
