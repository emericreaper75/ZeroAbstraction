import React from 'react';

export default function TimelineBg() {
  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ 
        contain: 'layout',
        background: 'linear-gradient(180deg, #050810 0%, #070a14 40%, #060912 100%)'
      }}
    >
      {/* 2. Subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* 4. Very soft cyan radial glow at top-center */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 600px 300px at 50% 0%, rgba(34,211,238,0.05) 0%, transparent 70%)'
        }}
      />

      {/* 3. Faint cyan glow along vertical center represents timeline axis */}
      <div 
        className="absolute left-[50%] top-0 h-full w-[1px]"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(34,211,238,0.15), transparent)'
        }}
      />
    </div>
  );
}
