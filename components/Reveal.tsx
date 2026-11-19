"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

/**
 * Fades + lifts content into view once it enters the viewport.
 * Uses a plain IntersectionObserver and CSS transitions so that:
 *  - content can never get stranded invisible (observer failure falls back to shown),
 *  - `prefers-reduced-motion` users get the content immediately with no animation.
 */
export default function Reveal({ children, delay = 0, y = 24, className = "", once = true }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-reveal
      className={`reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
