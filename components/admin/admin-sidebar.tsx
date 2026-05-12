import AdminNav from "./admin-nav";

export default function AdminSidebar() {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-zinc-800 bg-zinc-900/95 p-5 backdrop-blur-md lg:w-64">
      {/* Branding */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold leading-tight text-white">
          ZeroAbstraction
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1">
        <AdminNav />
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-zinc-800 pt-6">
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
            className="w-full rounded-xl bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}