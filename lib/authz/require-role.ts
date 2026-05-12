import "server-only";

import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { hasRole } from "@/lib/authz/roles";

export async function requireRole(required: UserRole) {
  const session = await auth();
  const role = (session?.user as { role?: UserRole } | undefined)?.role;

  if (!session?.user) redirect("/login");
  if (!role || !hasRole({ userRole: role, required })) redirect("/login");

  return { session, role };
}

