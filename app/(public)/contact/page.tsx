import PageHeader from "@/components/page-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
import ContactForm from "@/components/ContactForm";
import { Surface } from "@/components/ui/surface";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-base">
      <div className="container mx-auto px-6 pt-32 pb-24">
        <FadeIn>
          <PageHeader 
            label="Contact"
            title={<>Get in <span className="text-cyan-400">Touch</span></>}
            subtitle="Reach out for collaborations, technical inquiries, or consulting opportunities."
            accentColor="cyan"
          />
        </FadeIn>
      </div>
      
      <section className="container mx-auto px-6 py-24 border-t border-neutral-900">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <FadeIn>
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Reach Out</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                I am always open to discussing new projects, technical writing opportunities, or open-source collaborations. Whether you are building complex systems in aerospace, working on low-level embedded hardware, or researching physical phenomena, I am happy to connect.
              </p>
            </FadeIn>
            
            <StaggerContainer className="space-y-6 mt-12">
              <StaggerItem>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:hello@zeroabstraction.com" className="text-zinc-300 hover:text-white transition-colors">hello@zeroabstraction.com</a>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider mb-1">Social</p>
                    <a href="https://twitter.com/zeroabstraction" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white transition-colors">X (Twitter) / @zeroabstraction</a>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider mb-1">Location</p>
                    <span className="text-zinc-300">Anantapur, India (Remote Available)</span>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <FadeIn delay={0.3}>
              <Surface variant="glass" padding="md" className="mt-12">
                <h4 className="text-white font-semibold mb-2">Response Time SLA</h4>
                <p className="text-sm text-zinc-400">
                  I aim to respond to all technical inquiries within 48 hours. For consulting requests, please include &quot;Consulting&quot; in the subject line or message.
                </p>
              </Surface>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.2}>
            <Surface variant="glass" padding="lg" className="shadow-2xl h-full">
              <h3 className="text-xl font-mono text-cyan-400 mb-6 uppercase tracking-widest text-sm">Send a Message</h3>
              <ContactForm />
            </Surface>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
