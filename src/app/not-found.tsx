import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-6xl font-bold text-slate-200">404</p>
      <h1 className="mt-4 text-xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-sm text-muted">That route doesn’t exist on PlayGrid.</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-[var(--radius-button)] bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover"
      >
        Back to games
      </Link>
    </div>
  );
}
