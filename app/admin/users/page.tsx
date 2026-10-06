import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateUserRole, deleteUser } from "./actions";

export default async function AdminUsersPage() {
  const currentUser = await getCurrentUser();

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-ink">Users</h1>
        <p className="mt-1 text-sm text-ink/50">{users.length} total</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-cream-light shadow-sm ring-1 ring-sand">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-ink/50">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {users.map((u) => {
              const isSelf = u.id === currentUser?.userId;

              return (
                <tr key={u.id}>
                  <td className="px-5 py-3 font-medium text-ink">{u.name}</td>
                  <td className="px-5 py-3 text-ink/70">{u.email}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        u.role === "ADMIN"
                          ? "bg-rust/10 text-rust"
                          : "bg-sand/50 text-ink/60"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink/50">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <form
                        action={updateUserRole.bind(
                          null,
                          u.id,
                          u.role === "ADMIN" ? "USER" : "ADMIN",
                        )}
                      >
                        <button
                          type="submit"
                          disabled={isSelf}
                          className="font-medium text-moss hover:underline disabled:cursor-not-allowed disabled:text-ink/20"
                        >
                          Make {u.role === "ADMIN" ? "USER" : "ADMIN"}
                        </button>
                      </form>

                      <form action={deleteUser.bind(null, u.id)}>
                        <button
                          type="submit"
                          disabled={isSelf}
                          className="font-medium text-rust hover:underline disabled:cursor-not-allowed disabled:text-ink/20"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
