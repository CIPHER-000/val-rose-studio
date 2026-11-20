"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { films, works, type Film } from "@/lib/gallery";
import CarouselTile from "./CarouselTile";
import Reveal from "./Reveal";
import SmoothImage from "./SmoothImage";

const GALLERY_STORAGE_KEY = "vrs:gallery-expanded";

type ViewerState =
  | { kind: "images"; workIndex: number; imageIndex: number }
  | { kind: "video"; film: Film }
  | null;

const CATEGORY_LABEL: Record<string, string> = {
  fashion: "Fashion & Styling",
  beauty: "Beauty",
  lifestyle: "Lifestyle",
};

/* ---------------------------------------------------------------- film card */

function FilmCard({ film, onOpen }: { film: Film; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.paused) return;
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  /**
   * Play muted while the card is on screen.
   *
   * Mobile browsers suspend or refuse muted playback after scrolling, so a
   * lightweight keeper re-issues play() while the card is visible, and playback
   * is re-kicked when the page becomes visible or the user touches the screen.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    let inView = false;
    let keeper: number | null = null;

    const startKeeper = () => {
      if (keeper !== null) return;
      keeper = window.setInterval(() => {
        if (inView && !document.hidden && video.paused) tryPlay();
      }, 1200);
    };

    const stopKeeper = () => {
      if (keeper !== null) {
        window.clearInterval(keeper);
        keeper = null;
      }
    };

    let disconnect: (() => void) | null = null;

    if (typeof IntersectionObserver === "undefined") {
      inView = true;
      tryPlay();
      startKeeper();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            inView = entry.isIntersecting;
            if (inView) {
              tryPlay();
              startKeeper();
            } else {
              stopKeeper();
              video.pause();
            }
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(video);
      disconnect = () => observer.disconnect();
    }

    const onWake = () => {
      if (!document.hidden && inView) tryPlay();
    };

    document.addEventListener("visibilitychange", onWake);
    window.addEventListener("touchstart", onWake, { passive: true });
    window.addEventListener("touchend", onWake, { passive: true });
    window.addEventListener("focus", onWake);

    return () => {
      disconnect?.();
      document.removeEventListener("visibilitychange", onWake);
      window.removeEventListener("touchstart", onWake);
      window.removeEventListener("touchend", onWake);
      window.removeEventListener("focus", onWake);
      stopKeeper();
      video.pause();
    };
  }, [tryPlay]);

  const toggleSound = (event: React.MouseEvent) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    setMuted(nextMuted);
    video.muted = nextMuted;
    if (!nextMuted) {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  return (
    <div className="group zoom-wrap relative block w-full text-left">
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-blush">
        <video
          ref={videoRef}
          src={film.src}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          onCanPlay={tryPlay}
          className="zoom-img h-full w-full object-cover"
        />
        {/* Click target sits above the video so the clip never eats the click. */}
        <button
          type="button"
          onClick={onOpen}
          className="absolute inset-0 cursor-pointer"
          aria-label={`Play ${film.title} with full controls`}
        >
          <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/70 bg-ink/25 text-paper opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
            <Play className="ml-0.5 h-5 w-5" strokeWidth={1.5} fill="currentColor" />
          </span>
        </button>

        <button
          type="button"
          onClick={toggleSound}
          className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-ink/45 px-3 py-2 text-[11px] uppercase tracking-widest text-paper backdrop-blur-sm transition-colors hover:bg-ink/70"
          aria-label={muted ? `Turn on sound for ${film.title}` : `Mute ${film.title}`}
          aria-pressed={!muted}
        >
          {muted ? (
            <VolumeX className="h-3.5 w-3.5" strokeWidth={1.6} />
          ) : (
            <Volume2 className="h-3.5 w-3.5" strokeWidth={1.6} />
          )}
          <span className="hidden sm:inline">{muted ? "Sound off" : "Sound on"}</span>
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-sm">{film.title}</span>
        <span className="shrink-0 text-[11px] uppercase tracking-widest text-muted">
          {film.category === "skincare" ? "Beauty" : film.category === "haircare" ? "Haircare" : "Fashion"}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- work */

