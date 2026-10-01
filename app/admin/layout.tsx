import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  LayoutDashboard,
  MapPin,
  UtensilsCrossed,
  Lightbulb,
  Users,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Destinations", href: "/admin/destinations", icon: MapPin },
  { name: "Foods", href: "/admin/foods", icon: UtensilsCrossed },
  { name: "Tips", href: "/admin/tips", icon: Lightbulb },
  { name: "Users", href: "/admin/users", icon: Users },
];

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
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 shrink-0 bg-slate-900 px-4 py-6 text-white">
        <p className="mb-8 px-2 text-lg font-bold">Admin Panel</p>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="mt-8 block px-3 text-sm text-slate-400 hover:text-white"
        >
          ← Back to website
        </Link>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
