import type { UserRole } from "@prisma/client";

const ROLE_ORDER: UserRole[] = ["AUTHOR", "EDITOR", "ADMIN"];

export function hasRole(input: { userRole: UserRole; required: UserRole }) {
  return ROLE_ORDER.indexOf(input.userRole) >= ROLE_ORDER.indexOf(input.required);
}

