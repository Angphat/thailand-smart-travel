export default function Loading() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="h-64 animate-pulse bg-gradient-to-br from-moss/40 via-moss-dark/40 to-ink/40" />

      <div className="mx-auto max-w-6xl space-y-4 px-6 py-12">
        <div className="h-8 w-1/3 animate-pulse rounded-xl bg-sand/50" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-sand/40" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-sand/40" />

        <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-3xl bg-sand/40"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
