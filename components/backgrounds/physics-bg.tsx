import React from "react";
import { AmbientLight } from "./ambient-light";
import { Vignette } from "./vignette";

export default function PhysicsBg() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden bg-[#050810] pointer-events-none"
      style={{ contain: "layout" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes meshFloat {
          0%   { background-position: 0% 0%, 100% 100%, 50% 50%; }
          33%  { background-position: 20% 80%, 80% 20%, 60% 40%; }
          66%  { background-position: 80% 20%, 20% 80%, 40% 60%; }
          100% { background-position: 0% 0%, 100% 100%, 50% 50%; }
        }
      `,
        }}
      />

      <AmbientLight color="emerald" opacity={0.06} position="center" size="lg" />
      <Vignette intensity="medium" />

      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 600px 400px, rgba(74,222,128,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 500px 600px, rgba(34,211,238,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 400px 300px, rgba(139,92,246,0.03) 0%, transparent 70%)
          `,
          backgroundSize: "100% 100%",
          animation: "meshFloat 20s ease-in-out infinite",
          opacity: 1,
          willChange: "transform",
        }}
      />

      {/* CSS emerald grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Large decorative SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="rgba(74,222,128,0.06)" strokeWidth="1" fill="none">
          <circle cx="75%" cy="50%" r="280" />
          <circle cx="75%" cy="50%" r="180" />
        </g>
      </svg>
    </div>
  );
}
