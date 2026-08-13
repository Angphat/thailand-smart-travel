import CurrencyConverter from "@/components/CurrencyConverter";

export default function CurrencyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-amber-500">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Travel Essential
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Currency Converter
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/90">
            Quickly convert your currency to Thai Baht and compare exchange
            rates before your trip to Thailand.
          </p>
        </div>
      </section>

      {/* Converter */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <CurrencyConverter />

        <p className="mt-5 text-center text-xs leading-5 text-slate-500">
          Exchange rates are provided by a third-party exchange rate service and
          may change over time.
        </p>
      </section>
    </main>
  );
}
