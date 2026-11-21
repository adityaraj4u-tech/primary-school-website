import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/config/site";
import { PlaceholderBadge } from "@/components/shared/PlaceholderBadge";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">Contact</span>
        </nav>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-navy">Contact</h1>
        <p className="mt-4 text-muted max-w-xl">Reach the school office for admissions, general queries or visits.</p>
        <div className="mt-10 space-y-6 max-w-lg">
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy">Address</h2>
            <p className="mt-2 text-sm text-muted">{siteConfig.address.line1}<br />{siteConfig.address.line2}</p>
            <PlaceholderBadge className="mt-2" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy">Phone</h2>
            <p className="mt-2 text-sm text-muted">Phone number to be confirmed. <PlaceholderBadge /></p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy">Office timings</h2>
            <p className="mt-2 text-sm text-muted">{siteConfig.timings.office}</p>
            <PlaceholderBadge className="mt-2" />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
