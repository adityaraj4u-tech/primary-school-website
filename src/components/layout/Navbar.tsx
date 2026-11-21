"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstFocusable = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    firstFocusable.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-white border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 md:h-[4.25rem] items-center justify-between gap-4">
            <Link href="/" className="font-heading text-lg md:text-xl font-semibold text-navy tracking-tight shrink-0">
              {siteConfig.name}
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      active ? "text-navy bg-light" : "text-muted hover:text-navy hover:bg-light/70"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center h-10 px-5 rounded-[var(--radius-button)] bg-yellow text-navy font-semibold text-sm hover:brightness-95 transition"
              >
                Admissions
              </Link>
            </div>

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg text-navy hover:bg-light"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="absolute inset-0 bg-navy/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
              <span className="font-heading font-semibold text-navy">{siteConfig.shortName}</span>
              <button
                ref={firstFocusable}
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-light"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block px-4 py-3.5 text-base font-medium rounded-xl transition-colors",
                          active ? "bg-light text-navy" : "text-text hover:bg-light/80"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8">
                <Link
                  href="/admissions"
                  className="flex items-center justify-center h-12 w-full rounded-[var(--radius-button)] bg-yellow text-navy font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Explore Admissions
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
