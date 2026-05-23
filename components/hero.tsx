'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const starfieldRef = useRef<HTMLCanvasElement>(null);
  const oscilloscopeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Starfield setup
    const canvas = starfieldRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Stars
    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
    }
    const stars: Star[] = Array.from({ length: 160 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.02 + 0.01,
    }));

    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      active: boolean;
      timer: number;
    }
    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      opacity: 0,
      active: false,
      timer: 0,
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw regular stars
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) {
          star.speed = -star.speed;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Handle shooting star (every ~3.5s)
      shootingStar.timer += 16; // approx 60fps
      if (!shootingStar.active && shootingStar.timer > 3500) {
        if (Math.random() > 0.5) { // 50% chance to spawn after timer
          shootingStar.active = true;
          shootingStar.x = Math.random() * width;
          shootingStar.y = 0;
          shootingStar.length = Math.random() * 80 + 40;
          shootingStar.speed = Math.random() * 10 + 15;
          shootingStar.opacity = 1;
        }
        shootingStar.timer = 0;
      }

      if (shootingStar.active) {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          shootingStar.x, shootingStar.y, 
          shootingStar.x - shootingStar.length, shootingStar.y - shootingStar.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.length, shootingStar.y - shootingStar.length);
        ctx.stroke();

        shootingStar.x -= shootingStar.speed;
        shootingStar.y += shootingStar.speed;
        shootingStar.opacity -= 0.02;

        if (shootingStar.opacity <= 0 || shootingStar.x < 0 || shootingStar.y > height) {
          shootingStar.active = false;
        }
      }

      animationFrameId = requestAnimationFrame(drawStars);
    };
    drawStars();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Oscilloscope setup
    const canvas = oscilloscopeRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width = 400;
    const height = canvas.height = 300;
    let time = 0;

    const drawOscilloscope = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(34,211,238,0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      }
      for (let i = 0; i < height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
      }

      // Draw secondary purple signal (faint base)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 2;
      for (let i = 0; i < width; i++) {
        const y = height / 2 + Math.sin(i * 0.05 + time * 0.5) * 40;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // Draw primary cyan AM/FM composite signal
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.9)';
      ctx.lineWidth = 2;
      let glowDotX = 0;
      let glowDotY = 0;
      const dotTargetX = (width / 2 + (time * 50) % width) % width; // Scanning dot

      for (let i = 0; i < width; i++) {
        // composite wave: carrier wave + low freq envelop
        const carrier = Math.sin(i * 0.15 + time);
        const envelope = Math.sin(i * 0.02 - time * 0.3) * 60;
        const noise = (Math.random() - 0.5) * 5;
        const y = height / 2 + carrier * envelope + noise;
        
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);

        if (Math.abs(i - dotTargetX) < 1) {
          glowDotX = i;
          glowDotY = y;
        }
      }
      ctx.stroke();

      // Glowing dot tracing the wave
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(glowDotX, glowDotY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      time += 0.05;
      animationFrameId = requestAnimationFrame(drawOscilloscope);
    };
    drawOscilloscope();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-base overflow-hidden">
      {/* Backgrounds */}
      <canvas 
        ref={starfieldRef} 
        className="absolute inset-0 pointer-events-none z-0" 
      />
      <div className="absolute inset-0 grid-bg z-0" />
      
      {/* Radial Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/15 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-base to-transparent z-0" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-12 lg:pt-20">
        {/* Left Column */}
        <div className="max-w-2xl">
          <div className="author-block flex items-center gap-3 mb-6">
            <div className="author-avatar flex items-center justify-center w-10 h-10 rounded-full bg-[var(--surface-02)] border border-[var(--border-brand)] text-[var(--color-brand-primary)] font-bold text-sm" aria-hidden="true">M</div>
            <div className="author-info flex flex-col">
              <span className="author-name text-sm font-semibold text-white">Manoj Amavasya</span>
              <span className="author-descriptor text-xs text-zinc-400">ECE Engineer · Signal Processing · Astrophysics</span>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-sky-900/50 bg-sky-950/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wide text-cyan-400">
              Technical Writing & Research
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-serif mb-6 tracking-tight">
            <span className="text-white">Zero</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Abstraction
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl font-light">
            Rigorous notes on electronics, astrophysics, physics, and mathematics. No hand-waving. No simplifications. First principles only.
          </p>
          
          {/* Primary CTAs */}
          <div className="flex flex-col md:!flex-row gap-4 mb-8 w-full">
            <Link 
              href="/blog" 
              className="w-full md:!w-auto inline-flex justify-center items-center px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_28px_rgba(34,211,238,0.5)]"
            >
              Browse Blog
            </Link>
            <Link 
              href="/projects" 
              className="w-full md:!w-auto inline-flex justify-center items-center ghost-btn px-6 py-3 rounded-md font-medium"
            >
              View Projects
            </Link>
          </div>


          <div className="pt-8 border-t border-zinc-800 flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-start gap-4 sm:gap-8 text-sm text-zinc-400 font-mono">
            <div className="flex flex-col">
              <span className="text-zinc-300 font-semibold text-xl mb-1 mt-1">12+</span>
              <span className="uppercase text-xs tracking-wider">Articles</span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-300 font-semibold text-xl mb-1 mt-1">4</span>
              <span className="uppercase text-xs tracking-wider">Domains</span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-300 font-semibold text-xl mb-1 mt-1">6+</span>
              <span className="uppercase text-xs tracking-wider">Projects</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="hidden lg:flex justify-end relative">
          <div className="relative p-1 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900/50 shadow-2xl backdrop-blur">
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
              <span className="text-[10px] font-mono text-cyan-400 opacity-70">CH1 — RF Signal</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-red-500/20 text-red-400 border border-red-500/50">LIVE</span>
            </div>
            <div className="bg-[#050810] rounded-lg overflow-hidden border border-zinc-800 relative">
              <canvas ref={oscilloscopeRef} className="block w-[400px] h-[300px]" />
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
