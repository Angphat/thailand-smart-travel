export default function Loading() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="h-56 animate-pulse bg-gradient-to-br from-moss/40 via-moss-dark/40 to-ink/40" />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-3xl bg-sand/40"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
