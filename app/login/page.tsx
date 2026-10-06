"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRedirectTo(params.get("redirect"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "เข้าสู่ระบบไม่สำเร็จ");
      return;
    }

    router.push(redirectTo ?? (data.role === "ADMIN" ? "/admin" : "/"));
    router.refresh();
  }

  const registerHref = redirectTo
    ? `/register?redirect=${encodeURIComponent(redirectTo)}`
    : "/register";

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 className="font-heading text-2xl font-bold text-ink">Login</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full rounded-xl border border-sand bg-cream-light px-4 py-3 outline-none focus:border-moss"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full rounded-xl border border-sand bg-cream-light px-4 py-3 outline-none focus:border-moss"
        />

        {error && <p className="text-sm text-rust">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-moss px-4 py-3 font-semibold text-cream-light transition hover:bg-moss-dark disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-ink/60">
        Don&apos;t have an account?{" "}
        <a
          href={registerHref}
          className="font-semibold text-moss hover:underline"
        >
          Register here
        </a>
      </p>
    </main>
  );
}
