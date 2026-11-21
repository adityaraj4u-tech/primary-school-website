import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PlaceholderBadge } from "@/components/shared/PlaceholderBadge";

const footerLinks = {
  explore: [
    { href: "/about", label: "About Us" },
    { href: "/academics", label: "Academics" },
    { href: "/admissions", label: "Admissions" },
    { href: "/gallery", label: "Gallery" },
  ],
  information: [
    { href: "/mandatory-disclosure", label: "Mandatory Disclosure" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/accessibility", label: "Accessibility" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-heading text-xl font-semibold tracking-tight">{siteConfig.name}</p>
            <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-xs">
              A caring foundation for curious young minds.
            </p>
            <div className="mt-4">
              <PlaceholderBadge label="Address & contact" className="bg-amber-200/90 text-amber-900 border-amber-300" />
            </div>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/90 hover:text-yellow transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">Information</h3>
            <ul className="space-y-2.5">
              {footerLinks.information.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/90 hover:text-yellow transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">Reach us</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <span className="block text-white/60 text-xs mb-0.5">Office</span>
                {siteConfig.timings.office}
                <PlaceholderBadge className="ml-2" />
              </li>
              <li className="pt-2">
                <Link href="/contact" className="inline-flex items-center gap-1 text-yellow font-medium hover:underline">
                  Full contact details →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col sm:flex-row justify-between gap-4 text-sm text-white/60">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="text-xs max-w-md">
            This website does not claim CBSE affiliation. All academic and administrative details are subject to verification by the school.
          </p>
        </div>
      </div>
    </footer>
  );
}
