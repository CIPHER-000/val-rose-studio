"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WorkImage } from "@/lib/gallery";
import SmoothImage from "./SmoothImage";

type Props = {
  images: WorkImage[];
  sizes: string;
  alt: string;
  priority?: boolean;
  imgClassName?: string;
  /**
   * Freeze the frame while a cursor rests on the tile. Used by the gallery, where
   * holding a piece still is useful. Sections that should read as a steady
   * sequence (the content directions) turn it off so a resting cursor on the
   * large image cannot stop the rotation.
   */
  pauseOnHover?: boolean;
};

// One cadence everywhere: 2.5s per frame, desktop and mobile alike.
const FRAME_MS = 2500;
// Hold the first frame briefly after the tile enters view so it registers.
const START_DELAY_MS = 400;

/**
 * Carousel tile.
 *
 * - Starts advancing on its own as soon as the tile scrolls into view.
 * - With `pauseOnHover`, a cursor resting on the tile freezes the current frame
 *   and leaving resumes from that same frame (it does not jump back).
 * - Pauses entirely when scrolled out of view, and stays static for anyone who
 *   asks for reduced motion.
 */
export default function CarouselTile({
  images,
  sizes,
  alt,
  priority = false,
  imgClassName = "",
  pauseOnHover = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<number | null>(null);
  const warmed = useRef(false);

  const canCycle = images.length > 1;

  useEffect(() => {
    setHoverCapable(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const preload = useCallback(() => {
    if (warmed.current) return;
    warmed.current = true;
    for (const img of images.slice(1)) {
      const el = new window.Image();
      el.sizes = sizes;
      el.srcset = img.srcSet;
      el.src = img.src;
    }
  }, [images, sizes]);

  // Watch visibility so the carousel runs only while the tile is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !canCycle) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [canCycle]);

  // Run the advance timer while visible (and not being held under a cursor).
  useEffect(() => {
    if (!canCycle || !inView) return;
    if (pauseOnHover && hovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    preload();

    const start = window.setTimeout(() => {
      timer.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, FRAME_MS);
    }, START_DELAY_MS);

    return () => {
      window.clearTimeout(start);
      if (timer.current !== null) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [canCycle, inView, hovered, pauseOnHover, preload, images.length]);

  const current = images[Math.min(index, images.length - 1)];
  const showDots = canCycle;
  const hoverHandlers = pauseOnHover && hoverCapable;

  return (
    <div
      ref={rootRef}
      className="absolute inset-0"
      onMouseEnter={hoverHandlers ? () => setHovered(true) : undefined}
      onMouseLeave={hoverHandlers ? () => setHovered(false) : undefined}
      onFocus={hoverHandlers ? () => setHovered(true) : undefined}
      onBlur={hoverHandlers ? () => setHovered(false) : undefined}
    >
      <SmoothImage
        key={current.src}
        src={current.src}
        srcSet={current.srcSet}
        sizes={sizes}
        alt={alt}
        priority={priority}
        className={`carousel-frame absolute inset-0 h-full w-full object-contain ${imgClassName}`}
      />

      {showDots && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-70"
          }`}
        >
          {images.map((img, i) => (
            <span
              key={img.src}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-paper" : "w-1.5 bg-paper/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
