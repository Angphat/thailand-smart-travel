"use client";

import { useMemo, useState } from "react";

import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/lib/destinations";
import foodsData from "@/data/foods.json";
import { Food } from "@/types/food";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const foods = foodsData as Food[];

  // Main destination categories
  const categories = ["All", "City", "Beach", "Culture", "Nature"];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      // -----------------------------
      // SEARCH
      // -----------------------------
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        destination.name.toLowerCase().includes(searchText) ||
        destination.province.toLowerCase().includes(searchText);

      // -----------------------------
      // CATEGORY
      // -----------------------------
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
  }, [search, category]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ==============================
          HEADER
      ============================== */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-amber-500 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-100">
            Discover Thailand
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">Explore Thailand</h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-red-50">
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
          {/* Search */}
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  category === item
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
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
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
                AI Travel Assistant
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Not sure where to go?
              </h2>

              <p className="mt-2 max-w-2xl text-slate-600">
                Let our AI create a personalized Thailand itinerary based on
                your destination, budget, travel duration, and interests.
              </p>
            </div>

            <a
              href="/planner"
              className="whitespace-nowrap rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Start Planning →
            </a>
          </div>
        </div>
      </section>

      {/* ==============================
          DESTINATIONS
      ============================== */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Popular Destinations
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explore Thailand by category
            </p>
          </div>

          <p className="text-sm font-medium text-slate-500">
            {filteredDestinations.length} destinations
          </p>
        </div>

        {/* No result */}
        {filteredDestinations.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-lg font-semibold text-slate-800">
              No destinations found
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Try another destination or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
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
              <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
                Taste Thailand
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Must-Try Thai Food
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Discover famous Thai dishes and local flavors you should try
                during your trip.
              </p>
            </div>
          </div>

          {/* Food Cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foods.map((food) => (
              <div
                key={food.id}
                className="thai-card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Food Image */}
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                {/* Food Information */}
                <div className="p-5">
                  <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    {food.category}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-slate-900">
                    {food.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
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
