"use client";

import { useState } from "react";

type DayPlan = {
  day: number;
  morning: string;
  lunch: string;
  afternoon: string;
  dinner: string;
  evening: string;
};

type ItineraryData = {
  tripSummary?: {
    destination: string;
    duration: string;
    budget: string;
    interest: string;
  };
  days?: DayPlan[];
  budgetTips?: string[];
  travelTips?: string[];
};

type HistoryEntry = {
  id: string;
  destination: string;
  days: number;
  budget: string;
  interest: string;
  createdAt: string;
  itinerary: ItineraryData;
};

export default function ProfileHistoryList({
  history,
}: {
  history: HistoryEntry[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {history.map((entry) => {
        const isOpen = openId === entry.id;

        return (
          <article
            key={entry.id}
            className="overflow-hidden rounded-2xl bg-cream-light shadow-sm ring-1 ring-sand"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : entry.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <div>
                <h3 className="font-heading text-lg font-bold text-ink">
                  {entry.destination}
                </h3>
                <p className="mt-1 text-sm text-ink/60">
                  {entry.days} day{entry.days > 1 ? "s" : ""} · {entry.budget} ·{" "}
                  {entry.interest}
                </p>
                <p className="mt-1 text-xs text-ink/40">
                  Planned on {new Date(entry.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span className="shrink-0 text-sm font-semibold text-moss">
                {isOpen ? "Hide details ▲" : "View details ▼"}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-sand bg-cream p-5">
                <div className="space-y-4">
                  {entry.itinerary.days?.map((day) => (
                    <div
                      key={day.day}
                      className="rounded-xl border border-sand bg-cream-light p-4"
                    >
                      <p className="text-sm font-bold text-rust">
                        Day {day.day}
                      </p>
                      <div className="mt-2 space-y-1.5 text-sm leading-6 text-ink/80">
                        <p>🌅 {day.morning}</p>
                        <p>🍜 {day.lunch}</p>
                        <p>☀️ {day.afternoon}</p>
                        <p>🍽️ {day.dinner}</p>
                        <p>🌙 {day.evening}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {entry.itinerary.budgetTips &&
                  entry.itinerary.budgetTips.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-bold text-ink">
                        💰 Budget Tips
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-ink/70">
                        {entry.itinerary.budgetTips.map((tip, i) => (
                          <li key={i}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
