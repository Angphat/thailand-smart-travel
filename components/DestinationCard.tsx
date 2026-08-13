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
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        {/* Image Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-red-700 shadow-sm">
            {destination.category}
          </span>
        </div>

        {/* Destination Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white">{destination.name}</h3>

          <p className="mt-1 text-sm text-white/90">{destination.province}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
          {destination.description}
        </p>

        {/* Buttons */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {/* View Details */}
          <Link
            href={`/destinations/${destination.id}`}
            className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            View Details
          </Link>

          {/* Plan Trip */}
          <Link
            href={`/planner?destination=${encodeURIComponent(
              destination.name,
            )}`}
            className="rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Plan Trip →
          </Link>
        </div>
      </div>
    </article>
  );
}
