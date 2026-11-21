import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PlaceholderBadge } from "@/components/shared/PlaceholderBadge";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">Gallery</span>
        </nav>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-navy">Gallery</h1>
        <p className="mt-4 text-muted max-w-2xl">Only photographs with recorded guardian consent are published.</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/3] rounded-[var(--radius-card)] border border-border bg-cream flex flex-col items-center justify-center p-4 text-center">
              <p className="text-xs font-medium text-navy">Sample image</p>
              <PlaceholderBadge className="mt-2" label="Sample" />
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted text-center">No photos published yet. Check back after the next school event.</p>
      </div>
    </SiteShell>
  );
}
