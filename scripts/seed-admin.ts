import bcrypt from "bcrypt";

import { prisma } from "@/lib/db/prisma";

async function main() {
  const email = "youremail@gmail.com";
  const password = "Quantum!Signal#Orbit2026";

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