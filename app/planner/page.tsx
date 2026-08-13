"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type DayPlan = {
  day: number;
  morning: string;
  lunch: string;
  afternoon: string;
  dinner: string;
  evening: string;
};

type TripSummary = {
  destination: string;
  duration: string;
  budget: string;
  interest: string;
};

type Itinerary = {
  tripSummary: TripSummary;
  days: DayPlan[];
  budgetTips: string[];
  travelTips: string[];
};

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "KRW", name: "Korean Won", symbol: "₩" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
];

export default function PlannerPage() {
  const searchParams = useSearchParams();

  const destinationFromUrl = searchParams.get("destination") || "";

  const [destination, setDestination] = useState(destinationFromUrl);

  const [days, setDays] = useState("3");
  const [budget, setBudget] = useState("500");
  const [currency, setCurrency] = useState("USD");
  const [interest, setInterest] = useState("Culture & Food");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  useEffect(() => {
    if (destinationFromUrl) {
      setDestination(destinationFromUrl);
    }
  }, [destinationFromUrl]);

  async function generateItinerary() {
    if (!destination) {
      setError("Please select a destination.");
      return;
    }

    setLoading(true);
    setError("");
    setItinerary(null);

    try {
      const response = await fetch("/api/planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          days: Number(days),
          budget: Number(budget),
          currency,
          interest,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate itinerary.");
      }

      setItinerary(data.itinerary);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="thai-page">
      {/* HERO */}
      <section className="thai-hero">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <div className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            ✨ AI Travel Planner
          </div>

          <h1 className="mt-6 text-4xl font-bold md:text-6xl">
            Plan your Thailand trip with AI.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/90">
            Create a personalized Thailand itinerary based on your destination,
            budget, travel duration, and interests.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="thai-card p-6 md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
                AI TRAVEL ASSISTANT
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Tell us about your trip
              </h2>

              <p className="mt-2 text-slate-500">
                Your answers help the AI create a more suitable travel plan.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {/* DESTINATION */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  📍 Destination
                </label>

                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500"
                >
                  <option value="">Select destination</option>

                  <option value="Bangkok">Bangkok</option>
                  <option value="Chiang Mai">Chiang Mai</option>
                  <option value="Phuket">Phuket</option>
                  <option value="Hat Yai">Hat Yai</option>
                  <option value="Pattani">Pattani</option>
                  <option value="Krabi">Krabi</option>
                  <option value="Pattaya">Pattaya</option>
                  <option value="Hua Hin">Hua Hin</option>
                  <option value="Ayutthaya">Ayutthaya</option>
                  <option value="Chiang Rai">Chiang Rai</option>
                </select>

                {destinationFromUrl && (
                  <p className="mt-2 text-xs text-green-600">
                    ✓ Destination selected from Explore
                  </p>
                )}
              </div>

              {/* DAYS */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  📅 Number of Days
                </label>

                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500"
                >
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="7">7 Days</option>
                  <option value="10">10 Days</option>
                  <option value="14">14 Days</option>
                </select>
              </div>

              {/* CURRENCY */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  💰 Budget Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500"
                >
                  {currencies.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} — {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* BUDGET */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  💵 Budget
                </label>

                <input
                  type="number"
                  min="1"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="500"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* INTEREST */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  ❤️ Main Interest
                </label>

                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500"
                >
                  <option>Culture & Food</option>
                  <option>Beaches & Nature</option>
                  <option>Shopping</option>
                  <option>Adventure</option>
                  <option>History & Temples</option>
                  <option>Relaxation</option>
                </select>
              </div>
            </div>

            {/* GENERATE */}
            <button
              onClick={generateItinerary}
              disabled={loading}
              className="thai-primary-btn mt-8 w-full rounded-xl px-6 py-4 font-bold shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "✨ Creating your itinerary..."
                : "✨ Generate My Itinerary"}
            </button>

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RESULT */}
      {itinerary && (
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl">
            {/* TRIP SUMMARY */}
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
                YOUR AI-GENERATED TRIP
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                {itinerary.tripSummary?.destination}
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                A personalized {itinerary.tripSummary?.duration} itinerary
                designed around your travel preferences.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                  📍 {itinerary.tripSummary?.destination}
                </span>

                <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                  📅 {itinerary.tripSummary?.duration}
                </span>

                <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                  💰 {itinerary.tripSummary?.budget}
                </span>

                <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                  ❤️ {itinerary.tripSummary?.interest}
                </span>
              </div>
            </div>

            {/* DAY PLANS */}
            <div className="space-y-8">
              {itinerary.days?.map((day) => (
                <article
                  key={day.day}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200"
                >
                  {/* DAY HEADER */}
                  <div className="bg-red-600 px-6 py-5 text-white md:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-red-100">
                      Thailand Trip
                    </p>

                    <h3 className="mt-1 text-2xl font-bold">Day {day.day}</h3>
                  </div>

                  {/* ACTIVITIES */}
                  <div className="p-6 md:p-8">
                    <div className="grid gap-5">
                      {/* MORNING */}
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
                            🌅
                          </div>

                          <div>
                            <p className="text-sm font-bold text-red-600">
                              Morning
                            </p>

                            <p className="mt-2 leading-7 text-slate-700">
                              {day.morning}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* LUNCH */}
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
                            🍜
                          </div>

                          <div>
                            <p className="text-sm font-bold text-red-600">
                              Lunch
                            </p>

                            <p className="mt-2 leading-7 text-slate-700">
                              {day.lunch}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* AFTERNOON */}
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
                            ☀️
                          </div>

                          <div>
                            <p className="text-sm font-bold text-red-600">
                              Afternoon
                            </p>

                            <p className="mt-2 leading-7 text-slate-700">
                              {day.afternoon}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* DINNER */}
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
                            🍽️
                          </div>

                          <div>
                            <p className="text-sm font-bold text-red-600">
                              Dinner
                            </p>

                            <p className="mt-2 leading-7 text-slate-700">
                              {day.dinner}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* EVENING */}
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
                            🌙
                          </div>

                          <div>
                            <p className="text-sm font-bold text-red-600">
                              Evening
                            </p>

                            <p className="mt-2 leading-7 text-slate-700">
                              {day.evening}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* BUDGET TIPS */}
            {itinerary.budgetTips?.length > 0 && (
              <div className="thai-card mt-8 p-6 md:p-8">
                <h3 className="text-xl font-bold text-slate-900">
                  💰 Budget Tips
                </h3>

                <div className="mt-5 space-y-3">
                  {itinerary.budgetTips.map((tip, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-slate-700"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TRAVEL TIPS */}
            {itinerary.travelTips?.length > 0 && (
              <div className="thai-card mt-8 p-6 md:p-8">
                <h3 className="text-xl font-bold text-slate-900">
                  💡 Travel Tips
                </h3>

                <div className="mt-5 space-y-3">
                  {itinerary.travelTips.map((tip, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTION */}
            <div className="mt-8 text-center">
              <Link
                href="/explore"
                className="thai-secondary-btn inline-block rounded-xl px-6 py-3 font-semibold"
              >
                ← Explore More Thailand
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
