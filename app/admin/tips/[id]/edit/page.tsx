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
      <h1 className="font-heading text-2xl font-bold text-ink">
        Edit Travel Tip
      </h1>

      <form
        action={updateTip.bind(null, id)}
        className="mt-6 max-w-xl space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-ink/80">
            Icon (emoji)
          </label>
          <input
            name="icon"
            defaultValue={tip.icon ?? ""}
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">Title</label>
          <input
            name="title"
            defaultValue={tip.title}
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
            defaultValue={tip.category}
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
            defaultValue={tip.description}
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
            defaultValue={tip.tips.join(", ")}
            rows={3}
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/80">
            Image path (optional)
          </label>
          <input
            name="image"
            defaultValue={tip.image ?? ""}
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-moss px-5 py-2.5 font-semibold text-cream-light hover:bg-moss-dark"
        >
          Update Tip
        </button>
      </form>
    </div>
  );
}
