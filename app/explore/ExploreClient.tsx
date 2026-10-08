"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import DestinationCard from "@/components/DestinationCard";
import foodsData from "@/data/foods.json";
import { Food } from "@/types/food";
import type { getAllDestinations } from "@/lib/destinations";

type Destination = Awaited<ReturnType<typeof getAllDestinations>>[number];

type Props = {
  destinations: Destination[];
  isLoggedIn: boolean;
};

export default function ExploreClient({ destinations, isLoggedIn }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const foods = foodsData as Food[];

  const categories = ["All", "City", "Beach", "Culture", "Nature"];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        destination.name.toLowerCase().includes(searchText) ||
        destination.province.toLowerCase().includes(searchText);

      const destinationCategory = destination.category.toLowerCase().trim();

      let matchesCategory = true;

      if (category === "City") {
        matchesCategory =
          destinationCategory.includes("city") ||
          destinationCategory.includes("urban");
      }

      if (category === "Beach") {
        matchesCategory =
          destinationCategory.includes("beach") ||
          destinationCategory.includes("island") ||
          destinationCategory.includes("coast");
      }

      if (category === "Culture") {
        matchesCategory =
          destinationCategory.includes("culture") ||
          destinationCategory.includes("temple") ||
          destinationCategory.includes("history") ||
          destinationCategory.includes("historical");
      }

      if (category === "Nature") {
        matchesCategory =
          destinationCategory.includes("nature") ||
          destinationCategory.includes("island") ||
          destinationCategory.includes("beach");
      }

      return matchesSearch && matchesCategory;
    });
  }, [search, category, destinations]);

  return (
    <main className="min-h-screen bg-cream">
      {/* ==============================
          HEADER
      ============================== */}
      <section className="bg-gradient-to-br from-moss via-moss-dark to-ink px-6 py-20 text-cream-light">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Discover Thailand
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">Explore Thailand</h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-cream-light/85">
            Discover Thailand&apos;s cities, beaches, culture, food, and
            unforgettable travel experiences.
          </p>
        </div>
      </section>

      {/* ==============================
          SEARCH + FILTER
      ============================== */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-sand bg-cream-light px-5 py-3 outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/20"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  category === item
                    ? "bg-moss text-cream-light shadow-sm"
                    : "bg-cream-light text-ink/70 ring-1 ring-sand hover:bg-cream"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          AI TRAVEL ASSISTANT
      ============================== */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="mb-10 rounded-3xl bg-cream-light p-8 shadow-sm ring-1 ring-sand md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-rust">
                AI Travel Assistant
              </p>

              <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">
                Not sure where to go?
              </h2>

              <p className="mt-2 max-w-2xl text-ink/70">
                Let our AI create a personalized Thailand itinerary based on
                your destination, budget, travel duration, and interests.
              </p>
            </div>

            <div className="text-right">
              <a
                href="/planner"
                className="whitespace-nowrap rounded-xl bg-moss px-6 py-3 font-semibold text-cream-light transition hover:bg-moss-dark"
              >
                Start Planning →
              </a>
              {!isLoggedIn && (
                <p className="mt-2 text-xs text-ink/50">
                  Sign in required to use the planner
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          DESTINATIONS
      ============================== */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">
              Popular Destinations
            </h2>

            <p className="mt-1 text-sm text-ink/50">
              Explore Thailand by category
            </p>
          </div>

          <p className="text-sm font-medium text-ink/50">
            {filteredDestinations.length} destinations
          </p>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="rounded-2xl bg-cream-light p-12 text-center shadow-sm ring-1 ring-sand">
            <p className="text-lg font-semibold text-ink">
              No destinations found
            </p>

            <p className="mt-2 text-sm text-ink/60">
              Try another destination or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-xl bg-moss px-5 py-2.5 text-sm font-semibold text-cream-light transition hover:bg-moss-dark"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}

        {/* ==============================
            FOOD SECTION
        ============================== */}
        <section className="mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-rust">
                Taste Thailand
              </p>

              <h2 className="mt-2 text-3xl font-bold text-ink">
                Must-Try Thai Food
              </h2>

              <p className="mt-3 max-w-2xl text-ink/70">
                Discover famous Thai dishes and local flavors you should try
                during your trip.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foods.map((food) => (
              <div
                key={food.id}
                className="thai-card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand/30">
                  <Image
                    src={food.image}
                    alt={food.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <span className="inline-block rounded-full bg-rust/10 px-3 py-1 text-xs font-semibold text-rust">
                    {food.category}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-ink">
                    {food.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-ink/70">
                    {food.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
