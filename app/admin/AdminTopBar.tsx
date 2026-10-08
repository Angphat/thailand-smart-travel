"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";

export default function AdminTopBar({ email }: { email: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between gap-4 border-b border-sand bg-cream-light px-6 py-4 lg:px-8">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rust">
          Administrator
        </p>
        <p className="mt-0.5 truncate text-sm text-ink/70">
          Signed in as <span className="font-semibold text-ink">{email}</span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-sand px-3 py-2 text-sm font-medium text-ink/70 transition hover:bg-cream"
        >
          <ExternalLink size={16} />
          <span className="hidden sm:inline">View Website</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl bg-ink px-3 py-2 text-sm font-medium text-cream-light transition hover:bg-ink/85"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
