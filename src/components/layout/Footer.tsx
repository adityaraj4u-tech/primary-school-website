import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Free browser games.
        </p>
        <p className="text-xs">No accounts required. Play instantly.</p>
      </div>
    </footer>
  );
}
