import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="grain relative border-t border-line bg-shell">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">About</p>
              <h2 className="display-tight mt-5 font-display text-4xl md:text-5xl">
                A little about me
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.06}>
              <p className="font-display text-2xl leading-snug text-ink md:text-3xl">
                Hi, I&rsquo;m Valentina Rose.
              </p>

              <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-ink/80">
                <p>
                  I&rsquo;m a virtual creator with a love for fashion, beauty, skincare and all the
                  little things that make everyday life beautiful.
                </p>
                <p>
                  I enjoy exploring different styles, discovering beauty products, experimenting
                  with new looks and turning everyday moments into something worth sharing.
                </p>
                <p>
                  My content is a mix of personal style, beauty routines, skincare discoveries and
                  lifestyle inspiration. I like keeping things visually interesting but still
                  natural, effortless and relatable.
                </p>
                <p className="font-display text-xl leading-relaxed text-ink/85">
                  This is my little corner of the internet, and I&rsquo;m glad you&rsquo;re here.
                </p>
              </div>

              <div className="mt-10 border-l-2 border-accent/45 pl-6">
                <p className="eyebrow">For brands</p>
                <p className="mt-3 max-w-xl text-[15px] leading-[1.8] text-ink/80">
                  I love bringing products and creative ideas to life through visual storytelling.
                  If you have something you&rsquo;d like us to create together, I&rsquo;d love to hear
                  about it.
                </p>
                <a
                  href="#contact"
                  className="group mt-5 inline-flex items-center gap-2.5 text-sm text-accent underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Start with an email
                  <span className="transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
