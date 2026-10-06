import { createDestination } from "../actions";

export default function NewDestinationPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">
        Add Destination
      </h1>

      <form action={createDestination} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink/80">Name</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Province
          </label>
          <input
            name="province"
            required
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Region
          </label>
          <input
            name="region"
            required
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Category
          </label>
          <input
            name="category"
            required
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Image path (e.g. /images/bangkok.jpg)
          </label>
          <input
            name="image"
            required
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Google Maps URL
          </label>
          <input
            name="mapsUrl"
            required
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Best For (comma separated)
          </label>
          <input
            name="bestFor"
            placeholder="Culture, Food, Shopping"
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Highlights (comma separated)
          </label>
          <input
            name="highlights"
            placeholder="Grand Palace, Wat Arun"
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-moss px-5 py-2.5 font-semibold text-cream-light hover:bg-moss-dark"
        >
          Save Destination
        </button>
      </form>
    </div>
  );
}
