"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import {
  Menu,
  X,
  Sparkles,
  Map,
  Languages,
  Coins,
  Lightbulb,
  Lock,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

type NavbarUser = {
  userId: string;
  role: string;
  email: string;
} | null;

const navItems = [
  { name: "Explore", href: "/explore", icon: Map, memberOnly: false },
  { name: "AI Planner", href: "/planner", icon: Sparkles, memberOnly: true },
  {
    name: "Translator",
    href: "/translator",
    icon: Languages,
    memberOnly: false,
  },
  { name: "Currency", href: "/currency", icon: Coins, memberOnly: false },
  { name: "Travel Tips", href: "/tips", icon: Lightbulb, memberOnly: false },
];

export default function Navbar({ user }: { user: NavbarUser }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMenuOpen(false);
    setAccountOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-cream-light/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-xl shadow-sm">
            🇹🇭
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-cream-light bg-gold" />
          </div>

          <div className="hidden sm:block">
            <p className="font-heading text-sm font-bold leading-tight text-ink">
              Thailand Smart
            </p>
            <p className="text-xs font-medium text-ink/60">Travel Assistant</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const locked = item.memberOnly && !user;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-2.5 text-sm font-medium text-ink/70 transition hover:bg-moss/10 hover:text-moss"
              >
                <Icon
                  size={16}
                  className="shrink-0 transition group-hover:scale-105"
                />
                {item.name}
                {locked && <Lock size={12} className="shrink-0 text-rust" />}
              </Link>
            );
          })}
        </nav>

        {/* CTA + Auth */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/planner"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-moss px-4 py-2.5 text-sm font-semibold text-cream-light shadow-sm transition hover:bg-moss-dark"
          >
            <Sparkles size={16} />
            Plan My Trip
            {!user && <Lock size={14} />}
          </Link>

          {user ? (
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-sand px-3 py-2.5 text-sm font-medium text-ink/70 transition hover:bg-cream"
              >
                <UserIcon size={16} />
                <ChevronDown
                  size={14}
                  className={
                    accountOpen ? "rotate-180 transition" : "transition"
                  }
                />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-sand bg-cream-light shadow-lg">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-rust transition hover:bg-rust/10"
                    >
                      <LayoutDashboard size={16} />
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-ink/80 transition hover:bg-moss/10"
                  >
                    <UserIcon size={16} />
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 border-t border-sand px-4 py-3 text-left text-sm font-medium text-ink/80 transition hover:bg-cream"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-sand px-3 py-2.5 text-sm font-medium text-ink/70 transition hover:bg-cream"
            >
              <UserIcon size={16} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sand text-ink lg:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-sand bg-cream-light px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-rust/10 px-4 py-3 text-sm font-semibold text-rust"
              >
                <LayoutDashboard size={18} />
                Admin Dashboard
              </Link>
            )}

            {user && (
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink/80 hover:bg-moss/10"
              >
                <UserIcon size={18} />
                My Account
              </Link>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const locked = item.memberOnly && !user;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ink/80 hover:bg-moss/10 hover:text-moss"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.name}
                  </span>
                  {locked && <Lock size={14} className="text-rust" />}
                </Link>
              );
            })}

            <Link
              href="/planner"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-moss px-4 py-3 text-sm font-semibold text-cream-light"
            >
              <Sparkles size={16} />
              Plan My Trip
              {!user && <Lock size={14} />}
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-sand px-4 py-3 text-sm font-medium text-ink/70"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-sand px-4 py-3 text-sm font-medium text-ink/70"
              >
                <UserIcon size={16} />
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
