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
      <h1 className="text-2xl font-bold text-slate-900">Edit Destination</h1>

      <form
        action={updateDestination.bind(null, id)}
        className="mt-6 max-w-xl space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">ID</label>
          <input
            value={d.id}
            disabled
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            name="name"
            defaultValue={d.name}
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
            defaultValue={d.province}
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
            defaultValue={d.region}
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
            defaultValue={d.category}
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
            defaultValue={d.description}
            required
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Image path
          </label>
          <input
            name="image"
            defaultValue={d.image}
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
            defaultValue={d.mapsUrl}
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
            defaultValue={d.bestFor.join(", ")}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Highlights (comma separated)
          </label>
          <input
            name="highlights"
            defaultValue={d.highlights.join(", ")}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
        >
          Update Destination
        </button>
      </form>
    </div>
  );
}
