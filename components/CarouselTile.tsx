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
};

// Desktop frames change a little faster than mobile, where there is no cursor to
// hold a frame and the viewer needs longer to read each one.
const DESKTOP_MS = 2000;
const MOBILE_MS = 3000;
const MOBILE_BREAKPOINT = 768;
// Hold the first frame briefly after the tile enters view so it registers.
const START_DELAY_MS = 700;

/**
 * Carousel tile.
 *
 * - Starts advancing on its own as soon as the tile scrolls into view.
 * - On a device with a cursor, hovering freezes the frame that is showing and
 *   leaving the tile resumes from that same frame (it does not jump back).
 * - Pauses entirely when scrolled out of view, and stays static for anyone who
 *   asks for reduced motion.
 */
export default function CarouselTile({
  images,
  sizes,
  alt,
  priority = false,
  imgClassName = "",
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

  // Run the advance timer while visible and not being inspected.
  useEffect(() => {
    if (!canCycle || !inView || hovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    preload();
    const ms = window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_MS : DESKTOP_MS;

    const start = window.setTimeout(() => {
      timer.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, ms);
    }, START_DELAY_MS);

    return () => {
      window.clearTimeout(start);
      if (timer.current !== null) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [canCycle, inView, hovered, preload, images.length]);

  const current = images[Math.min(index, images.length - 1)];
  const showDots = canCycle;

  return (
    <div
      ref={rootRef}
      className="absolute inset-0"
      onMouseEnter={hoverCapable ? () => setHovered(true) : undefined}
      onMouseLeave={hoverCapable ? () => setHovered(false) : undefined}
      onFocus={hoverCapable ? () => setHovered(true) : undefined}
      onBlur={hoverCapable ? () => setHovered(false) : undefined}
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
