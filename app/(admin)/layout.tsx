import { requireRole } from "@/lib/authz/require-role";
import { auth } from "@/auth";
import AdminShell from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("EDITOR");

  const session = await auth();
  const userEmail = session?.user?.email ?? null;

  return <AdminShell userEmail={userEmail}>{children}</AdminShell>;
}