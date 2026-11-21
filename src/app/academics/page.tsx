import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PlaceholderBadge } from "@/components/shared/PlaceholderBadge";
import { grades } from "@/data/grades";

export const metadata = { title: "Academics" };

export default function AcademicsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">Academics</span>
        </nav>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-navy">Academics</h1>
        <p className="mt-4 text-muted max-w-2xl">Curriculum details to be confirmed by the school. We do not name a board or syllabus until verified.</p>
        <section className="mt-12">
          <h2 className="font-heading text-xl font-semibold text-navy">Grade-wise journey</h2>
          <div className="mt-6 space-y-4">
            {grades.map((g) => (
              <div key={g.id} className="flex gap-4 rounded-[var(--radius-card)] border border-border bg-white p-5">
                <div className="shrink-0 w-12 h-12 rounded-full bg-light border border-border flex items-center justify-center font-heading font-bold text-navy">{g.id}</div>
                <div>
                  <h3 className="font-heading font-semibold text-navy">{g.label} <span className="text-sm font-normal text-muted">{g.ageRange}</span></h3>
                  <p className="mt-1 text-sm text-muted">{g.focus}</p>
                  {!g.verified && <PlaceholderBadge className="mt-2" />}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
