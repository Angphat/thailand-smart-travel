export default function Loading() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="h-[280px] animate-pulse bg-gradient-to-br from-moss/40 via-moss-dark/40 to-ink/40" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="h-12 flex-1 animate-pulse rounded-xl bg-sand/50" />
          <div className="h-12 w-72 animate-pulse rounded-xl bg-sand/50" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-3xl bg-sand/40"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
