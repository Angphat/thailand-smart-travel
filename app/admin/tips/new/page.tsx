import { createTip } from "../actions";

export default function NewTipPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">
        Add Travel Tip
      </h1>

      <form action={createTip} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink/80">
            Icon (emoji, e.g. 💰)
          </label>
          <input
            name="icon"
            placeholder="💰"
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">Title</label>
          <input
            name="title"
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
            placeholder="Money & Payments"
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
            rows={3}
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Checklist items (comma separated)
          </label>
          <textarea
            name="tips"
            rows={3}
            placeholder="Carry small cash, Cards accepted in cities, Notify your bank before traveling"
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Image path (optional)
          </label>
          <input
            name="image"
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-moss px-5 py-2.5 font-semibold text-cream-light hover:bg-moss-dark"
        >
          Save Tip
        </button>
      </form>
    </div>
  );
}
