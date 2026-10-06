import Link from "next/link";
import { db } from "@/lib/db";
import { deleteTip } from "./actions";

export default async function AdminTipsPage() {
  const tips = await db.tip.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Travel Tips
          </h1>
          <p className="mt-1 text-sm text-ink/50">{tips.length} total</p>
        </div>
        <Link
          href="/admin/tips/new"
          className="rounded-xl bg-moss px-4 py-2.5 text-sm font-semibold text-cream-light hover:bg-moss-dark"
        >
          + Add Tip
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-cream-light shadow-sm ring-1 ring-sand">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-ink/50">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Items</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {tips.map((tip) => (
              <tr key={tip.id}>
                <td className="px-5 py-3 font-medium text-ink">
                  {tip.icon} {tip.title}
                </td>
                <td className="px-5 py-3 text-ink/70">{tip.category}</td>
                <td className="px-5 py-3 text-ink/70">
                  {tip.tips.length} items
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/tips/${tip.id}/edit`}
                      className="font-medium text-moss hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteTip.bind(null, tip.id)}>
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
