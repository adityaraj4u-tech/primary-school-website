import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/config/site";
import { PlaceholderBadge } from "@/components/shared/PlaceholderBadge";
import { grades } from "@/data/grades";
import { facilities } from "@/data/facilities";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="relative bg-white overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h1 className="font-heading text-[1.85rem] sm:text-4xl lg:text-[2.65rem] font-bold text-navy leading-[1.15] max-w-[18ch]">
                Little Steps Today, Big Dreams Tomorrow.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-[36ch]">
                A caring foundation for curious young minds. Discover a welcoming learning environment where strong foundations, creativity and values grow together.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/admissions" className="inline-flex items-center justify-center h-12 min-w-[10rem] px-6 rounded-[var(--radius-button)] bg-yellow text-navy font-semibold text-base hover:brightness-95 transition shadow-sm">
                  Explore Admissions
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center h-12 min-w-[10rem] px-6 rounded-[var(--radius-button)] border-2 border-navy/15 text-navy font-semibold text-base hover:bg-light transition">
                  Discover Our School
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden bg-cream border border-border shadow-sm">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <p className="text-sm font-semibold text-navy">Sample image</p>
                  <p className="text-xs text-muted mt-1.5 max-w-[14rem] leading-relaxed">
                    A classroom photograph will appear here once consented images are available.
                  </p>
                  <PlaceholderBadge className="mt-4" label="Sample image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl md:text-[1.75rem] font-semibold text-navy">A place where children begin</h2>
            <p className="mt-4 text-muted leading-relaxed">
              At {siteConfig.name} we focus on the early years — Grades 1 to 5 — so every child builds confidence, curiosity and foundational skills in a safe, warm setting.
            </p>
            <p className="mt-3 text-sm text-muted/90 flex items-center gap-2 flex-wrap">
              <PlaceholderBadge /> School introduction will be refined with the principal and management.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-[1.75rem] font-semibold text-navy text-center">Why families choose us</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Small, caring classes", body: "Attention for every child in the early years so no one is left behind." },
              { title: "Strong foundations", body: "Reading, numbers and thinking skills built step by step with patience." },
              { title: "Safe campus", body: "Clear safety routines and a watchful adult presence throughout the day." },
              { title: "Values & play", body: "Character, creativity and outdoor time woven into every week." },
            ].map((card) => (
              <article key={card.title} className="rounded-[var(--radius-card)] border border-border bg-white p-5 shadow-sm">
                <h3 className="font-heading font-semibold text-navy text-[1.05rem]">{card.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{card.body}</p>
                <PlaceholderBadge className="mt-3" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-[1.75rem] font-semibold text-navy">The journey from Grade 1 to 5</h2>
          <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {grades.map((g) => (
              <li key={g.id} className="relative">
                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-white border-2 border-blue flex items-center justify-center font-heading font-bold text-navy text-xl shadow-sm">
                    {g.id}
                  </div>
                  <div className="md:mt-3">
                    <p className="font-heading font-semibold text-navy text-sm">{g.label}</p>
                    <p className="text-xs text-muted mt-0.5">{g.ageRange}</p>
                    <p className="text-xs text-muted mt-2 leading-snug max-w-[14rem] md:mx-auto">{g.focus}</p>
                    {!g.verified && <PlaceholderBadge className="mt-2" label="Details soon" />}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-[1.75rem] font-semibold text-navy">Spaces for learning and play</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {facilities.map((f) => (
              <article key={f.id} className="rounded-[var(--radius-card)] bg-white border border-border p-5 shadow-sm">
                <h3 className="font-heading font-semibold text-navy text-[1.05rem]">{f.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{f.description}</p>
                {!f.verified && <PlaceholderBadge className="mt-3" />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white">Ready to take the first step?</h2>
          <p className="mt-4 text-white/80 max-w-lg mx-auto text-[0.95rem]">
            Visit the school, ask questions, or start an enquiry. We are happy to guide you through the process.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/admissions" className="inline-flex items-center justify-center h-12 px-7 rounded-[var(--radius-button)] bg-yellow text-navy font-semibold hover:brightness-95 transition">
              Explore Admissions
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center h-12 px-7 rounded-[var(--radius-button)] border border-white/30 text-white font-semibold hover:bg-white/10 transition">
              Contact the school
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
