import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateDestination } from "../../actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditDestinationPage({ params }: Props) {
  const { id } = await params;
  const d = await db.destination.findUnique({ where: { id } });

  if (!d) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">
        Edit Destination
      </h1>

      <form
        action={updateDestination.bind(null, id)}
        className="mt-6 max-w-xl space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-ink/80">Name</label>
          <input
            name="name"
            defaultValue={d.name}
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
            defaultValue={d.province}
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
            defaultValue={d.region}
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
            defaultValue={d.category}
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
            defaultValue={d.description}
            required
            rows={4}
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Image path
          </label>
          <input
            name="image"
            defaultValue={d.image}
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
            defaultValue={d.mapsUrl}
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
            defaultValue={d.bestFor.join(", ")}
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Highlights (comma separated)
          </label>
          <input
            name="highlights"
            defaultValue={d.highlights.join(", ")}
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-moss px-5 py-2.5 font-semibold text-cream-light hover:bg-moss-dark"
        >
          Update Destination
        </button>
      </form>
    </div>
  );
}
