import React from 'react';
import { cn } from '@/lib/utils';

export function TechStack({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("my-12 flex flex-col gap-8", className)}>
      {children}
    </div>
  );
}

export function TechCategory({ name, children, className }: { name: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 border-l border-zinc-800/50 pl-4 sm:pl-6", className)}>
      <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 m-0">{name}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}

export function TechItem({ name, role, className }: { name: string, role?: string, className?: string }) {
  return (
    <div className={cn("flex flex-col p-4 rounded-xl border border-zinc-800/50 bg-zinc-950/40", className)}>
      <span className="font-mono text-sm text-zinc-200">{name}</span>
      {role && <span className="text-xs text-zinc-500 mt-1">{role}</span>}
    </div>
  );
}
