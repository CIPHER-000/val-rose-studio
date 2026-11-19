import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/gallery";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://val-rose-studio.vercel.app"),
  title: {
    default: "Val Rose Studio — Fashion, Beauty & Visual Storytelling",
    template: "%s — Val Rose Studio",
  },
  description:
    "Val Rose Studio is the creative portfolio of Valentina Rose — fashion, beauty and lifestyle content creator. Editorial styling, product showcases and visual storytelling for brands.",
  keywords: [
    "fashion creator",
    "beauty creator",
    "content creator portfolio",
    "brand collaborations",
    "editorial styling",
    "product showcase",
  ],
  authors: [{ name: "Valentina Rose" }],
  openGraph: {
    title: "Val Rose Studio — Fashion, Beauty & Visual Storytelling",
    description:
      "Editorial portfolio of Valentina Rose. Fashion, beauty and lifestyle content for brand collaborations.",
    url: "https://val-rose-studio.vercel.app",
    siteName: "Val Rose Studio",
    images: [
      {
        url: "/assets/hero/hero-1200.webp",
        width: 1200,
        height: 1200,
        alt: "Valentina Rose — beauty portrait",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Val Rose Studio — Fashion, Beauty & Visual Storytelling",
    description:
      "Editorial portfolio of Valentina Rose. Fashion, beauty and lifestyle content for brand collaborations.",
    images: ["/assets/hero/hero-1200.webp"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
  other: { "tiktok:profile": profile.tiktok },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <noscript>
          {/* Without JS the scroll-reveal never runs, so never hide content behind it. */}
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
