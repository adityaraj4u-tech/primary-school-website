import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 text-center">
        <p className="text-sm font-semibold text-blue tracking-wide uppercase">404</p>
        <h1 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-navy">Page not found</h1>
        <p className="mt-4 text-muted max-w-md mx-auto">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="mt-8 inline-flex items-center justify-center h-12 px-6 rounded-[var(--radius-button)] bg-yellow text-navy font-semibold hover:brightness-95 transition">
          Back to home
        </Link>
      </div>
    </SiteShell>
  );
}
