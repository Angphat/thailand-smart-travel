import Link from "next/link";
import { db } from "@/lib/db";
import { deleteFood } from "./actions";

export default async function AdminFoodsPage() {
  const foods = await db.food.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Foods</h1>
          <p className="mt-1 text-sm text-ink/50">{foods.length} total</p>
        </div>
        <Link
          href="/admin/foods/new"
          className="rounded-xl bg-moss px-4 py-2.5 text-sm font-semibold text-cream-light hover:bg-moss-dark"
        >
          + Add Food
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-cream-light shadow-sm ring-1 ring-sand">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-ink/50">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {foods.map((food) => (
              <tr key={food.id}>
                <td className="px-5 py-3 font-medium text-ink">{food.name}</td>
                <td className="px-5 py-3 text-ink/70">{food.category}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/foods/${food.id}/edit`}
                      className="font-medium text-moss hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteFood.bind(null, food.id)}>
                      <button
                        type="submit"
                        className="font-medium text-rust hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
