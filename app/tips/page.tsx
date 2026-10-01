import { getAllTips } from "@/lib/tips";

export default async function TravelTipsPage() {
  const tips = await getAllTips();

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-moss via-moss-dark to-ink">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Travel Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold text-cream-light md:text-5xl">
            Thailand Travel Tips
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-cream-light/90">
            Helpful information to make your trip to Thailand easier, safer, and
            more enjoyable.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
            <article
              key={tip.id}
              className="rounded-3xl bg-cream-light p-6 shadow-sm ring-1 ring-sand transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rust/10 text-3xl">
                {tip.icon}
              </div>

              {/* Title */}
              <h2 className="mt-5 text-xl font-bold text-ink">{tip.title}</h2>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-ink/70">
                {tip.description}
              </p>

              {/* List */}
              <ul className="mt-5 space-y-3">
                {tip.tips.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-ink/80"
                  >
                    <span className="mt-1 text-moss">✓</span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
