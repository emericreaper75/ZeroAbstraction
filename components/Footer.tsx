'use client';

import Link from 'next/link';
import { useDistractionFree } from '@/components/DistractionFreeProvider';
import { Separator } from '@/components/ui/separator';
import NewsletterForm from '@/components/newsletter-form';

const footerLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/electronics', label: 'Electronics' },
  { href: '/astrophysics', label: 'Astrophysics' },
  { href: '/physics-math', label: 'Physics & Math' },
  { href: '/communications', label: 'Communications' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <Link
              href="/"
              className="font-serif text-base font-semibold text-neutral-300 hover:text-sky-400 transition-colors"
              aria-label="Zero Abstraction — Home"
            >
              Zero<span className="text-sky-500">Abstraction</span>
            </Link>
            <p className="mt-2 text-sm text-neutral-500 max-w-sm">
              Notes without hand-waving. Exploring First-Principles engineering, physics, and applied mathematics.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end space-y-4">
            <div className="w-full md:max-w-md">
              <h3 className="text-sm font-semibold text-neutral-300 mb-2 font-mono">Join the Newsletter</h3>
              <p className="text-xs text-neutral-500 mb-4">Get updates on new research logs and projects.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 mb-6" aria-label="Footer navigation">
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

        <Separator className="bg-neutral-800/70" />

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