export default function Work() {
  const [viewer, setViewer] = useState<ViewerState>(null);
  const [portalReady, setPortalReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setPortalReady(true);
  }, []);

  // Remember the gallery state for the rest of the session, so a reader who opens
  // it and then clicks through the site does not have to open it again.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(GALLERY_STORAGE_KEY) === "1") setExpanded(true);
    } catch {
      /* storage can be blocked; the gallery just starts collapsed */
    }
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(GALLERY_STORAGE_KEY, expanded ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [expanded]);

  const close = useCallback(() => setViewer(null), []);

  const step = useCallback((dir: 1 | -1) => {
    setViewer((v) => {
      if (!v || v.kind !== "images") return v;
      const total = works[v.workIndex].images.length;
      return { ...v, imageIndex: (v.imageIndex + dir + total) % total };
    });
  }, []);

  /** Reveal or collapse the rest of the gallery, keeping the reader oriented. */
  const toggleGallery = useCallback((next: boolean) => {
    setExpanded(next);
    window.setTimeout(() => {
      const target = document.getElementById(next ? "full-gallery" : "work");
      target?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }, 80);
  }, []);

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

  const [featureA, featureB, featureC, ...rest] = works;
  const features = [featureA, featureB, featureC].filter(Boolean);

  return (
    <section id="work" className="grain border-t border-line bg-paper">
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
                art-directed, styled and produced for social-first formats. Hover a piece to see the
                rest of its carousel.
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-accent">
                {works.length} pieces · {works.reduce((n, w) => n + w.images.length, 0)} stills ·{" "}
                {films.length} films
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
                {films.length} films · playing muted
              </span>
            </div>
          </Reveal>
          <div className="rail mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
            {films.map((f, i) => (
              <Reveal
                key={f.id}
                delay={0.04 * i}
                className="w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-full lg:shrink"
              >
                <FilmCard film={f} onOpen={() => setViewer({ kind: "video", film: f })} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Editorial features — sized as large as the screen allows, side by side */}
        <div className="mt-20 flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center md:gap-12">
          {features.map((w, i) => (
            <div
              key={w.slug}
              className="w-full md:w-[var(--feature-w)]"
              // Height = viewport minus the fixed nav and the caption; width falls
              // back to a third of the row so three pieces still fit side by side.
              style={
                {
                  "--feature-w": `min(calc((100vh - 165px) * ${w.coverRatio}), calc((100% - 6rem) / 3))`,
                  maxWidth: "100%",
                } as CSSProperties
              }
            >
              <Reveal delay={0.05 * i}>
                <button
                  type="button"
                  onClick={() => setViewer({ kind: "images", workIndex: i, imageIndex: 0 })}
                  className="group zoom-wrap block w-full text-left"
                  aria-label={`View ${w.title}`}
                >
                  <div
                    className="relative w-full overflow-hidden bg-blush"
                    style={{ aspectRatio: String(w.coverRatio) }}
                  >
                    <CarouselTile
                      images={w.images}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      alt={`${w.title} — ${w.kind} by Valentina Rose`}
                      imgClassName="zoom-img"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl">{w.title}</h3>
                      <p className="mt-1 text-sm text-muted">{w.kind}</p>
                    </div>
                    <span className="shrink-0 text-[11px] uppercase tracking-widest text-muted">
                      {w.images.length} {w.images.length === 1 ? "image" : "images"}
                    </span>
                  </div>
                </button>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Show more — everything else stays collapsed until asked for */}
        <div className="mt-16">
          <button
            type="button"
            onClick={() => toggleGallery(!expanded)}
            aria-expanded={expanded}
            aria-controls="full-gallery"
            className="group flex w-full items-center justify-between gap-6 border-y border-line py-6 text-left transition-colors duration-500 hover:bg-shell/70 md:py-7"
          >
            <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="font-display text-2xl md:text-3xl">
                {expanded ? "Hide the full gallery" : "Show more work"}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-muted">
                {expanded ? "collapse" : `${rest.length} more pieces`}
              </span>
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/25 transition-colors duration-500 group-hover:bg-ink group-hover:text-paper">
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-500 ease-editorial ${
                  expanded ? "rotate-180" : ""
                }`}
                strokeWidth={1.4}
              />
            </span>
          </button>
        </div>

        {expanded && (
          <div id="full-gallery" className="mt-12 scroll-mt-24">
            <div className="mb-6 flex items-baseline justify-between border-b border-line pb-3">
              <h3 className="font-display text-2xl">Full gallery</h3>
              <span className="text-[11px] uppercase tracking-widest text-muted">
                {rest.length} pieces · {rest.reduce((n, w) => n + w.images.length, 0)} stills
              </span>
            </div>

            {/* Masonry remainder */}
            <div className="columns-1 gap-6 sm:columns-2 md:gap-8 lg:columns-3">
              {rest.map((w, i) => {
                const globalIndex = i + features.length;
                return (
                  <Reveal
                    key={w.slug}
                    delay={0.02 * (i % 3)}
                    className="mb-6 break-inside-avoid md:mb-8"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setViewer({ kind: "images", workIndex: globalIndex, imageIndex: 0 })
                      }
                      className="group zoom-wrap mx-auto block w-full text-left"
                      style={{ maxWidth: `calc(68vh * ${w.coverRatio})` }}
                      aria-label={`View ${w.title}`}
                    >
                      <div
                        className="relative w-full overflow-hidden bg-blush"
                        style={{ aspectRatio: String(w.coverRatio) }}
                      >
                        <CarouselTile
                          images={w.images}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                          alt={`${w.title} — ${w.kind} by Valentina Rose`}
                          imgClassName="zoom-img"
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

            {/* Show less — collapse from the bottom of the gallery */}
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => toggleGallery(false)}
                className="group inline-flex items-center gap-3 rounded-full border border-ink/25 px-7 py-3.5 text-sm transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
              >
                Show less
                <ChevronDown
                  className="h-4 w-4 rotate-180 transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Viewer — portalled to <body>. Each section uses the grain overlay, which
          sets isolation: isolate and would otherwise trap this fixed overlay in
          the section's stacking context, letting the z-50 nav paint over it. */}
      {portalReady &&
        createPortal(
          <AnimatePresence>
            {viewer && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/[0.97] p-4 backdrop-blur-sm md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.35 }}
                role="dialog"
                aria-modal="true"
                aria-label={
                  viewer.kind === "video" ? viewer.film.title : works[viewer.workIndex].title
                }
                onClick={close}
              >
                <button
                  type="button"
                  onClick={close}
                  className="absolute right-4 top-20 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-ink md:right-6 md:top-6"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" strokeWidth={1.25} />
                </button>

                {viewer.kind === "video" ? (
                  <div
                    className="w-full max-w-[min(430px,90vw)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <video
                  src={viewer.film.src}
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  className="max-h-[80vh] w-full bg-black object-contain"
                />
                <div className="mt-4 flex items-baseline justify-between gap-4 text-paper">
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
                  <SmoothImage
                    key={works[viewer.workIndex].images[viewer.imageIndex].src}
                    src={works[viewer.workIndex].images[viewer.imageIndex].src}
                    srcSet={works[viewer.workIndex].images[viewer.imageIndex].srcSet}
                    sizes="(max-width: 768px) 92vw, 70vw"
                    alt={`${works[viewer.workIndex].title} — image ${viewer.imageIndex + 1}`}
                    priority
                    className="carousel-frame max-h-[76vh] w-auto max-w-full object-contain"
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
                    {/* Only link out when the frame actually came from a post:
                        owner-supplied sets have no source URL. */}
                    {(works[viewer.workIndex].images[viewer.imageIndex].postUrl ||
                      works[viewer.workIndex].postUrl) && (
                      <a
                        href={
                          works[viewer.workIndex].images[viewer.imageIndex].postUrl ||
                          works[viewer.workIndex].postUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase tracking-widest text-paper/70 underline underline-offset-4 hover:text-paper"
                      >
                        View on TikTok
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
