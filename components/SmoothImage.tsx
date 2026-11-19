"use client";

import type { CSSProperties } from "react";

type Props = {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  className?: string;
  /** Above-the-fold images load eagerly and get a high fetch priority. */
  priority?: boolean;
  style?: CSSProperties;
};

/**
 * Plain <img> with an explicit srcset.
 *
 * The image optimiser is deliberately bypassed: the WebP variants are already
 * generated at q88 up to the source resolution, so the browser can pick the exact
 * file it needs. Nothing is re-encoded a second time and nothing is upscaled,
 * which is what made the previous build look soft.
 */
export default function SmoothImage({
  src,
  srcSet,
  sizes,
  alt,
  className = "",
  priority = false,
  style,
}: Props) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
    />
  );
}
