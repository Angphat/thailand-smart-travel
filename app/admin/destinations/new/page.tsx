import { createDestination } from "../actions";

export default function NewDestinationPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Add Destination</h1>

      <form action={createDestination} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Province
          </label>
          <input
            name="province"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Region
          </label>
          <input
            name="region"
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
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Image path (e.g. /images/bangkok.jpg)
          </label>
          <input
            name="image"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Google Maps URL
          </label>
          <input
            name="mapsUrl"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Best For (comma separated)
          </label>
          <input
            name="bestFor"
            placeholder="Culture, Food, Shopping"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Highlights (comma separated)
          </label>
          <input
            name="highlights"
            placeholder="Grand Palace, Wat Arun"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
        >
          Save Destination
        </button>
      </form>
    </div>
  );
}
