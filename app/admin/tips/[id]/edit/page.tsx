import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateTip } from "../../actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditTipPage({ params }: Props) {
  const { id } = await params;
  const tip = await db.tip.findUnique({ where: { id } });

  if (!tip) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Edit Travel Tip</h1>

      <form
        action={updateTip.bind(null, id)}
        className="mt-6 max-w-xl space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Icon (emoji)
          </label>
          <input
            name="icon"
            defaultValue={tip.icon ?? ""}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            name="title"
            defaultValue={tip.title}
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
            defaultValue={tip.category}
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
            defaultValue={tip.description}
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
            defaultValue={tip.tips.join(", ")}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Image path (optional)
          </label>
          <input
            name="image"
            defaultValue={tip.image ?? ""}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
        >
          Update Tip
        </button>
      </form>
    </div>
  );
}
