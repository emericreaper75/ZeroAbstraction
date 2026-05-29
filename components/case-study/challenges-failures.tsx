import React from 'react';
import { Surface } from '@/components/ui/surface';
import { AlertTriangle, Bug, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FailureProps {
  type?: 'bug' | 'bottleneck' | 'mistake';
  title: string;
  children: React.ReactNode;
}

export function ChallengeFailure({ type = 'mistake', title, children }: FailureProps) {
  const Icon = type === 'bug' ? Bug : type === 'bottleneck' ? AlertTriangle : XCircle;
  const colorClass = type === 'bug' ? 'text-red-400' : type === 'bottleneck' ? 'text-amber-400' : 'text-orange-400';
  const borderClass = type === 'bug' ? 'border-red-900/30' : type === 'bottleneck' ? 'border-amber-900/30' : 'border-orange-900/30';
  const bgClass = type === 'bug' ? 'bg-red-950/10' : type === 'bottleneck' ? 'bg-amber-950/10' : 'bg-orange-950/10';

  return (
    <Surface variant="glass" padding="md" className={cn("my-6 backdrop-blur-sm", borderClass, bgClass)}>
      <div className="flex items-start gap-4">
        <div className={cn("p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 shadow-sm shrink-0", colorClass)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-white mb-3 mt-0.5">{title}</h3>
          <div className="prose prose-invert prose-p:text-[0.9375rem] prose-p:text-zinc-300 prose-p:leading-[1.7] max-w-none">
            {children}
          </div>
        </div>
      </div>
    </Surface>
  );
}

export function ChallengesFailures({ children, title = "Challenges & Failures" }: { children: React.ReactNode, title?: string }) {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-serif text-white mb-8">{title}</h2>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}
