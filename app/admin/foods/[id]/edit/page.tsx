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
      <h1 className="text-2xl font-bold text-slate-900">Edit Food</h1>

      <form
        action={updateFood.bind(null, id)}
        className="mt-6 max-w-xl space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            name="name"
            defaultValue={food.name}
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
            defaultValue={food.description}
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
            defaultValue={food.image}
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
            defaultValue={food.category}
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
        >
          Update Food
        </button>
      </form>
    </div>
  );
}
