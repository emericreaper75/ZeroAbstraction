import React from 'react';
import { cn } from '@/lib/utils';

interface CaseStudyLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function CaseStudyLayout({ children, className }: CaseStudyLayoutProps) {
  return (
    <div className={cn("space-y-20 sm:space-y-24 mt-8", className)}>
      {children}
    </div>
  );
}
