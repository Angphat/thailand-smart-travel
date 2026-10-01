"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseListField(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return value
    .toString()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createTip(formData: FormData) {
  await db.tip.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      icon: (formData.get("icon") as string) || null,
      tips: parseListField(formData.get("tips")),
      image: (formData.get("image") as string) || null,
    },
  });

  revalidatePath("/admin/tips");
  revalidatePath("/tips");
  redirect("/admin/tips");
}

export async function updateTip(id: string, formData: FormData) {
  await db.tip.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      icon: (formData.get("icon") as string) || null,
      tips: parseListField(formData.get("tips")),
      image: (formData.get("image") as string) || null,
    },
  });

  revalidatePath("/admin/tips");
  revalidatePath("/tips");
  redirect("/admin/tips");
}

export async function deleteTip(id: string) {
  await db.tip.delete({ where: { id } });

  revalidatePath("/admin/tips");
  revalidatePath("/tips");
}
