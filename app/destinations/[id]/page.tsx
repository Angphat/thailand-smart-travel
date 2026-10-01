import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestinationById } from "@/lib/destinations";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DestinationDetailPage({ params }: Props) {
  const { id } = await params;

  const destination = await getDestinationById(id);

  if (!destination) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Image */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-ink/50" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12">
            <span className="inline-block rounded-full bg-cream-light/90 px-4 py-2 text-sm font-semibold text-rust">
              {destination.category}
            </span>

            <h1 className="mt-4 text-4xl font-bold text-cream-light md:text-6xl">
              {destination.name}
            </h1>

            <p className="mt-3 text-lg text-cream-light/90">
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
            <h2 className="text-3xl font-bold text-ink">
              About {destination.name}
            </h2>

            <p className="mt-4 text-lg leading-8 text-ink/70">
              {destination.description}
            </p>

            {/* Highlights */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-ink">Top Highlights</h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {destination.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl bg-cream-light p-5 shadow-sm ring-1 ring-sand"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss/10 text-moss">
                        ✓
                      </div>

                      <p className="font-semibold text-ink/90">{highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best For */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-ink">Best For</h2>

              <div className="mt-4 flex flex-wrap gap-3">
                {destination.bestFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-rust/10 px-4 py-2 text-sm font-semibold text-rust"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-3xl bg-cream-light p-6 shadow-sm ring-1 ring-sand">
            <h3 className="text-xl font-bold text-ink">Plan Your Trip</h3>

            <p className="mt-2 text-sm leading-6 text-ink/70">
              Let our AI create a personalized itinerary for your trip to{" "}
              {destination.name}.
            </p>

            <Link
              href={`/planner?destination=${encodeURIComponent(
                destination.name,
              )}`}
              className="mt-6 block rounded-xl bg-moss px-5 py-3 text-center font-semibold text-cream-light transition hover:bg-moss-dark"
            >
              Plan My Trip →
            </Link>

            <a
              href={destination.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block rounded-xl border border-sand px-5 py-3 text-center font-semibold text-ink/70 transition hover:bg-cream"
            >
              View on Google Maps
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
