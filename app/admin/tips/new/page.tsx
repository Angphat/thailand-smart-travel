import { createTip } from "../actions";

export default function NewTipPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Add Travel Tip</h1>

      <form action={createTip} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Icon (emoji, e.g. 💰)
          </label>
          <input
            name="icon"
            placeholder="💰"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            name="title"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Category
          </label>
          <input
            name="category"
            required
            placeholder="Money & Payments"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Checklist items (comma separated)
          </label>
          <textarea
            name="tips"
            rows={3}
            placeholder="Carry small cash, Cards accepted in cities, Notify your bank before traveling"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Image path (optional)
          </label>
          <input
            name="image"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
        >
          Save Tip
        </button>
      </form>
    </div>
  );
}
