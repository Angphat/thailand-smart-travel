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
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
      {/* Amount */}
      <div>
        <label className="text-sm font-semibold text-slate-700">Amount</label>

        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-semibold outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          placeholder="Enter amount"
        />
      </div>

      {/* Currency Selection */}
      <div className="mt-6 grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* From */}
        <div>
          <label className="text-sm font-semibold text-slate-700">From</label>

          <select
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setResult(null);
              setRate(null);
            }}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
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
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-lg transition hover:border-red-400 hover:bg-red-50"
          aria-label="Swap currencies"
        >
          ⇄
        </button>

        {/* To */}
        <div>
          <label className="text-sm font-semibold text-slate-700">To</label>

          <select
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setResult(null);
              setRate(null);
            }}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
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
        className="mt-6 w-full rounded-xl bg-red-600 px-5 py-3.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Converting..." : "Convert Currency"}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Result */}
      {result !== null && rate !== null && (
        <div className="mt-6 rounded-2xl bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-600">
            Conversion Result
          </p>

          <p className="mt-2 text-3xl font-bold text-red-700">
            {result.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            {to}
          </p>

          <p className="mt-3 text-sm text-slate-600">
            {amount} {from} ={" "}
            {result.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            {to}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            1 {from} ≈ {rate.toFixed(4)} {to}
          </p>
        </div>
      )}
    </div>
  );
}
