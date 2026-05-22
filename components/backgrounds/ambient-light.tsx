"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface AmbientLightProps {
  color?: "cyan" | "violet" | "emerald" | "amber" | "brand";
  opacity?: number;
  position?: "top" | "center" | "bottom";
  className?: string;
  size?: "md" | "lg" | "xl";
}

/**
 * Reusable ambient radial lighting layer.
 * Performance-safe and relies on CSS radial gradients.
 */
export function AmbientLight({
  color = "cyan",
  opacity = 0.15,
  position = "center",
  size = "lg",
  className,
}: AmbientLightProps) {
  const colorMap = {
    cyan: "rgba(34, 211, 238, var(--alpha))",
    violet: "rgba(168, 85, 247, var(--alpha))",
    emerald: "rgba(74, 222, 128, var(--alpha))",
    amber: "rgba(251, 191, 36, var(--alpha))",
    brand: "rgba(0, 201, 224, var(--alpha))",
  };

  const positionMap = {
    top: "top -20% left 50%",
    center: "center",
    bottom: "bottom -20% left 50%",
  };

  const sizeMap = {
    md: "40vw",
    lg: "60vw",
    xl: "80vw",
  };

  const baseColor = colorMap[color].replace("var(--alpha)", opacity.toString());
  const gradient = `radial-gradient(circle ${sizeMap[size]} at ${positionMap[position]}, ${baseColor} 0%, rgba(0,0,0,0) 70%)`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        background: gradient,
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
      aria-hidden="true"
    />
  );
}
