import React from "react";
import { AmbientLight } from "./ambient-light";
import { Vignette } from "./vignette";

export default function ProjectsBg() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden bg-[#050810] pointer-events-none"
      style={{ contain: "layout" }}
    >
      <AmbientLight color="brand" opacity={0.06} position="bottom" size="lg" />
      <AmbientLight color="cyan" opacity={0.04} position="top" size="md" />
      <Vignette intensity="light" />

      {/* Subtle dark grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(244,63,94,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244,63,94,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
