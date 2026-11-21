import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/config/site";
import { PlaceholderBadge } from "@/components/shared/PlaceholderBadge";

export const metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">Admissions</span>
        </nav>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-navy">Admissions</h1>
        <p className="mt-4 text-muted max-w-2xl leading-relaxed">
          We welcome enquiries for Grades 1 to 5. Submitting an enquiry does not guarantee admission. Admission is confirmed only by the school.
        </p>
        <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-light p-5">
          <p className="text-sm text-navy font-medium">Current admission status</p>
          <p className="mt-1 text-sm text-muted">Please contact the school office for the latest admission timeline.</p>
          <PlaceholderBadge className="mt-2" label="Confirm open status" />
        </div>
        <section className="mt-12">
          <h2 className="font-heading text-xl font-semibold text-navy">How admission works</h2>
          <ol className="mt-6 space-y-5">
            {[
              { step: "1", title: "Submit an enquiry", body: "Contact the school office or use the contact form." },
              { step: "2", title: "School review", body: "The school may invite you for a meeting or informal interaction." },
              { step: "3", title: "Documents & confirmation", body: "If a place is offered, you will receive the document list from the office." },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-navy text-white font-heading font-semibold text-sm">{item.step}</span>
                <div>
                  <h3 className="font-heading font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="mt-12">
          <h2 className="font-heading text-xl font-semibold text-navy">Fee structure</h2>
          <p className="mt-3 text-muted text-sm">Contact the school office for current fee information.</p>
          <PlaceholderBadge className="mt-2" label="Fees not published" />
        </section>
        <p className="mt-10">
          <Link href="/contact" className="inline-flex h-12 px-6 items-center rounded-[var(--radius-button)] bg-yellow text-navy font-semibold">Contact the school</Link>
        </p>
      </div>
    </SiteShell>
  );
}
