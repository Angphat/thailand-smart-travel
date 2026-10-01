import Link from "next/link";
import { db } from "@/lib/db";
import { deleteTip } from "./actions";

export default async function AdminTipsPage() {
  const tips = await db.tip.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Travel Tips</h1>
          <p className="mt-1 text-sm text-slate-500">{tips.length} total</p>
        </div>
        <Link
          href="/admin/tips/new"
          className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          + Add Tip
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Items</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tips.map((tip) => (
              <tr key={tip.id}>
                <td className="px-5 py-3 font-medium text-slate-900">
                  {tip.icon} {tip.title}
                </td>
                <td className="px-5 py-3 text-slate-600">{tip.category}</td>
                <td className="px-5 py-3 text-slate-600">
                  {tip.tips.length} items
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/tips/${tip.id}/edit`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteTip.bind(null, tip.id)}>
                      <button
                        type="submit"
                        className="font-medium text-red-600 hover:underline"
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
