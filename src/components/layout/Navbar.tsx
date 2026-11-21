"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white text-sm">
            ▣
          </span>
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className={`rounded-lg px-3 py-1.5 transition ${
              pathname === "/" ? "bg-slate-100 text-ink font-medium" : "text-muted hover:text-ink"
            }`}
          >
            Games
          </Link>
          <Link
            href="/games/tic-tac-toe"
            className={`rounded-lg px-3 py-1.5 transition ${
              pathname.startsWith("/games/tic-tac-toe")
                ? "bg-slate-100 text-ink font-medium"
                : "text-muted hover:text-ink"
            }`}
          >
            Tic-Tac-Toe
          </Link>
        </nav>
      </div>
    </header>
  );
}
