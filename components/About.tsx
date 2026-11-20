import Reveal from "./Reveal";

const CAPABILITIES = [
  {
    title: "Direction",
    items: ["Moodboard & references", "Styling and shot list", "Light and location"],
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
                What it&rsquo;s like
                <br />
                to work with me
              </h2>
              <p className="mt-8 max-w-sm font-display text-2xl leading-snug text-ink/85">
                &ldquo;I&rsquo;d rather shoot one set that looks right than twenty that look like
                everything else.&rdquo;
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.06}>
              <div className="space-y-5 text-[15px] leading-[1.75] text-ink/80">
                <p>
                  I&rsquo;m Valentina, a model and content creator working in fashion, beauty and
                  haircare. I make the sort of images a brand is happy to put on its own grid —
                  work that belongs beside the campaign, not borrowed from someone else&rsquo;s
                  moodboard.
                </p>
                <p>
                  Every set starts with a conversation and a moodboard: the palette, the light, the
                  pieces, how the product should feel in someone&rsquo;s hands. I&rsquo;d rather agree
                  that before the camera comes out than try to rescue it in the edit.
                </p>
                <p>
                  So products get used the way people actually use them. A serum goes onto skin,
                  hair is washed and towel-dried, a coat is worn on a street at a particular hour.
                  If a bottle needs to sit on a bare table, it&rsquo;s because the story called for
                  it — not because it was the fastest thing to shoot.
                </p>
                <p>
                  You deal with me from the first email to the final file, so nothing gets lost
                  between a brief and a shoot. You see the edit before it goes anywhere, and the
                  same look carries across a launch instead of stopping at one post.
                </p>
              </div>

              <p className="mt-7 text-[15px] leading-[1.75] text-ink/80">
                If you&rsquo;re launching something soon, tell me what it is. I&rsquo;ll tell you
                honestly whether I&rsquo;m the right person for it.
              </p>

              <a
                href="#contact"
                className="group mt-6 inline-flex items-center gap-2.5 text-sm text-accent underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Start with an email
                <span className="transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                  →
                </span>
              </a>
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
