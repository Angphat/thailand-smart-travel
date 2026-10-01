"use client";

import { useState } from "react";

const currencies = [
  { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("THB");

  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function convertCurrency() {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      setResult(null);
      return;
    }

    if (from === to) {
      setRate(1);
      setResult(numericAmount);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch(`/api/currency?from=${from}&to=${to}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to convert currency.");
      }

      setRate(data.rate);
      setResult(numericAmount * data.rate);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  function swapCurrencies() {
    setFrom(to);
    setTo(from);
    setResult(null);
    setRate(null);
    setError("");
  }

  return (
    <div className="rounded-3xl bg-cream-light p-6 shadow-sm ring-1 ring-sand md:p-8">
      {/* Amount */}
      <div>
        <label className="text-sm font-semibold text-ink/80">Amount</label>

        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 w-full rounded-xl border border-sand bg-cream px-4 py-3 text-lg font-semibold outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/15"
          placeholder="Enter amount"
        />
      </div>

      {/* Currency Selection */}
      <div className="mt-6 grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* From */}
        <div>
          <label className="text-sm font-semibold text-ink/80">From</label>

          <select
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setResult(null);
              setRate(null);
            }}
            className="mt-2 w-full rounded-xl border border-sand bg-cream px-4 py-3 outline-none focus:border-moss focus:ring-2 focus:ring-moss/15"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} — {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap */}
        <button
          type="button"
          onClick={swapCurrencies}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-sand text-lg transition hover:border-moss hover:bg-moss/10"
          aria-label="Swap currencies"
        >
          ⇄
        </button>

        {/* To */}
        <div>
          <label className="text-sm font-semibold text-ink/80">To</label>

          <select
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setResult(null);
              setRate(null);
            }}
            className="mt-2 w-full rounded-xl border border-sand bg-cream px-4 py-3 outline-none focus:border-moss focus:ring-2 focus:ring-moss/15"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} — {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Convert Button */}
      <button
        type="button"
        onClick={convertCurrency}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-moss px-5 py-3.5 font-semibold text-cream-light transition hover:bg-moss-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Converting..." : "Convert Currency"}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-rust/30 bg-rust/10 p-4 text-sm text-rust">
          {error}
        </div>
      )}

      {/* Result */}
      {result !== null && rate !== null && (
        <div className="mt-6 rounded-2xl bg-moss/10 p-6 text-center">
          <p className="text-sm font-medium text-ink/70">Conversion Result</p>

          <p className="mt-2 text-3xl font-bold text-moss">
            {result.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            {to}
          </p>

          <p className="mt-3 text-sm text-ink/70">
            {amount} {from} ={" "}
            {result.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            {to}
          </p>

          <p className="mt-1 text-xs text-ink/50">
            1 {from} ≈ {rate.toFixed(4)} {to}
          </p>
        </div>
      )}
    </div>
  );
}
