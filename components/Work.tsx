"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { films, works, type Film } from "@/lib/gallery";
import Reveal from "./Reveal";

type ViewerState =
  | { kind: "images"; workIndex: number; imageIndex: number }
  | { kind: "video"; film: Film }
  | null;

const CATEGORY_LABEL: Record<string, string> = {
  fashion: "Fashion & Styling",
  beauty: "Beauty",
  lifestyle: "Lifestyle",
};

export default function Work() {
  const [viewer, setViewer] = useState<ViewerState>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setViewer(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setViewer((v) => {
        if (!v || v.kind !== "images") return v;
        const total = works[v.workIndex].images.length;
        const next = (v.imageIndex + dir + total) % total;
        return { ...v, imageIndex: next };
      });
    },
    []
  );

  useEffect(() => {
    if (!viewer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewer, close, step]);

  const [featureA, featureB, ...rest] = works;

  return (
    <section id="work" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-10 md:py-28">
        {/* Header */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow">Selected Work</p>
              <h2 className="display-tight mt-5 font-display text-5xl md:text-6xl lg:text-7xl">
                The work
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.08}>
              <p className="text-[15px] leading-relaxed text-muted">
                A selection of published pieces across fashion, beauty and lifestyle — each one
                art-directed, styled and produced for social-first formats.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Films */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <h3 className="font-display text-2xl">Motion</h3>
              <span className="text-[11px] uppercase tracking-widest text-muted">
                {films.length} films
              </span>
            </div>
          </Reveal>
          <div className="rail mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
            {films.map((f, i) => (
              <Reveal key={f.id} delay={0.04 * i} className="shrink-0 snap-start lg:shrink">
                <button
                  type="button"
                  onClick={() => setViewer({ kind: "video", film: f })}
                  className="group zoom-wrap relative block w-[76vw] text-left sm:w-[46vw] lg:w-full"
                  aria-label={`Play ${f.title}`}
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-blush">
                    <video
                      src={f.src}
                      muted
                      playsInline
                      preload="metadata"
                      className="zoom-img h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/25" />
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/70 bg-paper/20 backdrop-blur-sm transition-transform duration-500 ease-editorial group-hover:scale-105">
                      <Play className="ml-1 h-5 w-5 text-paper" strokeWidth={1.5} fill="currentColor" />
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm">{f.title}</span>
                    <span className="text-[11px] uppercase tracking-widest text-muted">
                      {f.category === "skincare" ? "Beauty" : f.category === "haircare" ? "Haircare" : "Fashion"}
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Editorial features */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 md:gap-8">
          {[featureA, featureB].filter(Boolean).map((w, i) => (
            <Reveal key={w.slug} delay={0.05 * i}>
              <button
                type="button"
                onClick={() => setViewer({ kind: "images", workIndex: i, imageIndex: 0 })}
                className="group zoom-wrap block w-full text-left"
                aria-label={`View ${w.title}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-blush">
                  <Image
                    src={w.cover}
                    alt={`${w.title} — ${w.kind} by Valentina Rose`}
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="zoom-img object-cover"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <h3 className="font-display text-2xl">{w.title}</h3>
                    <p className="mt-1 text-sm text-muted">{w.kind}</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-muted">
                    {w.images.length} {w.images.length === 1 ? "image" : "images"}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Masonry remainder */}
        <div className="mt-6 columns-1 gap-6 sm:columns-2 md:gap-8 lg:columns-3">
          {rest.map((w, i) => {
            const globalIndex = i + 2;
            return (
              <Reveal key={w.slug} delay={0.02 * (i % 3)} className="mb-6 break-inside-avoid md:mb-8">
                <button
                  type="button"
                  onClick={() => setViewer({ kind: "images", workIndex: globalIndex, imageIndex: 0 })}
                  className="group zoom-wrap block w-full text-left"
                  aria-label={`View ${w.title}`}
                >
                  <div
                    className="relative w-full overflow-hidden bg-blush"
                    style={{ aspectRatio: String(w.coverRatio < 0.75 ? 0.75 : w.coverRatio) }}
                  >
                    <Image
                      src={w.cover}
                      alt={`${w.title} — ${w.kind} by Valentina Rose`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                      className="zoom-img object-cover"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <div>
                      <h3 className="text-[15px]">{w.title}</h3>
                      <p className="mt-0.5 text-[13px] text-muted">{w.kind}</p>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-widest text-muted">
                      {CATEGORY_LABEL[w.category] ?? w.category}
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Viewer */}
      <AnimatePresence>
        {viewer && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/[0.97] p-4 backdrop-blur-sm md:p-8"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label={viewer.kind === "video" ? viewer.film.title : works[viewer.workIndex].title}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-ink"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>

            {viewer.kind === "video" ? (
              <div className="w-full max-w-[min(420px,90vw)]" onClick={(e) => e.stopPropagation()}>
                <video
                  src={viewer.film.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[80vh] w-full bg-black object-contain"
                />
                <div className="mt-4 flex items-baseline justify-between text-paper">
                  <div>
                    <p className="font-display text-xl">{viewer.film.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-paper/60">
                      {viewer.film.category}
                    </p>
                  </div>
                  <a
                    href={viewer.film.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest text-paper/70 underline underline-offset-4 hover:text-paper"
                  >
                    View on TikTok
                  </a>
                </div>
              </div>
            ) : (
              <div
                className="flex w-full max-w-5xl flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex max-h-[76vh] w-full items-center justify-center">
                  <Image
                    key={works[viewer.workIndex].images[viewer.imageIndex].src}
                    src={works[viewer.workIndex].images[viewer.imageIndex].src}
                    alt={`${works[viewer.workIndex].title} — image ${viewer.imageIndex + 1}`}
                    width={works[viewer.workIndex].images[viewer.imageIndex].width}
                    height={works[viewer.workIndex].images[viewer.imageIndex].height}
                    sizes="90vw"
                    className="max-h-[76vh] w-auto object-contain"
                    priority
                  />
                  {works[viewer.workIndex].images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => step(-1)}
                        className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
                      </button>
                      <button
                        type="button"
                        onClick={() => step(1)}
                        className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-5 flex w-full items-baseline justify-between text-paper">
                  <div>
                    <p className="font-display text-xl">{works[viewer.workIndex].title}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-paper/60">
                      {works[viewer.workIndex].kind}
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-xs tabular-nums text-paper/60">
                      {viewer.imageIndex + 1} / {works[viewer.workIndex].images.length}
                    </span>
                    <a
                      href={works[viewer.workIndex].postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-widest text-paper/70 underline underline-offset-4 hover:text-paper"
                    >
                      View on TikTok
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
