import { db } from "@/lib/db";

export async function getAllTips() {
  return db.tip.findMany({ orderBy: { createdAt: "desc" } });
}
