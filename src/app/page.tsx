import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-indigo-50 via-white to-bg">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-accent shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Live · Free to play
          </p>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-ink">
            {siteConfig.name}
          </h1>
          <p className="mt-4 text-lg text-muted max-w-xl mx-auto">{siteConfig.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/games/tic-tac-toe"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-button)] bg-accent px-6 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover transition"
            >
              Play Tic-Tac-Toe
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-ink tracking-tight">Games</h2>
          <p className="mt-1 text-sm text-muted">Pick a game and start playing.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.games.map((game) => (
            <Link
              key={game.id}
              href={game.slug}
              className="group relative rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ background: `${game.accent}18` }}
              >
                {game.emoji}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink group-hover:text-accent transition">
                {game.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">{game.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Play now <span className="transition group-hover:translate-x-0.5">→</span>
              </span>
              {game.status === "live" && (
                <span className="absolute top-4 right-4 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                  Live
                </span>
              )}
            </Link>
          ))}

          <div className="rounded-[var(--radius-card)] border border-dashed border-border bg-slate-50/80 p-6 flex flex-col justify-center min-h-[180px]">
            <p className="text-2xl opacity-40">🎮</p>
            <h3 className="mt-3 text-lg font-semibold text-muted">More games</h3>
            <p className="mt-1.5 text-sm text-muted">New titles are on the way. Check back soon.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
