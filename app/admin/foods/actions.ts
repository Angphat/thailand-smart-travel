"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFood(formData: FormData) {
  await db.food.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      category: formData.get("category") as string,
    },
  });

  revalidatePath("/admin/foods");
  revalidatePath("/explore");
  redirect("/admin/foods");
}

export async function updateFood(id: string, formData: FormData) {
  await db.food.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      category: formData.get("category") as string,
    },
  });

  revalidatePath("/admin/foods");
  revalidatePath("/explore");
  redirect("/admin/foods");
}

export async function deleteFood(id: string) {
  await db.food.delete({ where: { id } });

  revalidatePath("/admin/foods");
  revalidatePath("/explore");
}
