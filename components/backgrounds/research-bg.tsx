import React from 'react';

export default function ResearchBg() {
  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden bg-[#050810] pointer-events-none"
      style={{ contain: 'layout' }}
    >
      {/* 2. Faint amber radial glow top-left */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 600px 400px at 10% 20%, rgba(251,191,36,0.04) 0%, transparent 70%)'
        }}
      />

      {/* 3. Horizontal scan-line CSS texture */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(251,191,36,0.012) 3px,
            rgba(251,191,36,0.012) 4px
          )`
        }}
      />

      {/* 1. Full-width SVG sine wave decoration */}
      <svg 
        className="absolute left-0 w-full" 
        style={{ top: '80px', height: '120px' }}
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60" 
          stroke="rgba(251,191,36,0.15)" 
          strokeWidth="1.5" 
          fill="none" 
        />
        <path 
          d="M0,75 C240,35 480,115 720,75 C960,35 1200,115 1440,75" 
          stroke="rgba(251,191,36,0.07)" 
          strokeWidth="1" 
          fill="none" 
        />
      </svg>
    </div>
  );
}
