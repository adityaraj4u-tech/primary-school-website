"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";
  const notAdmin = searchParams.get("error") === "not_admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    notAdmin ? "This account is not an admin." : ""
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        setError(
          "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
        );
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data, error: signError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signError) {
        setError(signError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Sign-in failed.");
        setLoading(false);
        return;
      }

      const { data: admin } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (!admin) {
        await supabase.auth.signOut();
        setError("This account is not authorised as an admin.");
        setLoading(false);
        return;
      }

      router.replace(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Check Supabase configuration.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-card)] border border-border bg-white p-8 shadow-sm">
        <h1 className="font-heading text-xl font-semibold text-navy">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted">School staff only. There is no public registration.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email</label>
            <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 rounded-[var(--radius-input)] border border-border text-base focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy mb-1.5">Password</label>
            <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 rounded-[var(--radius-input)] border border-border text-base focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none" />
          </div>
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full h-11 rounded-[var(--radius-button)] bg-navy text-white font-semibold text-sm hover:opacity-95 disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
