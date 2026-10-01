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

export async function createDestination(formData: FormData) {
  await db.destination.create({
    data: {
      name: formData.get("name") as string,
      province: formData.get("province") as string,
      region: formData.get("region") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      mapsUrl: formData.get("mapsUrl") as string,
      bestFor: parseListField(formData.get("bestFor")),
      highlights: parseListField(formData.get("highlights")),
    },
  });

  revalidatePath("/admin/destinations");
  revalidatePath("/explore");
  redirect("/admin/destinations");
}

export async function updateDestination(id: string, formData: FormData) {
  await db.destination.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      province: formData.get("province") as string,
      region: formData.get("region") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      mapsUrl: formData.get("mapsUrl") as string,
      bestFor: parseListField(formData.get("bestFor")),
      highlights: parseListField(formData.get("highlights")),
    },
  });

  revalidatePath("/admin/destinations");
  revalidatePath("/explore");
  revalidatePath(`/destinations/${id}`);
  redirect("/admin/destinations");
}

export async function deleteDestination(id: string) {
  await db.destination.delete({ where: { id } });

  revalidatePath("/admin/destinations");
  revalidatePath("/explore");
}
