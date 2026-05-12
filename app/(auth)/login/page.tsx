import { signIn } from "@/auth";

export default async function LoginPage() {

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-2xl">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-400">
            Admin Access
          </p>

          <h1 className="mt-3 font-serif text-3xl font-bold text-neutral-100">
            Sign In
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Authenticate to access the ZeroAbstraction admin dashboard.
          </p>
        </div>

        <form
          action={async (formData) => {
            "use server";

            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: "/admin",
            });
          }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-neutral-300"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-neutral-300"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-sky-500 px-4 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}