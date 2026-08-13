import Link from "next/link";
import { Map, Sparkles, Languages, Coins, Lightbulb } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Gold accent */}
      <div className="h-1 bg-[#D4A72C]" />

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl">
                🇹🇭
              </div>

              <div>
                <p className="font-bold">Thailand Smart</p>

                <p className="text-xs text-slate-400">Travel Assistant</p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Your smart travel companion for exploring Thailand. Discover
              destinations, plan your trip with AI, translate languages, and
              manage your travel budget.
            </p>

            <p className="mt-5 text-sm font-medium text-slate-300">
              Discover Thailand with confidence.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold">Explore</h3>

            <div className="mt-4 space-y-3">
              <Link
                href="/explore"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Explore Thailand
              </Link>

              <Link
                href="/planner"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                AI Travel Planner
              </Link>

              <Link
                href="/tips"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Travel Tips
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-bold">Travel Tools</h3>

            <div className="mt-4 space-y-3">
              <Link
                href="/translator"
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <Languages size={15} />
                AI Translator
              </Link>

              <Link
                href="/currency"
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <Coins size={15} />
                Currency Converter
              </Link>

              <Link
                href="/planner"
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <Sparkles size={15} />
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Thailand Smart Travel Assistant</p>

          <p>Built for travelers exploring Thailand 🇹🇭</p>
        </div>
      </div>
    </footer>
  );
}
