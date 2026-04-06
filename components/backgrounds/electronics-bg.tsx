import React from 'react';

export default function ElectronicsBg() {
  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden bg-[#050810] pointer-events-none"
      style={{ contain: 'layout' }}
    >
      {/* 1. CSS dot-grid overlay */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* 3. Faint cyan radial glow in top-right */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 500px 400px at 85% 15%, rgba(34,211,238,0.04) 0%, transparent 70%)'
        }}
      />

      {/* 2. Three decorative SVG circuit trace elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-10 right-10">
          <svg width="220" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 10 L 210 10 L 210 130" stroke="rgba(34,211,238,0.18)" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="3" fill="rgba(34,211,238,0.25)" />
            <circle cx="210" cy="10" r="3" fill="rgba(34,211,238,0.25)" />
            <circle cx="210" cy="130" r="3" fill="rgba(34,211,238,0.25)" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-10">
          <svg width="170" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 90 L 160 90 L 160 10" stroke="rgba(34,211,238,0.18)" strokeWidth="1.5" />
            <circle cx="10" cy="90" r="3" fill="rgba(34,211,238,0.25)" />
            <circle cx="160" cy="90" r="3" fill="rgba(34,211,238,0.25)" />
            <circle cx="160" cy="10" r="3" fill="rgba(34,211,238,0.25)" />
          </svg>
        </div>
        
        <div className="absolute top-[40%] right-20">
          <svg width="200" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 10 L 190 10" stroke="rgba(34,211,238,0.18)" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="3" fill="rgba(34,211,238,0.25)" />
            <circle cx="190" cy="10" r="3" fill="rgba(34,211,238,0.25)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
