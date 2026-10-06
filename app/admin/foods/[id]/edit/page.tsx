import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateFood } from "../../actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditFoodPage({ params }: Props) {
  const { id } = await params;
  const food = await db.food.findUnique({ where: { id } });

  if (!food) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">Edit Food</h1>

      <form
        action={updateFood.bind(null, id)}
        className="mt-6 max-w-xl space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-ink/80">Name</label>
          <input
            name="name"
            defaultValue={food.name}
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
            defaultValue={food.description}
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
            defaultValue={food.image}
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
            defaultValue={food.category}
            required
            className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-moss px-5 py-2.5 font-semibold text-cream-light hover:bg-moss-dark"
        >
          Update Food
        </button>
      </form>
    </div>
  );
}
