import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">Privacy Policy</span>
        </nav>
        <h1 className="font-heading text-3xl font-semibold text-navy">Privacy Policy</h1>
        <div className="mt-8 space-y-4 text-muted text-sm leading-relaxed">
          <p>This notice explains how {siteConfig.name} handles personal data collected through this website.</p>
          <p>Enquiry data is used only to respond to your request. We follow the principles of India’s Digital Personal Data Protection Act, 2023. Photographs of identifiable children are published only with recorded guardian consent.</p>
          <p>For privacy questions, contact the school office.</p>
        </div>
      </div>
    </SiteShell>
  );
}
