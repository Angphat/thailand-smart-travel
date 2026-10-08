import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-cream lg:flex">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopBar email={user.email} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
