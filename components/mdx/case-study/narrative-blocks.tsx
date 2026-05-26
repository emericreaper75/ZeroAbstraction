import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, GitMerge, Zap, Bug, Scale } from 'lucide-react';

type ChallengeVariant = 'debugging' | 'architecture' | 'performance' | 'general';

const iconMap = {
  debugging: Bug,
  architecture: GitMerge,
  performance: Zap,
  general: AlertTriangle,
};

const variantColors = {
  debugging: 'text-orange-400 border-orange-500/20 bg-orange-500/5',
  architecture: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  performance: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  general: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
};

export function Challenge({ 
  variant = 'general', 
  title, 
  children, 
  className 
}: { 
  variant?: ChallengeVariant;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = iconMap[variant];
  const colorClass = variantColors[variant];

  return (
    <div className={cn("my-10 rounded-xl border p-5 sm:p-6", colorClass, className)}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 opacity-80" />
        <h4 className="font-medium text-white m-0 text-lg">{title}</h4>
      </div>
      <div className="prose prose-invert prose-za max-w-none text-zinc-300">
        {children}
      </div>
    </div>
  );
}

export function Tradeoff({ 
  optionA, 
  optionB, 
  children, 
  className 
}: { 
  optionA: string; 
  optionB: string; 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={cn("my-12", className)}>
      <div className="flex items-center gap-3 mb-6">
        <Scale className="w-5 h-5 text-zinc-500" />
        <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 m-0">Tradeoff Analysis</h4>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="flex-1 p-5 rounded-xl border border-zinc-800/50 bg-[#111111]">
          <h5 className="font-medium text-white text-base mb-2 m-0 text-center">{optionA}</h5>
        </div>
        <div className="hidden sm:flex items-center justify-center shrink-0">
          <span className="text-zinc-700 font-mono text-sm border border-zinc-800/50 rounded-full px-3 py-1 bg-zinc-950">VS</span>
        </div>
        <div className="flex-1 p-5 rounded-xl border border-zinc-800/50 bg-[#111111]">
          <h5 className="font-medium text-white text-base mb-2 m-0 text-center">{optionB}</h5>
        </div>
      </div>
      <div className="prose prose-invert prose-za max-w-none">
        {children}
      </div>
    </div>
  );
}

export function OptimizationOutcome({
  title,
  before,
  after,
  children,
  className
}: {
  title: string;
  before: string;
  after: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("my-12 rounded-xl border border-emerald-500/20 bg-[#0a0a0a] overflow-hidden", className)}>
      <div className="p-5 sm:p-6 border-b border-emerald-500/10 bg-emerald-500/5">
        <h4 className="font-medium text-emerald-400 m-0 text-lg flex items-center gap-2">
          <Zap className="w-5 h-5" />
          {title}
        </h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/50">
        <div className="p-5 sm:p-6 bg-[#0a0a0a]">
          <span className="block font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Before</span>
          <span className="block font-mono text-lg text-zinc-300">{before}</span>
        </div>
        <div className="p-5 sm:p-6 bg-[#0a0a0a]">
          <span className="block font-mono text-xs uppercase tracking-widest text-emerald-500/70 mb-2">After</span>
          <span className="block font-mono text-lg text-emerald-400">{after}</span>
        </div>
      </div>
      {children && (
        <div className="p-5 sm:p-6 border-t border-zinc-800/50 prose prose-invert prose-za max-w-none">
          {children}
        </div>
      )}
    </div>
  );
}
