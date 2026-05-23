import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded bg-neutral-900/50 border border-neutral-800/40 animate-shimmer",
        className
      )}
      {...props}
    />
  );
}
