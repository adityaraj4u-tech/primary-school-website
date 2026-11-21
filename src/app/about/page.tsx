import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/config/site";
import { PlaceholderBadge } from "@/components/shared/PlaceholderBadge";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">About</span>
        </nav>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-navy">About {siteConfig.name}</h1>
        <p className="mt-4 text-muted max-w-2xl leading-relaxed">
          We are a primary school focused on Grades 1 to 5. Our aim is to give every child a calm, confident start to formal learning.
        </p>
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="rounded-[var(--radius-card)] bg-cream border border-border p-6">
            <h2 className="font-heading text-lg font-semibold text-navy">Vision</h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">To be a trusted place where young children develop strong foundations, curiosity and kindness.</p>
            <PlaceholderBadge className="mt-3" />
          </div>
          <div className="rounded-[var(--radius-card)] bg-light border border-border p-6">
            <h2 className="font-heading text-lg font-semibold text-navy">Mission</h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">To provide a safe, caring environment and clear teaching so every child can learn, play and grow with confidence.</p>
            <PlaceholderBadge className="mt-3" />
          </div>
        </div>
        <section className="mt-14">
          <h2 className="font-heading text-xl font-semibold text-navy">Principal’s message</h2>
          <p className="mt-3 text-muted text-sm max-w-xl italic">A personal message will be published once the school supplies verified text.</p>
          <PlaceholderBadge className="mt-3" label="Principal message pending" />
        </section>
        <section className="mt-14">
          <h2 className="font-heading text-xl font-semibold text-navy">Teaching philosophy</h2>
          <p className="mt-3 text-muted max-w-2xl text-sm leading-relaxed">We believe early learning works best when it is calm, clear and connected to everyday experience.</p>
          <PlaceholderBadge className="mt-3" />
        </section>
      </div>
    </SiteShell>
  );
}
