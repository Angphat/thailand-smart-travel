import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

const features = [
  {
    icon: "🗺️",
    title: "Explore Thailand",
    description:
      "Discover popular destinations, cities, attractions, and places across Thailand.",
    href: "/explore",
    button: "Explore Destinations",
    memberOnly: false,
  },
  {
    icon: "✨",
    title: "AI Travel Planner",
    description:
      "Create a personalized itinerary based on your destination, budget, days, and interests.",
    href: "/planner",
    button: "Plan My Trip",
    memberOnly: true,
  },
  {
    icon: "🌐",
    title: "AI Translator",
    description:
      "Translate useful travel phrases and communicate more easily during your trip.",
    href: "/translator",
    button: "Translate",
    memberOnly: false,
  },
  {
    icon: "💱",
    title: "Currency Converter",
    description:
      "Convert currencies to Thai Baht using current exchange rate information.",
    href: "/currency",
    button: "Convert Currency",
    memberOnly: false,
  },
  {
    icon: "💡",
    title: "Travel Tips",
    description:
      "Learn useful information about transportation, culture, weather, food, and safety.",
    href: "/tips",
    button: "View Travel Tips",
    memberOnly: false,
  },
];

const popularPlaces = [
  {
    name: "Bangkok",
    image: "/images/bangkok.jpg",
    description:
      "Thailand's vibrant capital filled with temples, food, shopping, and nightlife.",
    href: "/explore",
  },
  {
    name: "Chiang Mai",
    image: "/images/chiangmai.jpg",
    description:
      "A cultural destination surrounded by mountains, temples, and local experiences.",
    href: "/explore",
  },
  {
    name: "Phuket",
    image: "/images/phuket.jpg",
    description:
      "A famous island destination known for beaches, activities, and beautiful scenery.",
    href: "/explore",
  },
];

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-moss via-moss-dark to-ink">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              🇹🇭 Thailand Smart Travel Assistant
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-cream-light md:text-6xl">
              Explore Thailand
              <br />
              Smarter with AI
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream-light/85 md:text-xl">
              Discover destinations, plan personalized trips, translate
              languages, convert currencies, and get useful travel tips — all in
              one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/planner"
                className="flex items-center justify-center gap-2 rounded-xl bg-cream-light px-6 py-3.5 text-center font-bold text-moss shadow-sm transition hover:bg-cream"
              >
                ✨ Start Planning
                {!user && <Lock size={16} />}
              </Link>

              <Link
                href="/explore"
                className="rounded-xl border border-cream-light/40 bg-cream-light/10 px-6 py-3.5 text-center font-semibold text-cream-light backdrop-blur transition hover:bg-cream-light/20"
              >
                Explore Thailand
              </Link>
            </div>

            {!user && (
              <p className="mt-3 text-sm text-cream-light/80">
                🔒 Sign in required to use the AI Travel Planner —{" "}
                <Link
                  href="/register"
                  className="font-semibold text-gold underline"
                >
                  Create a free account
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-rust">
              Discover Thailand
            </p>

            <h2 className="mt-2 text-3xl font-bold text-ink">
              Popular Destinations
            </h2>

            <p className="mt-3 max-w-2xl text-ink/70">
              Start exploring some of Thailand&apos;s most popular destinations.
            </p>
          </div>

          <Link
            href="/explore"
            className="font-semibold text-moss hover:text-moss-dark"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {popularPlaces.map((place) => (
            <Link
              key={place.name}
              href={place.href}
              className="group overflow-hidden rounded-3xl bg-cream-light shadow-sm ring-1 ring-sand transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-sand/40">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-ink">{place.name}</h3>

                <p className="mt-2 text-sm leading-6 text-ink/70">
                  {place.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-rust">
                  Explore destination →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-cream-light py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-rust">
              Everything You Need
            </p>

            <h2 className="mt-2 text-3xl font-bold text-ink">
              Your Thailand Travel Assistant
            </h2>

            <p className="mt-4 text-ink/70">
              Plan and enjoy your trip with practical tools designed for
              international travelers.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const locked = feature.memberOnly && !user;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-sand bg-cream p-6 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rust/10 text-3xl">
                    {feature.icon}
                  </div>

                  <h3 className="mt-5 flex items-center gap-2 text-xl font-bold text-ink">
                    {feature.title}
                    {locked && <Lock size={16} className="text-rust" />}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-ink/70">
                    {feature.description}
                  </p>

                  <Link
                    href={feature.href}
                    className="mt-5 inline-block font-semibold text-moss hover:text-moss-dark"
                  >
                    {feature.button} →
                  </Link>

                  {locked && (
                    <p className="mt-2 text-xs text-ink/40">Sign in required</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center md:px-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            AI-Powered Travel
          </p>

          <h2 className="mt-3 text-3xl font-bold text-cream-light md:text-4xl">
            Ready to plan your Thailand adventure?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-cream-light/70">
            Tell us where you want to go, how long you will stay, your budget,
            and what you enjoy. Our AI Travel Planner will help create your
            itinerary.
          </p>

          <Link
            href="/planner"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-moss px-7 py-3.5 font-bold text-cream-light transition hover:bg-moss-dark"
          >
            Create My Itinerary ✨{!user && <Lock size={16} />}
          </Link>

          {!user && (
            <p className="mt-3 text-sm text-cream-light/50">
              🔒 Sign in required
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
