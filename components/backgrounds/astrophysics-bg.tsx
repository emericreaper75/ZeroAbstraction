'use client';

import React, { useEffect, useRef } from 'react';

export default function AstrophysicsBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let animationFrameId: number;

    const setSize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();

    const resizeObserver = new ResizeObserver(() => setSize());
    resizeObserver.observe(container);

    interface Star {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
    }

    const stars: Star[] = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1 + 0.5,
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      twinkleSpeed: Math.random() * 0.01 + 0.005,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const baseGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.8);
      baseGradient.addColorStop(0, '#0a0515');
      baseGradient.addColorStop(1, '#050810');
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      stars.forEach(s => {
        s.x += s.speedX;
        s.y += s.speedY;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        s.opacity += s.twinkleSpeed;
        if (s.opacity > 0.5 || s.opacity < 0.1) s.twinkleSpeed = -s.twinkleSpeed;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.opacity)})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ contain: 'layout' }}
    >
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at 70% 30%, rgba(139,92,246,0.05) 0%, transparent 100%)'
        }}
      />
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-50" 
        style={{ willChange: 'transform' }} 
      />
    </div>
  );
}
