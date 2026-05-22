"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AmbientLight } from "@/components/backgrounds/ambient-light";
import { Vignette } from "@/components/backgrounds/vignette";
import { Surface } from "@/components/ui/surface";
import { staggerContainer, fadeUpVariant, entryScaleVariant } from "@/lib/design/motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-base overflow-hidden">
      {/* Background Systems */}
      <div className="absolute inset-0 grid-bg z-0 opacity-50" />
      <AmbientLight color="cyan" position="top" size="lg" opacity={0.12} />
      <AmbientLight color="violet" position="bottom" size="xl" opacity={0.08} />
      <Vignette intensity="medium" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-base to-transparent z-0" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-20">
        {/* Left Column */}
        <motion.div
          className="max-w-2xl"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeUpVariant} className="author-block flex items-center gap-3 mb-6">
            <div
              className="author-avatar flex items-center justify-center w-10 h-10 rounded-full bg-[var(--surface-02)] border border-[var(--border-brand)] text-[var(--color-brand-primary)] font-bold text-sm"
              aria-hidden="true"
            >
              M
            </div>
            <div className="author-info flex flex-col">
              <span className="author-name text-sm font-semibold text-white">
                Manoj Amavasya
              </span>
              <span className="author-descriptor text-xs text-zinc-400">
                ECE Engineer · Signal Processing · Astrophysics
              </span>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-sky-900/50 bg-sky-950/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wide text-cyan-400">
              Technical Writing & Research
            </span>
          </motion.div>

          <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold font-serif mb-6 tracking-tight">
            <span className="text-white">Zero</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Abstraction
            </span>
          </motion.h1>

          <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl font-light">
            Rigorous notes on electronics, astrophysics, physics, and mathematics. No hand-waving. No simplifications. First principles only.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/electronics"
              className="px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold transition-colors duration-200"
            >
              Browse Articles
            </Link>
            <Link
              href="/projects"
              className="ghost-btn px-6 py-3 rounded-md font-medium"
            >
              View Projects
            </Link>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="pt-8 border-t border-zinc-800 flex items-center gap-8 text-sm text-zinc-500 font-mono">
            <div className="flex flex-col">
              <span className="text-zinc-300 font-semibold text-xl mb-1 mt-1">
                12+
              </span>
              <span className="uppercase text-[10px] tracking-wider">
                Articles
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-300 font-semibold text-xl mb-1 mt-1">
                4
              </span>
              <span className="uppercase text-[10px] tracking-wider">
                Domains
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-300 font-semibold text-xl mb-1 mt-1">
                6+
              </span>
              <span className="uppercase text-[10px] tracking-wider">
                Projects
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="hidden lg:flex justify-end relative"
          variants={entryScaleVariant}
          initial="initial"
          animate="animate"
        >
          <Surface variant="glass" padding="none" className="relative w-[400px] rounded-xl shadow-2xl overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
              <span className="text-[10px] font-mono text-cyan-400 opacity-70">
                SYS_READY
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">
                ONLINE
              </span>
            </div>
            
            <div className="p-8 h-full min-h-[300px] flex flex-col justify-end bg-gradient-to-b from-transparent to-black/60">
              <div className="font-mono text-xs text-zinc-500 mb-2">INITIALIZING KNOWLEDGE GRAPH</div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-6">
                <motion.div 
                  className="h-full bg-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                />
              </div>
              
              <div className="flex justify-between items-end border-t border-zinc-800/50 pt-4">
                <div className="font-mono">
                  <div className="text-[10px] text-zinc-600 mb-1">LATENCY</div>
                  <div className="text-sm text-zinc-300">12ms</div>
                </div>
                <div className="font-mono text-right">
                  <div className="text-[10px] text-zinc-600 mb-1">ARCHIVE</div>
                  <div className="text-sm text-zinc-300">SYNCED</div>
                </div>
              </div>
            </div>
          </Surface>
        </motion.div>
      </div>
    </section>
  );
}
