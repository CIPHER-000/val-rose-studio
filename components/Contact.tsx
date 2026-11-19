import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/gallery";
import Reveal from "./Reveal";

const INCLUDES = [
  "The brand and the product",
  "Deliverables and usage",
  "Timeline and budget",
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-widest text-paper/50">Contact</p>
          <h2 className="display-tight mt-6 max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
            Let&rsquo;s create
            <br />
            something beautiful.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal delay={0.06}>
              <p className="max-w-md text-[15px] leading-relaxed text-paper/70">
                For collaborations, product features and campaign work, send a short note with your
                brand, the product and what you have in mind.
              </p>
              <a
                href={`mailto:${profile.email}?subject=Brand%20collaboration%20enquiry`}
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-sm text-ink transition-transform duration-500 ease-editorial hover:-translate-y-0.5"
              >
                {profile.email}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.12}>
              <div className="border-t border-paper/15 pt-6">
                <p className="text-[11px] uppercase tracking-widest text-paper/50">Include</p>
                <ul className="mt-5 space-y-3 text-sm text-paper/75">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex items-baseline gap-3">
                      <span className="h-px w-4 shrink-0 translate-y-[-4px] bg-paper/30" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={profile.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 flex items-center justify-between border-t border-paper/15 pt-4 transition-colors hover:border-paper"
                >
                  <span className="text-sm text-paper/75">TikTok</span>
                  <span className="flex items-center gap-2 text-sm text-paper/60">
                    {profile.handle}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <footer className="border-t border-paper/10">
        <div className="mx-auto flex max-w-editorial flex-col items-start justify-between gap-4 px-6 py-8 text-[11px] uppercase tracking-widest text-paper/40 md:flex-row md:items-center md:px-10">
          <span>© {new Date().getFullYear()} Val Rose Studio</span>
          <span>Fashion · Beauty · Visual storytelling</span>
          <a href="#top" className="transition-colors hover:text-paper">
            Back to top
          </a>
        </div>
      </footer>
    </section>
  );
}
