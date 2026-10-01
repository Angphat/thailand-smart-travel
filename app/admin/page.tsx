import { db } from "@/lib/db";
import { MapPin, UtensilsCrossed, Lightbulb, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const [destinationCount, foodCount, tipCount, userCount] = await Promise.all([
    db.destination.count(),
    db.food.count(),
    db.tip.count(),
    db.user.count(),
  ]);

  const stats = [
    { label: "Destinations", value: destinationCount, icon: MapPin },
    { label: "Foods", value: foodCount, icon: UtensilsCrossed },
    { label: "Tips", value: tipCount, icon: Lightbulb },
    { label: "Users", value: userCount, icon: Users },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Overview of your website data
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon size={20} />
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
