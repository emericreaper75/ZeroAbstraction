import React from 'react';
import Link from 'next/link';

const domains = [
  {
    title: 'Electronics & Comm',
    href: '/electronics',
    description: 'Signal processing, circuits, RF systems, and embedded design.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'electronics',
    hoverClass: 'hover:border-cyan-500/50 hover:bg-cyan-500/5 group-hover:text-cyan-400',
    iconBgClass: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
  },
  {
    title: 'Astrophysics',
    href: '/astrophysics',
    description: 'Cosmology, stellar physics, gravitational waves, and observational methods.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    color: 'astrophysics',
    hoverClass: 'hover:border-violet-500/50 hover:bg-violet-500/5 group-hover:text-violet-400',
    iconBgClass: 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
  },
  {
    title: 'Physics & Math',
    href: '/physics-math',
    description: 'Quantum mechanics, electrodynamics, analysis, and differential geometry.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: 'physics',
    hoverClass: 'hover:border-emerald-500/50 hover:bg-emerald-500/5 group-hover:text-emerald-400',
    iconBgClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
  },
  {
    title: 'Research Logs',
    href: '/research-logs',
    description: 'Experimental notes, field logs, and ongoing investigation threads.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'research',
    hoverClass: 'hover:border-amber-500/50 hover:bg-amber-500/5 group-hover:text-amber-400',
    iconBgClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  }
];

export default function DomainCards() {
  return (
    <section className="py-24 px-6 bg-surface border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">Research Domains</p>
          <h2 className="text-3xl font-serif font-bold text-zinc-100">Explore by field</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain) => (
            <Link 
              href={domain.href} 
              key={domain.href}
              className={`group relative flex flex-col p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 transition-all duration-300 overflow-hidden ${domain.hoverClass}`}
            >
              {/* Radial glow background on hover */}
              <div className={`absolute -inset-px opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none glow-${domain.color}`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-colors ${domain.iconBgClass}`}>
                  {domain.icon}
                </div>
                <h3 className="text-lg font-serif font-semibold mb-2 transition-colors">
                  {domain.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-grow">
                  {domain.description}
                </p>
                <div className="flex items-center text-xs font-mono font-medium uppercase tracking-wider text-zinc-600 group-hover:text-inherit transition-colors">
                  <span>Explore domain</span>
                  <svg 
                    className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
