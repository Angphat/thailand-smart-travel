import Link from "next/link";
import { notFound } from "next/navigation";
import destinations from "@/data/destinations.json";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DestinationDetailPage({ params }: Props) {
  const { id } = await params;

  const destination = destinations.find((item) => item.id === id);

  if (!destination) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Image */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12">
            <span className="inline-block rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-red-700">
              {destination.category}
            </span>

            <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
              {destination.name}
            </h1>

            <p className="mt-3 text-lg text-white/90">
              {destination.province}, {destination.region}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              About {destination.name}
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              {destination.description}
            </p>

            {/* Highlights */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Top Highlights
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {destination.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        ✓
                      </div>

                      <p className="font-semibold text-slate-800">
                        {highlight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best For */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">Best For</h2>

              <div className="mt-4 flex flex-wrap gap-3">
                {destination.bestFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-bold text-slate-900">Plan Your Trip</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Let our AI create a personalized itinerary for your trip to{" "}
              {destination.name}.
            </p>

            <Link
              href={`/planner?destination=${encodeURIComponent(
                destination.name,
              )}`}
              className="mt-6 block rounded-xl bg-red-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-red-700"
            >
              Plan My Trip →
            </Link>

            <a
              href={destination.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View on Google Maps
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
