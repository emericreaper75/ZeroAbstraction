"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { getSpring } from "@/lib/design/motion";

const surfaceVariants = cva(
  // Base classes: positioning, transitions, and border box
  "relative overflow-hidden rounded-xl transition-all duration-200",
  {
    variants: {
      variant: {
        base:
          "bg-[var(--surface-base)] border border-[var(--border-hairline)]",
        glass:
          "bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-glass)] shadow-[var(--highlight-inner)]",
        elevated:
          "bg-[var(--surface-elevated)] border border-[var(--border-elevated)] shadow-[var(--shadow-elevated),var(--highlight-inner)]",
        floating:
          "bg-[var(--surface-floating)] backdrop-blur-sm border border-[var(--border-elevated)] shadow-[var(--shadow-floating),var(--highlight-inner-elevated)]",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-12",
      },
      interactive: {
        true: "cursor-pointer hover:border-[rgba(255,255,255,0.12)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "elevated",
      padding: "md",
      interactive: false,
    },
  }
);

export interface SurfaceProps
  extends Omit<HTMLMotionProps<"div">, "className" | "children">,
    VariantProps<typeof surfaceVariants> {
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
  /** Enable subtle ambient glow on the surface */
  glow?: boolean;
}

/**
 * Surface Foundation
 * Used to wrap content in premium dark-mode safe containers.
 * Provides a 4-tier elevation hierarchy:
 *   base → elevated → floating → glass
 * Maintains consistency in border opacities, backgrounds, inner highlights,
 * and hover interpolations across the entire public UI.
 */
export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant, padding, interactive, glow, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          surfaceVariants({ variant, padding, interactive }),
          glow && "shadow-[var(--glow-soft)]",
          className
        )}
        whileHover={
          interactive
            ? {
                y: variant === "floating" ? -3 : -1,
                transition: getSpring("gentle"),
              }
            : undefined
        }
        {...props}
      >
        {/* Content container relative to stay above inner highlights */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

Surface.displayName = "Surface";
