import Link from "next/link";

const features = [
  {
    icon: "🗺️",
    title: "Explore Thailand",
    description:
      "Discover popular destinations, cities, attractions, and places across Thailand.",
    href: "/explore",
    button: "Explore Destinations",
  },
  {
    icon: "✨",
    title: "AI Travel Planner",
    description:
      "Create a personalized itinerary based on your destination, budget, days, and interests.",
    href: "/planner",
    button: "Plan My Trip",
  },
  {
    icon: "🌐",
    title: "AI Translator",
    description:
      "Translate useful travel phrases and communicate more easily during your trip.",
    href: "/translator",
    button: "Translate",
  },
  {
    icon: "💱",
    title: "Currency Converter",
    description:
      "Convert currencies to Thai Baht using current exchange rate information.",
    href: "/currency",
    button: "Convert Currency",
  },
  {
    icon: "💡",
    title: "Travel Tips",
    description:
      "Learn useful information about transportation, culture, weather, food, and safety.",
    href: "/tips",
    button: "View Travel Tips",
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-500">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              🇹🇭 Thailand Smart Travel Assistant
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
              Explore Thailand
              <br />
              Smarter with AI
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
              Discover destinations, plan personalized trips, translate
              languages, convert currencies, and get useful travel tips — all in
              one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/planner"
                className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-red-700 shadow-sm transition hover:bg-slate-100"
              >
                ✨ Start Planning
              </Link>

              <Link
                href="/explore"
                className="rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-center font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore Thailand
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Discover Thailand
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Popular Destinations
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Start exploring some of Thailand&apos;s most popular destinations.
            </p>
          </div>

          <Link
            href="/explore"
            className="font-semibold text-red-600 hover:text-red-700"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {popularPlaces.map((place) => (
            <Link
              key={place.name}
              href={place.href}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-900">
                  {place.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {place.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-red-600">
                  Explore destination →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Everything You Need
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Your Thailand Travel Assistant
            </h2>

            <p className="mt-4 text-slate-600">
              Plan and enjoy your trip with practical tools designed for
              international travelers.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-3xl">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>

                <Link
                  href={feature.href}
                  className="mt-5 inline-block font-semibold text-red-600 hover:text-red-700"
                >
                  {feature.button} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-center md:px-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-400">
            AI-Powered Travel
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Ready to plan your Thailand adventure?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Tell us where you want to go, how long you will stay, your budget,
            and what you enjoy. Our AI Travel Planner will help create your
            itinerary.
          </p>

          <Link
            href="/planner"
            className="mt-7 inline-block rounded-xl bg-red-600 px-7 py-3.5 font-bold text-white transition hover:bg-red-700"
          >
            Create My Itinerary ✨
          </Link>
        </div>
      </section>
    </main>
  );
}
