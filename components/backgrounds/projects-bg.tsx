import React from 'react';

export default function ProjectsBg() {
  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden bg-[#050810] pointer-events-none"
      style={{ contain: 'layout' }}
    >
      {/* 1. Subtle dark grid (like graph paper) */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(244,63,94,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244,63,94,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. Large rose radial glow in bottom-right corner */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 700px 500px at 90% 90%, rgba(244,63,94,0.05) 0%, transparent 65%)'
        }}
      />

      {/* 3. Second softer cyan glow in top-left */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 500px 400px at 5% 5%, rgba(34,211,238,0.03) 0%, transparent 65%)'
        }}
      />
    </div>
  );
}
