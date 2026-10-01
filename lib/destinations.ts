import { db } from "@/lib/db";

export async function getAllDestinations() {
  return db.destination.findMany({ orderBy: { name: "asc" } });
}

export async function getDestinationById(id: string) {
  return db.destination.findUnique({ where: { id } });
}

export async function getDestinationsByCategory(category: string) {
  return db.destination.findMany({
    where: { category },
    orderBy: { name: "asc" },
  });
}
