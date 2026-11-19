import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/gallery";
import Reveal from "./Reveal";

const STATS = [
  { label: "Platform", value: "TikTok", sub: profile.handle, href: profile.tiktok },
  { label: "Followers", value: profile.followers, sub: "As published" },
  { label: "Likes", value: profile.likes, sub: "Across all posts" },
];

export default function Social() {
  return (
    <section id="social" className="grain border-t border-line bg-shell">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow">Social presence</p>
              <h2 className="display-tight mt-5 font-display text-5xl md:text-6xl lg:text-7xl">
                Published on TikTok
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[15px] leading-relaxed text-muted">
                Work is published to TikTok in the formats the platform rewards — carousels for
                styling and product stories, short film for skincare, haircare and getting-ready
                content. Every piece in the gallery above links back to its original post.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid border-t border-line md:grid-cols-3">
          {STATS.map((s, i) => {
            const inner = (
              <>
                <p className="text-[11px] uppercase tracking-widest text-muted">{s.label}</p>
                <p className="mt-4 flex items-center gap-2 font-display text-3xl md:text-4xl">
                  {s.value}
                  {s.href && (
                    <ArrowUpRight
                      className="h-4 w-4 text-muted transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  )}
                </p>
                <p className="mt-2 text-[13px] text-muted">{s.sub}</p>
              </>
            );

            return (
              <Reveal
                key={s.label}
                delay={0.06 * i}
                className={`border-b border-line py-8 md:border-b-0 md:pr-8 ${
                  i > 0 ? "md:border-l md:border-line md:pl-8" : ""
                }`}
              >
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-[12px] leading-relaxed text-muted">
              Follower and like figures are as published on the public TikTok profile at{" "}
              {profile.handle}.
            </p>
            <a
              href={profile.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-ink px-6 py-3 text-sm transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              View the profile
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
