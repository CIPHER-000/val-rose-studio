"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 md:grid-cols-12 md:gap-8 md:px-10 md:pb-24 md:pt-32">
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
            className="mt-10 flex flex-wrap items-center gap-4"
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
        </div>

        {/* Portrait */}
        <div className="md:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden bg-blush md:aspect-[4/4.6]"
          >
            <Image
              src="/assets/fashion/navy-burgundy-01-1400.webp"
              alt="Valentina Rose in a tailored navy coat and burgundy collar, editorial portrait"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-top"
            />
          </motion.div>
          <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-widest text-muted">
            <span>Navy &amp; Burgundy</span>
            <span>Editorial</span>
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
