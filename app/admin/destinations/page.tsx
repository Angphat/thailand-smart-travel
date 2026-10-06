import Link from "next/link";
import { db } from "@/lib/db";
import { deleteDestination } from "./actions";

export default async function AdminDestinationsPage() {
  const destinations = await db.destination.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            Destinations
          </h1>
          <p className="mt-1 text-sm text-ink/50">
            {destinations.length} total
          </p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="rounded-xl bg-moss px-4 py-2.5 text-sm font-semibold text-cream-light hover:bg-moss-dark"
        >
          + Add Destination
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-cream-light shadow-sm ring-1 ring-sand">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-ink/50">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Province</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {destinations.map((d) => (
              <tr key={d.id}>
                <td className="px-5 py-3 font-medium text-ink">{d.name}</td>
                <td className="px-5 py-3 text-ink/70">{d.province}</td>
                <td className="px-5 py-3 text-ink/70">{d.category}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/destinations/${d.id}/edit`}
                      className="font-medium text-moss hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteDestination.bind(null, d.id)}>
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
