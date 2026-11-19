"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/gallery";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#categories", label: "Content" },
  { href: "#social", label: "Social" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial ${
          scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-editorial items-center justify-between px-6 py-5 md:px-10">
          <a href="#top" className="group flex items-baseline gap-2" aria-label="Val Rose Studio — home">
            <span className="font-display text-lg tracking-tight">Val Rose Studio</span>
            <span className="hidden text-[10px] uppercase tracking-widest text-muted sm:inline">
              {profile.handle}
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm text-ink/80 transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-500 after:ease-editorial hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="rounded-full border border-ink px-5 py-2 text-sm transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                Collaborate
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" strokeWidth={1.25} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-paper transition-opacity duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg">Val Rose Studio</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </div>
          <ul className="mt-16 space-y-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl tracking-tight"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 border-t border-line pt-6">
            <a href={`mailto:${profile.email}`} className="block text-sm text-muted">
              {profile.email}
            </a>
            <a
              href={profile.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-muted"
            >
              TikTok {profile.handle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
