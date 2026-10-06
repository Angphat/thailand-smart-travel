import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import ProfileHistoryList from "./ProfileHistoryList";

export default async function ProfilePage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login?redirect=%2Fprofile");
  }

  const [user, history] = await Promise.all([
    db.user.findUnique({
      where: { id: session.userId },
      select: { name: true, email: true, role: true, createdAt: true },
    }),
    db.planHistory.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-moss via-moss-dark to-ink px-6 py-16 text-cream-light">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{user.name}</h1>

          <p className="mt-2 text-cream-light/80">{user.email}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-cream-light/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              {user.role === "ADMIN" ? "Administrator" : "Member"}
            </span>
            <span className="rounded-full bg-cream-light/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-ink">My Travel Plans</h2>
          <p className="mt-1 text-sm text-ink/50">
            {history.length} itinerar{history.length === 1 ? "y" : "ies"}{" "}
            generated
          </p>
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl bg-cream-light p-12 text-center shadow-sm ring-1 ring-sand">
            <p className="text-lg font-semibold text-ink">
              No trips planned yet
            </p>
            <p className="mt-2 text-sm text-ink/60">
              Head to the AI Travel Planner to create your first itinerary.
            </p>
            <a
              href="/planner"
              className="mt-5 inline-block rounded-xl bg-moss px-5 py-2.5 text-sm font-semibold text-cream-light transition hover:bg-moss-dark"
            >
              Start Planning →
            </a>
          </div>
        ) : (
          <ProfileHistoryList
            history={history.map((h) => ({
              id: h.id,
              destination: h.destination,
              days: h.days,
              budget: h.budget,
              interest: h.interest,
              createdAt: h.createdAt.toISOString(),
              itinerary: h.itinerary as any,
            }))}
          />
        )}
      </section>
    </main>
  );
}
