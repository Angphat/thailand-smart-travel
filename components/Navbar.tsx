"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Sparkles,
  Map,
  Languages,
  Coins,
  Lightbulb,
} from "lucide-react";

const navItems = [
  {
    name: "Explore",
    href: "/explore",
    icon: Map,
  },
  {
    name: "AI Planner",
    href: "/planner",
    icon: Sparkles,
  },
  {
    name: "Translator",
    href: "/translator",
    icon: Languages,
  },
  {
    name: "Currency",
    href: "/currency",
    icon: Coins,
  },
  {
    name: "Travel Tips",
    href: "/tips",
    icon: Lightbulb,
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl shadow-sm">
            🇹🇭
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#D4A72C]" />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-slate-950">
              Thailand Smart
            </p>

            <p className="text-xs font-medium text-slate-500">
              Travel Assistant
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Icon size={16} className="transition group-hover:scale-105" />

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 rounded-xl bg-[#A51931] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8E162A]"
          >
            <Sparkles size={16} />
            Plan My Trip
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Icon size={18} />

                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/planner"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#A51931] px-4 py-3 text-sm font-semibold text-white"
            >
              <Sparkles size={16} />
              Plan My Trip
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
