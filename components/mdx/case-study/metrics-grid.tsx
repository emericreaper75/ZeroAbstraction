import React from 'react';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

export function MetricsGrid({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("my-12", className)}>
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-zinc-500" />
        <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 m-0">Performance Metrics</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}

export function MetricCard({
  name,
  value,
  trend,
  trendValue,
  className
}: {
  name: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}) {
  const trendColor = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-zinc-400'
  }[trend || 'neutral'];

  const trendIcon = {
    up: '↑',
    down: '↓',
    neutral: '→'
  }[trend || 'neutral'];

  return (
    <div className={cn("p-5 rounded-xl border border-zinc-800/50 bg-[#111111] flex flex-col justify-between", className)}>
      <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">{name}</span>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-light text-white">{value}</span>
        {trend && trendValue && (
          <span className={cn("font-mono text-xs", trendColor)}>
            {trendIcon} {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
