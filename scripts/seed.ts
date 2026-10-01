import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import destinations from "../data/destinations.json";
import foods from "../data/foods.json";
import tips from "../data/tips.json";

dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in .env.local");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seed...");

  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.food.deleteMany();
  await prisma.tip.deleteMany();

  // =========================
  // DESTINATIONS
  // =========================
  for (const d of destinations) {
    await prisma.destination.create({
      data: {
        name: d.name,
        province: d.province ?? "",
        region: d.region ?? "",
        category: d.category ?? "",
        description: d.description ?? "",
        image: d.image ?? "",
        mapsUrl: d.mapsUrl ?? "",
        bestFor: Array.isArray(d.bestFor) ? d.bestFor : [],
        highlights: Array.isArray(d.highlights) ? d.highlights : [],
      },
    });
  }
  console.log(`Destinations inserted: ${destinations.length}`);

  // =========================
  // FOODS
  // =========================
  for (const food of foods) {
    await prisma.food.create({
      data: {
        name: food.name,
        description: food.description ?? "",
        image: food.image ?? "",
        category: food.category ?? "",
      },
    });
  }
  console.log(`Foods inserted: ${foods.length}`);

  // =========================
  // TIPS
  // =========================
  for (const tip of tips as any[]) {
    await prisma.tip.create({
      data: {
        title: tip.title,
        description: tip.description ?? "",
        category: tip.category ?? "Travel Tips",
        icon: tip.icon ?? null,
        tips: Array.isArray(tip.tips) ? tip.tips : [],
        image: tip.image ?? null,
      },
    });
  }
  console.log(`Tips inserted: ${tips.length}`);

  console.log("Database seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
