import Link from "next/link";
import AdminNav from "./admin-nav";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Projects",
    href: "/admin/projects",
  },
  {
    label: "Posts",
    href: "/admin/posts",
  },
  {
    label: "Messages",
    href: "/admin/messages",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-12">
        <h1 className="text-xl font-semibold leading-tight text-white">         
             ZeroAbstraction
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Admin Dashboard
        </p>
      </div>

      <AdminNav />

      <div className="mt-10 border-t border-zinc-800 pt-6">
        <form
          action={async () => {
            "use server";

            const { signOut } = await import("@/auth");

            await signOut({
              redirectTo: "/login",
            });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-700"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}