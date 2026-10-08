export default function Loading() {
  return (
    <div>
      <div className="h-8 w-48 animate-pulse rounded-xl bg-sand/60" />
      <div className="mt-2 h-4 w-24 animate-pulse rounded bg-sand/40" />

      <div className="mt-8 space-y-2 rounded-2xl bg-cream-light p-4 ring-1 ring-sand">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-xl bg-sand/40" />
        ))}
      </div>
    </div>
  );
}
