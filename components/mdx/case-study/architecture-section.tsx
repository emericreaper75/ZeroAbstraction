import React from 'react';
import { cn } from '@/lib/utils';
import { Layers, Server } from 'lucide-react';

export function SystemArchitecture({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("my-16", className)}>
      <div className="flex items-center gap-3 mb-8 border-b border-zinc-800/50 pb-4">
        <Layers className="w-5 h-5 text-cyan-500" />
        <h3 className="font-serif text-2xl font-medium text-white m-0">System Architecture</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {children}
      </div>
    </div>
  );
}

const colSpanClasses: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};

export function ArchitectureContent({ children, className, colSpan = 7 }: { children: React.ReactNode, className?: string, colSpan?: number }) {
  const spanClass = colSpanClasses[colSpan] || colSpanClasses[7];
  return (
    <div className={cn(`${spanClass} prose prose-invert prose-za max-w-none`, className)}>
      {children}
    </div>
  );
}

export function ArchitectureSidebar({ children, className, colSpan = 5 }: { children: React.ReactNode, className?: string, colSpan?: number }) {
  const spanClass = colSpanClasses[colSpan] || colSpanClasses[5];
  return (
    <div className={cn(`${spanClass} flex flex-col gap-6`, className)}>
      {children}
    </div>
  );
}

export function InfrastructureOverview({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/20", className)}>
      <div className="flex items-center gap-3 mb-6">
        <Server className="w-4 h-4 text-zinc-400" />
        <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 m-0">Infrastructure</h4>
      </div>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
