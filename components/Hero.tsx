"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/gallery";
import SmoothImage from "./SmoothImage";

const STATS = [
  { label: "Followers", value: profile.followers },
  { label: "Likes", value: profile.likes },
  { label: "Platform", value: "TikTok" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="wash-rose grain relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-10 px-6 pb-14 pt-28 md:grid-cols-12 md:gap-10 md:px-10 md:pb-20 md:pt-32">
        {/* Copy */}
        <div className="md:col-span-5 md:pr-6">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Val Rose Studio
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="display-tight mt-5 font-display text-[15vw] leading-[0.86] sm:text-[11vw] md:text-[5.4rem] lg:text-[6.2rem]"
          >
            Valentina
            <br />
            Rose
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-md font-display text-xl leading-snug text-ink/90 md:text-2xl"
          >
            Fashion, beauty and visual storytelling.
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-muted"
          >
            Editorial styling, product-led beauty content and considered visual direction — created
            for fashion, skincare and haircare brands.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm text-paper transition-transform duration-500 ease-editorial hover:-translate-y-0.5"
            >
              Explore the Work
              <span className="inline-block transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-ink/25 px-7 py-3.5 text-sm transition-colors duration-300 hover:border-ink"
            >
              Collaborate
            </a>
          </motion.div>

          {/* Credential strip — published profile figures only */}
          <motion.dl
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ink/15 pt-5"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-muted">{s.label}</dt>
                <dd className="mt-1.5 font-display text-xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
          <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted/80">
            As published on {profile.handle}
          </p>
        </div>

        {/* Portrait — shown whole, never cropped */}
        <div className="md:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden rounded-sm bg-blush"
            style={{ aspectRatio: "1 / 1" }}
          >
            <SmoothImage
              src="/assets/hero/hero-1254.webp"
              srcSet="/assets/hero/hero-480.webp 480w, /assets/hero/hero-900.webp 900w, /assets/hero/hero-1200.webp 1200w, /assets/hero/hero-1254.webp 1254w"
              sizes="(max-width: 768px) 100vw, 58vw"
              alt="Valentina Rose, beauty portrait in a silver satin slip"
              priority
              className="absolute inset-0 h-full w-full object-contain"
            />
          </motion.div>
          <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-widest text-muted">
            <span>Beauty Portrait</span>
            <a
              href={profile.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              {profile.handle}
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.6}
              />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="mx-auto mb-10 flex w-fit items-center gap-2 text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink"
      >
        <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
        Scroll
      </a>
    </section>
  );
}
