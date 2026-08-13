"use client";

import { useState } from "react";
import { ArrowDownUp, Copy, Sparkles, Trash2 } from "lucide-react";

const languages = [
  { code: "English", label: "English", flag: "🇬🇧" },
  { code: "Malay", label: "Malay", flag: "🇲🇾" },
  { code: "Indonesian", label: "Indonesian", flag: "🇮🇩" },
  { code: "Chinese", label: "Chinese", flag: "🇨🇳" },
  { code: "Japanese", label: "Japanese", flag: "🇯🇵" },
  { code: "Korean", label: "Korean", flag: "🇰🇷" },
  { code: "Thai", label: "Thai", flag: "🇹🇭" },
];

const quickPhrases = [
  "Where is the hotel?",
  "How much does this cost?",
  "Where is the toilet?",
  "I need help.",
];

export default function TranslatorPage() {
  const [fromLanguage, setFromLanguage] = useState("English");
  const [toLanguage, setToLanguage] = useState("Thai");

  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError("Please enter some text to translate.");
      return;
    }

    setLoading(true);
    setError("");
    setTranslation("");

    try {
      const response = await fetch("/api/translator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          fromLanguage,
          toLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Translation failed.");
      }

      setTranslation(data.translation);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    if (fromLanguage === toLanguage) {
      return;
    }

    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);

    setTranslation("");
  };

  const handleClear = () => {
    setText("");
    setTranslation("");
    setError("");
  };

  const handleCopy = async () => {
    if (!translation) return;

    try {
      await navigator.clipboard.writeText(translation);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleQuickPhrase = (phrase: string) => {
    setText(phrase);
    setError("");
    setTranslation("");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-amber-500 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-amber-100">
            <Sparkles size={16} />
            AI-Powered Translation
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Communicate with confidence in Thailand
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Translate useful travel phrases between multiple languages using AI.
          </p>
        </div>
      </section>

      {/* Translator */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            {/* Language Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* From */}
              <div className="flex-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  From
                </label>

                <select
                  value={fromLanguage}
                  onChange={(e) => setFromLanguage(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.flag} {language.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap */}
              <button
                type="button"
                onClick={handleSwapLanguages}
                className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                title="Swap languages"
              >
                <ArrowDownUp size={18} />
              </button>

              {/* To */}
              <div className="flex-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  To
                </label>

                <select
                  value={toLanguage}
                  onChange={(e) => setToLanguage(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.flag} {language.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Translation Boxes */}
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {/* Input */}
              <div className="rounded-3xl border border-red-100 bg-red-50/50 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">
                    Your text
                  </p>

                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={!text && !translation}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Trash2 size={14} />
                    Clear
                  </button>
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 500))}
                  placeholder="Type your message here..."
                  rows={8}
                  className="mt-4 w-full resize-none bg-transparent text-base leading-7 text-slate-800 outline-none placeholder:text-slate-400"
                />

                <div className="mt-3 text-right text-xs text-slate-400">
                  {text.length} / 500
                </div>
              </div>

              {/* Output */}
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">
                    Translation
                  </p>

                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!translation}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                </div>

                <div className="mt-4 min-h-[200px]">
                  {loading ? (
                    <div className="flex h-[200px] items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />

                        <p className="mt-4 text-sm text-slate-500">
                          AI is translating...
                        </p>
                      </div>
                    </div>
                  ) : translation ? (
                    <p className="whitespace-pre-wrap text-lg leading-8 text-slate-900">
                      {translation}
                    </p>
                  ) : (
                    <div className="flex h-[200px] items-center justify-center text-center">
                      <div>
                        <Sparkles className="mx-auto text-red-300" size={30} />

                        <p className="mt-3 text-sm text-slate-400">
                          Your translation will appear here.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Translate Button */}
            <button
              type="button"
              onClick={handleTranslate}
              disabled={loading || !text.trim()}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Sparkles size={18} />

              {loading ? "Translating..." : "Translate"}
            </button>
          </div>

          {/* Quick Phrases */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-slate-900">
              Quick Travel Phrases
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Click a phrase to translate it quickly.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickPhrases.map((phrase) => (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => handleQuickPhrase(phrase)}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:border-red-300 hover:bg-red-50"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
