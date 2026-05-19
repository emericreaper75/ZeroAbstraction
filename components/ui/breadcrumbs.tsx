'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on the homepage
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter((path) => path);

  return (
    <nav aria-label="Breadcrumb" className="w-full border-b border-neutral-900 bg-black/50 py-3 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <ol className="flex items-center gap-2 text-xs text-neutral-500 font-mono uppercase tracking-wider">
          <li>
            <Link href="/" className="flex items-center hover:text-cyan-400 transition-colors">
              <Home className="h-3 w-3" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          
          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`;
            const isLast = index === paths.length - 1;
            // Format path name: remove dashes and capitalize
            const formattedPath = path.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

            return (
              <Fragment key={path}>
                <ChevronRight className="h-3 w-3 flex-shrink-0 text-neutral-700" />
                <li>
                  {isLast ? (
                    <span className="text-neutral-300 font-medium" aria-current="page">
                      {formattedPath}
                    </span>
                  ) : (
                    <Link href={href} className="hover:text-cyan-400 transition-colors">
                      {formattedPath}
                    </Link>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
