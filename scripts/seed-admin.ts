import bcrypt from "bcrypt";

import { prisma } from "@/lib/db/prisma";

async function main() {
  const email = "youremail@gmail.com";
  const password = "Quantum!Signal#Orbit2026";

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    console.log("Admin user already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: "Rec",
    },
  });

  console.log("Admin user created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });