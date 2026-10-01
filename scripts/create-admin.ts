import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../lib/password";

dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in .env.local");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@email.com";
  const password = "changeme123"; // เปลี่ยนรหัสผ่านนี้เองหลัง login ครั้งแรก

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });
    console.log(`Updated existing user ${email} to ADMIN`);
    return;
  }

  await prisma.user.create({
    data: {
      name: "Admin",
      email,
      password: await hashPassword(password),
      role: "ADMIN",
    },
  });

  console.log(`Created admin user: ${email} / ${password}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
