export default function Loading() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="h-[420px] animate-pulse bg-gradient-to-br from-moss/40 via-moss-dark/40 to-ink/40" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_350px]">
        <div className="space-y-4">
          <div className="h-9 w-2/3 animate-pulse rounded-xl bg-sand/50" />
          <div className="h-4 w-full animate-pulse rounded bg-sand/40" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-sand/40" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-sand/40" />

          <div className="grid gap-4 pt-8 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-2xl bg-sand/40"
              />
            ))}
          </div>
        </div>

        <div className="h-64 animate-pulse rounded-3xl bg-sand/40" />
      </div>
    </main>
  );
}
