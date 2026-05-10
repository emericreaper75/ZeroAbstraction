import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-400">
                Protected Admin Area
              </p>

              <h1 className="mt-3 font-serif text-4xl font-bold">
                ZeroAbstraction Dashboard
              </h1>

              <p className="mt-4 text-neutral-400">
                Authenticated as:
              </p>

              <p className="mt-1 font-mono text-sm text-neutral-200">
                {session.user.email}
              </p>
            </div>

            <form
              action={async () => {
                "use server";

                await signOut({
                  redirectTo: "/login",
                });
              }}
            >
              <button
                type="submit"
                className="rounded-lg border border-neutral-700 px-4 py-2 text-sm transition-colors hover:border-neutral-500 hover:bg-neutral-800"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}