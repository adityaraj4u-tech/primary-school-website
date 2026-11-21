import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient, isAdminUser } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  if (!siteConfig.features.enableSupabase) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center px-4">
        <div className="max-w-md rounded-[var(--radius-card)] border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
          <p className="font-semibold">Supabase is not enabled</p>
          <p className="mt-2">
            Set <code className="text-xs">enableSupabase: true</code> in{" "}
            <code className="text-xs">src/config/site.ts</code> and add env vars
            before using the admin area.
          </p>
          <Link href="/" className="mt-4 inline-block text-navy font-medium underline">
            ← Back to site
          </Link>
        </div>
      </div>
    );
  }

  const admin = await isAdminUser();
  if (!admin) redirect("/admin/login");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count: enquiryCount } = await supabase
    .from("enquiries")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <div className="min-h-screen bg-light">
      <header className="bg-white border-b border-border">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <p className="font-heading font-semibold text-navy text-sm">
            {siteConfig.name} · Admin
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted truncate max-w-[12rem]">{user?.email}</span>
            <form action="/admin/logout" method="post">
              <button type="submit" className="text-navy font-medium hover:underline">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-heading text-2xl font-semibold text-navy">Dashboard</h1>
        <p className="mt-2 text-sm text-muted">Manage enquiries, gallery and school information.</p>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="rounded-[var(--radius-card)] border border-border bg-white p-5">
            <p className="text-xs font-medium text-muted uppercase tracking-wide">New enquiries</p>
            <p className="mt-2 font-heading text-3xl font-semibold text-navy">{enquiryCount ?? 0}</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-white p-5">
            <p className="text-xs font-medium text-muted uppercase tracking-wide">Gallery</p>
            <p className="mt-2 text-sm text-muted">Upload flow comes next.</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-white p-5">
            <p className="text-xs font-medium text-muted uppercase tracking-wide">Documents</p>
            <p className="mt-2 text-sm text-muted">Mandatory disclosure uploads — next.</p>
          </div>
        </div>
        <p className="mt-10">
          <Link href="/" className="text-sm font-medium text-blue-700 hover:underline">
            ← View public site
          </Link>
        </p>
      </main>
    </div>
  );
}
