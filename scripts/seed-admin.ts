import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variables.\nSet these in your environment or create a .env file (see .env.example)."
    );
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: {
      email,
    },

    update: {
      passwordHash,
      role: "EDITOR",
    },

    create: {
      email,
      passwordHash,
      name: "Rec",
      role: "EDITOR",
    },
  });

  console.log("Admin user synced successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });