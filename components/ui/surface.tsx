"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { getSpring } from "@/lib/design/motion";

const surfaceVariants = cva(
  // Base classes: positioning, transitions, and border box
  "relative overflow-hidden rounded-xl border transition-colors",
  {
    variants: {
      variant: {
        glass:
          "bg-white/5 dark:bg-black/20 backdrop-blur-md border-white/10 dark:border-white/5",
        elevated:
          "bg-white dark:bg-[#0f0f1a] border-neutral-200 dark:border-white/10 shadow-sm",
        floating:
          "bg-white/80 dark:bg-[#161624]/80 backdrop-blur-sm border-neutral-200 dark:border-white/10 shadow-lg",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-12",
      },
      interactive: {
        true: "cursor-pointer hover:border-brand/40 dark:hover:border-cyan-500/40",
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
}

/**
 * Surface Foundation
 * Used to wrap content in premium dark-mode safe containers.
 * Maintains consistency in border opacities, backgrounds, and hover interpolations.
 */
export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant, padding, interactive, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(surfaceVariants({ variant, padding, interactive }), className)}
        whileHover={
          interactive
            ? {
                y: variant === "floating" ? -4 : 0,
                transition: getSpring("bouncy"),
              }
            : undefined
        }
        {...props}
      >
        {/* Content container relative to stay above spotlight */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

Surface.displayName = "Surface";
