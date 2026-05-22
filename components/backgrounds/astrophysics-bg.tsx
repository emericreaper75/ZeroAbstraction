import React from "react";
import { AmbientLight } from "./ambient-light";
import { GradientOverlay } from "./gradient-overlay";
import { Vignette } from "./vignette";

export default function AstrophysicsBg() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden bg-[#050810] pointer-events-none"
      style={{ contain: "layout" }}
    >
      <AmbientLight color="violet" opacity={0.15} position="center" size="lg" />
      <GradientOverlay type="mesh" opacity={0.03} />
      <Vignette intensity="medium" />

      {/* Replaced heavy canvas with a simple CSS dotted starfield illusion */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "0 0",
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)",
          backgroundSize: "128px 128px",
          backgroundPosition: "32px 32px",
        }}
      />
    </div>
  );
}
