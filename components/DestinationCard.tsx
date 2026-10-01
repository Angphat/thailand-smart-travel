import Link from "next/link";

type Destination = {
  id: string;
  name: string;
  province: string;
  region: string;
  category: string;
  image: string;
  description: string;
  highlights: string[];
  bestFor: string[];
  mapsUrl: string;
};

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl bg-cream-light shadow-sm ring-1 ring-sand transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        {/* Image Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-cream-light/90 px-3 py-1.5 text-xs font-semibold text-rust shadow-sm">
            {destination.category}
          </span>
        </div>

        {/* Destination Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-cream-light">
            {destination.name}
          </h3>

          <p className="mt-1 text-sm text-cream-light/90">
            {destination.province}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="line-clamp-3 text-sm leading-6 text-ink/70">
          {destination.description}
        </p>

        {/* Buttons */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {/* View Details */}
          <Link
            href={`/destinations/${destination.id}`}
            className="rounded-xl border border-sand px-4 py-3 text-center text-sm font-semibold text-ink/70 transition hover:border-rust/40 hover:bg-rust/10 hover:text-rust"
          >
            View Details
          </Link>

          {/* Plan Trip */}
          <Link
            href={`/planner?destination=${encodeURIComponent(
              destination.name,
            )}`}
            className="rounded-xl bg-moss px-4 py-3 text-center text-sm font-semibold text-cream-light transition hover:bg-moss-dark"
          >
            Plan Trip →
          </Link>
        </div>
      </div>
    </article>
  );
}
