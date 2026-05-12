'use client';

import Link from 'next/link';
import { useDistractionFree } from '@/components/DistractionFreeProvider';
import { Separator } from '@/components/ui/separator';

const footerLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/electronics', label: 'Electronics' },
  { href: '/astrophysics', label: 'Astrophysics' },
  { href: '/physics-math', label: 'Physics & Math' },
  { href: '/research-logs', label: 'Research Logs' },
  { href: '/projects', label: 'Projects' },
  { href: '/timeline', label: 'Timeline' },
];

export default function Footer() {
  const { isDistractionFree } = useDistractionFree();

  if (isDistractionFree) return null;

  return (
    <footer
      className="mt-32 border-t border-neutral-800 bg-black/40 backdrop-blur-sm"
      role="contentinfo"
    >
      <div className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="font-serif text-base font-semibold text-neutral-300 hover:text-sky-400 transition-colors"
              aria-label="Zero Abstraction — Home"
            >
              Zero<span className="text-sky-500">Abstraction</span>
            </Link>
            <p className="mt-1 text-sm text-neutral-500">
              Notes without hand-waving.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="mt-10 bg-neutral-800/70" />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Zero Abstraction. All rights reserved.
          </p>
          <p className="text-xs text-neutral-700 font-mono">v0.2.0</p>
        </div>
      </div>
    </footer>
  );
}
