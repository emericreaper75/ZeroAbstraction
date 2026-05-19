import PageHeader from "@/components/page-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <div className="container mx-auto px-6 pt-32 pb-24">
        <FadeIn>
          <PageHeader 
            label="Foundation"
            title={<>The Philosophy of <span className="text-cyan-400">Zero Abstraction</span></>}
            subtitle="A research-oriented platform dedicated to first-principles engineering and technical rigor."
            accentColor="cyan"
          />
        </FadeIn>
      </div>
      
      <section className="container mx-auto px-6 py-24 border-t border-neutral-900">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <h2 className="text-3xl font-serif font-bold text-white mb-6">The Platform</h2>
            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p>
                ZeroAbstraction is more than just a blog. It is a technical research repository designed to bridge the gap between abstract engineering concepts and first-principles implementation. We believe that true understanding comes from deconstructing complex systems into their fundamental physical and mathematical properties.
              </p>
              <p>
                In a world increasingly reliant on high-level frameworks and opaque APIs, we aim to peel back the layers of abstraction. Whether we are discussing the physics of semiconductor devices, the mathematics behind DSP filters, or the statistics of machine learning, our approach remains the same: no hand-waving, no magic, just rigorous engineering.
              </p>
              <p>
                The platform is built to host high-fidelity technical content, supporting complex mathematical notation via KaTeX, precise syntax highlighting, and interactive simulations. It serves as both a public portfolio and a living research log.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 backdrop-blur-sm">
              <h3 className="text-xl font-mono text-cyan-400 mb-6 uppercase tracking-widest text-sm">Design Philosophy</h3>
              <ul className="space-y-6 text-zinc-300">
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  <div>
                    <strong className="text-white block mb-1">Precision:</strong>
                    <span className="text-sm text-zinc-400">No hand-waving explanations. Every claim is backed by mathematics, data, or source code.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  <div>
                    <strong className="text-white block mb-1">Fidelity:</strong>
                    <span className="text-sm text-zinc-400">Premium reading experience optimized for technical content, utilizing comprehensive typesetting.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  <div>
                    <strong className="text-white block mb-1">Minimalism:</strong>
                    <span className="text-sm text-zinc-400">Cinematic aesthetics without distraction. The interface should never get in the way of the content.</span>
                  </div>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24 border-t border-neutral-900">
        <FadeIn>
          <h2 className="text-3xl font-serif font-bold text-white mb-12 text-center">Core Disciplines</h2>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Electronics & Embedded",
              desc: "From digital signal processing algorithms to microcontroller architecture and custom PCB design. Focus on bare-metal C, Verilog, and hardware-software co-design.",
              icon: "⚡"
            },
            {
              title: "Physics & Mathematics",
              desc: "Deep dives into quantum mechanics, statistical thermodynamics, and differential equations. Deriving the formulas that govern physical reality.",
              icon: "∑"
            },
            {
              title: "Astrophysics",
              desc: "Research logs and observational data analysis. Exploring orbital mechanics, dark matter halo modeling, and radio astronomy techniques.",
              icon: "🌌"
            }
          ].map((discipline) => (
            <StaggerItem key={discipline.title}>
              <div className="p-8 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors h-full">
                <div className="text-3xl mb-4">{discipline.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{discipline.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{discipline.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="container mx-auto px-6 py-24 border-t border-neutral-900">
        <FadeIn>
          <h2 className="text-3xl font-serif font-bold text-white mb-12 text-center">Tech Stack</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: "Next.js 14", category: "Framework", desc: "React Framework" },
            { name: "TypeScript", category: "Language", desc: "Typed JavaScript" },
            { name: "Tailwind CSS", category: "Styling", desc: "Utility-first CSS" },
            { name: "Framer Motion", category: "Animation", desc: "Animation Library" },
            { name: "Prisma", category: "ORM", desc: "Next-gen ORM" },
            { name: "PostgreSQL", category: "Database", desc: "Relational DB" },
            { name: "MDX", category: "Content", desc: "Markdown for Components" },
            { name: "KaTeX", category: "Math", desc: "Math Typesetting" },
            { name: "Shiki", category: "Syntax", desc: "Syntax Highlighter" },
            { name: "NextAuth", category: "Auth", desc: "Authentication" },
            { name: "UploadThing", category: "Media", desc: "File Uploads" },
            { name: "Docker", category: "Deploy", desc: "Containerization" },
          ].map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="group relative flex flex-col items-center justify-center p-6 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 opacity-90 hover:opacity-95 hover:border-cyan-500/40 hover:bg-white/10 transition-all duration-300 h-full text-center cursor-default">
                <span className="text-white font-medium mb-2">{tech.name}</span>
                <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-tighter">{tech.category}</span>
                
                {/* Hover Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 px-3 py-1.5 bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 text-xs text-neutral-300 rounded-md shadow-2xl whitespace-nowrap">
                  {tech.desc}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

    </main>
  );
}
