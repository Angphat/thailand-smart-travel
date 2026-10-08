"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Crown,
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

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(href);
  }

  return (
    <aside className="bg-ink text-cream-light lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-cream-light/10 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold">
          <Crown size={20} />
        </div>
        <div>
          <p className="font-heading text-base font-bold leading-tight">
            Control Center
          </p>
          <p className="text-xs text-cream-light/50">Thailand Smart Travel</p>
        </div>
      </div>

      {/* Navigation (แนวนอนเลื่อนได้บนมือถือ / แนวตั้งบนจอใหญ่) */}
      <nav className="flex gap-1 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-visible lg:py-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-cream-light/10 text-gold"
                  : "text-cream-light/70 hover:bg-cream-light/10 hover:text-cream-light"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
