import { signIn } from "@/auth";

export const metadata = {
  title: "ZeroAbstraction | Admin Access",
  description: "Authenticate to access the ZeroAbstraction administration panel.",
};

export default function LoginPage() {
  return (
    <main className="w-full h-screen flex flex-row relative overflow-hidden bg-primary-container text-on-background font-body min-h-screen selection:bg-surface-variant selection:text-[#c9c6c5]">
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(30, 41, 59, 0.4) 0%, transparent 60%)",
        }}
      />

      {/* Left Section: Brand Canvas (60%) */}
      <div className="w-[60%] h-full flex items-center justify-center bg-[#0a0a0a] relative z-10 p-12">
        <h1 className="font-display font-bold text-6xl tracking-tighter text-zinc-300">
          ZeroAbstraction
        </h1>
      </div>

      {/* Right Section: Login Panel (40%) */}
      <div className="w-[40%] h-full bg-[#111111] flex items-center justify-center relative z-10 border-l border-zinc-700/50">
        <div className="w-full max-w-md p-12">
          <div className="mb-12">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              Admin Access
            </span>
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
            className="space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-label text-xs text-on-surface-variant"
              >
                Email
              </label>
              <div
                className="relative group rounded transition-all duration-200"
                style={{
                  transition: "box-shadow 0.2s ease",
                }}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="sysadmin@zeroabstraction.dev"
                  className="w-full bg-surface-container-low border border-zinc-700/50 rounded px-4 py-3 text-on-surface placeholder:text-outline-variant focus:border-zinc-300 focus:ring-0 focus:outline-none focus:shadow-[0_0_16px_rgba(30,41,59,0.5)] transition-all duration-200 font-body text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-label text-xs text-on-surface-variant"
              >
                Password
              </label>
              <div className="relative group rounded transition-all duration-200">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-surface-container-low border border-zinc-700/50 rounded px-4 py-3 text-on-surface placeholder:text-outline-variant focus:border-zinc-300 focus:ring-0 focus:outline-none focus:shadow-[0_0_16px_rgba(30,41,59,0.5)] transition-all duration-200 font-body text-sm"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-zinc-300 hover:bg-zinc-200 text-[#0a0a0a] font-body font-medium text-sm px-6 py-4 rounded transition-all duration-200 hover:-translate-y-[1px]"
              >
                Initialize Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}