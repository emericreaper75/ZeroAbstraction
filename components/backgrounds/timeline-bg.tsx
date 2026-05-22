import React from "react";
import { AmbientLight } from "./ambient-light";
import { Vignette } from "./vignette";

export default function TimelineBg() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        contain: "layout",
        background: "linear-gradient(180deg, #050810 0%, #070a14 40%, #060912 100%)",
      }}
    >
      <AmbientLight color="cyan" opacity={0.06} position="top" size="lg" />
      <Vignette intensity="light" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
