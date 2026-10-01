import CurrencyConverter from "@/components/CurrencyConverter";

export default function CurrencyPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-moss via-moss-dark to-ink">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Travel Essential
          </p>

          <h1 className="mt-3 text-4xl font-bold text-cream-light md:text-5xl">
            Currency Converter
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-cream-light/90">
            Quickly convert your currency to Thai Baht and compare exchange
            rates before your trip to Thailand.
          </p>
        </div>
      </section>

      {/* Converter */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <CurrencyConverter />

        <p className="mt-5 text-center text-xs leading-5 text-ink/50">
          Exchange rates are provided by a third-party exchange rate service and
          may change over time.
        </p>
      </section>
    </main>
  );
}
