import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">Accessibility</span>
        </nav>
        <h1 className="font-heading text-3xl font-semibold text-navy">Accessibility Statement</h1>
        <div className="mt-8 space-y-4 text-muted text-sm leading-relaxed">
          <p>{siteConfig.name} aims to make this website usable by as many people as possible, including those who use assistive technologies.</p>
          <p>We target WCAG 2.2 Level AA contrast, keyboard navigation, visible focus indicators, and respect for prefers-reduced-motion.</p>
          <p>If you encounter a barrier, please contact the school office.</p>
        </div>
      </div>
    </SiteShell>
  );
}
