"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WorkImage } from "@/lib/gallery";
import SmoothImage from "./SmoothImage";

type Props = {
  images: WorkImage[];
  sizes: string;
  alt: string;
  /** Fixed interval between frames while hovering. */
  interval?: number;
  priority?: boolean;
  /** Dim + zoom hooks supplied by the parent card. */
  imgClassName?: string;
};

/**
 * Shows the first image of a carousel and advances through the rest while the
 * pointer is over it, so a multi-image post behaves like the carousel it was
 * published as. Everything is preloaded on first hover, so swaps are instant;
 * users who ask for reduced motion get a single static frame.
 */
export default function HoverCarousel({
  images,
  sizes,
  alt,
  interval = 2000,
  priority = false,
  imgClassName = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const warmed = useRef(false);

  const canCycle = images.length > 1;

  const stop = useCallback(() => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
    setIndex(0);
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

  const start = useCallback(() => {
    if (!canCycle) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    preload();
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
  }, [canCycle, preload, images.length, interval]);

  useEffect(() => stop, [stop]);

  const current = images[Math.min(index, images.length - 1)];

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <SmoothImage
        key={current.src}
        src={current.src}
        srcSet={current.srcSet}
        sizes={sizes}
        alt={alt}
        priority={priority}
        className={`carousel-frame absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />

      {canCycle && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
