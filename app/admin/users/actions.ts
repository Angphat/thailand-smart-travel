"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUserRole(id: string, role: string) {
  await db.user.update({
    where: { id },
    data: { role },
  });

  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } });

  revalidatePath("/admin/users");
}
