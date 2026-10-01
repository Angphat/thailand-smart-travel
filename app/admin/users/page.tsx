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
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="mt-1 text-sm text-slate-500">{users.length} total</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => {
              const isSelf = u.id === currentUser?.userId;

              return (
                <tr key={u.id}>
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {u.name}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{u.email}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        u.role === "ADMIN"
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">
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
                          className="font-medium text-blue-600 hover:underline disabled:cursor-not-allowed disabled:text-slate-300"
                        >
                          Make {u.role === "ADMIN" ? "USER" : "ADMIN"}
                        </button>
                      </form>

                      <form action={deleteUser.bind(null, u.id)}>
                        <button
                          type="submit"
                          disabled={isSelf}
                          className="font-medium text-red-600 hover:underline disabled:cursor-not-allowed disabled:text-slate-300"
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
