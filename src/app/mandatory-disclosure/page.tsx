import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Mandatory Disclosure" };

const categories = [
  "General information",
  "Affiliation status",
  "Society / trust details",
  "Recognition documents",
  "Staff information",
  "Infrastructure",
  "Academic information",
  "Fee structure",
  "Safety certificates",
  "Other statutory documents",
];

export default function MandatoryDisclosurePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">Mandatory Disclosure</span>
        </nav>
        <div className="mb-10 rounded-[var(--radius-card)] border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-950 leading-relaxed font-medium">{siteConfig.affiliation.statusText}</p>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-navy">Mandatory Disclosure</h1>
        <div className="mt-10 space-y-4">
          {categories.map((title) => (
            <div key={title} className="rounded-[var(--radius-card)] border border-border bg-white p-5">
              <h2 className="font-heading font-semibold text-navy text-base">{title}</h2>
              <p className="mt-2 text-sm text-muted">No document published yet.</p>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
