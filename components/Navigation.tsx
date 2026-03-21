'use client';

import Link from 'next/link';
import { useDistractionFree } from '@/components/DistractionFreeProvider';

const navLinks = [
  { href: '/electronics', label: 'Electronics & Comm' },
  { href: '/astrophysics', label: 'Astrophysics' },
  { href: '/physics-math', label: 'Physics & Math' },
  { href: '/research-logs', label: 'Research Logs' },
  { href: '/projects', label: 'Projects' },
  { href: '/timeline', label: 'Timeline' },
];

export default function Navigation() {
  const { isDistractionFree } = useDistractionFree();

  if (isDistractionFree) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-neutral-100 transition-colors hover:text-sky-400"
        >
          Zero<span className="text-sky-500">Abstraction</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Mobile menu hint */}
        <div className="md:hidden">
          <details className="relative">
            <summary className="list-none cursor-pointer rounded-md p-2 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-neutral-800 bg-neutral-900 py-2 shadow-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
