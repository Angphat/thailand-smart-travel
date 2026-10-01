import { db } from "@/lib/db";

export async function getAllFoods() {
  return db.food.findMany({ orderBy: { name: "asc" } });
}
