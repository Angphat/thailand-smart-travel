export default function Loading() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="h-56 animate-pulse bg-gradient-to-br from-moss/40 via-moss-dark/40 to-ink/40" />

      <div className="mx-auto max-w-5xl space-y-4 px-6 py-12">
        <div className="h-7 w-48 animate-pulse rounded-xl bg-sand/50" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-sand/40" />
        ))}
      </div>
    </main>
  );
}
