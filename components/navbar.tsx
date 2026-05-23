'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Surface } from '@/components/ui/surface';
import SearchModal from '@/components/SearchModal';
import { useDistractionFree } from '@/components/DistractionFreeProvider';

const blogCategories = [
  { name: 'All Articles', href: '/blog' },
  { name: 'Electronics', href: '/electronics' },
  { name: 'Astrophysics', href: '/astrophysics' },
  { name: 'Physics-Math', href: '/physics-math' },
  { name: 'Communications', href: '/communications' },
];

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Research', href: '/research' },
  { name: 'Timeline', href: '/timeline' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { isDistractionFree } = useDistractionFree();
  const [isScrolled, setIsScrolled] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isDark, setIsDark] = useState(true);

  const [isBlogOpen, setIsBlogOpen] =
    useState(false);

  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme');

    if (savedTheme === 'light') {
      setIsDark(false);

      document.documentElement.classList.remove(
        'dark'
      );

      document.documentElement.classList.add(
        'light'
      );
    } else {
      setIsDark(true);

      document.documentElement.classList.add(
        'dark'
      );

      document.documentElement.classList.remove(
        'light'
      );
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsBlogOpen(false);
  }, [pathname]);

  const toggleTheme = useCallback(() => {
    if (isDark) {
      document.documentElement.classList.remove(
        'dark'
      );

      document.documentElement.classList.add(
        'light'
      );

      localStorage.setItem(
        'theme',
        'light'
      );

      setIsDark(false);
    } else {
      document.documentElement.classList.add(
        'dark'
      );

      document.documentElement.classList.remove(
        'light'
      );

      localStorage.setItem(
        'theme',
        'dark'
      );

      setIsDark(true);
    }
  }, [isDark]);

  const isActive = (href: string) => {
    return (
      pathname === href ||
      pathname.startsWith(href + '/')
    );
  };

  const isBlogActive =
    pathname.startsWith('/blog') ||
    pathname.startsWith('/electronics') ||
    pathname.startsWith('/astrophysics') ||
    pathname.startsWith('/physics-math') ||
    pathname.startsWith('/communications');

  if (isDistractionFree) return null;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isHomepage
          ? isScrolled
            ? 'bg-[#050810]/90 backdrop-blur-md border-b border-zinc-800/60 shadow-lg'
            : 'bg-[#050810]/60 backdrop-blur-sm border-b border-zinc-800/40'
          : 'bg-[#050810]/95 backdrop-blur-md border-b border-zinc-800/60'
        }`}
      role="banner"
    >
      <nav
        className="container relative mx-auto flex h-16 items-center justify-between overflow-visible px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-1 shrink-0"
          aria-label="Zero Abstraction — Home"
        >
          <span className="font-serif text-xl font-bold text-white transition-colors">
            Zero
          </span>

          <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text font-serif text-xl font-bold text-transparent transition-all group-hover:from-cyan-300 group-hover:to-indigo-300">
            Abstraction
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:!flex flex-1 items-center justify-center gap-1 overflow-visible px-4">
          {/* Blog Dropdown */}
          <div className="relative overflow-visible">
            <button
              aria-expanded={isBlogOpen}
              aria-label="Toggle blog categories menu"
              onClick={() =>
                setIsBlogOpen(!isBlogOpen)
              }
              className={`flex items-center justify-center min-h-[44px] md:min-h-0 gap-1 rounded-md px-3 py-2 text-sm font-mono transition-colors ${isBlogActive
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-cyan-400'
                }`}
            >
              Blog

              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isBlogOpen
                    ? 'rotate-180'
                    : ''
                  }`}
              />
            </button>

            {isBlogOpen && (
              <div className="absolute left-0 top-12 z-[9999] w-56 overflow-visible rounded-xl border border-zinc-800 bg-[#050810]/95 p-2 shadow-2xl backdrop-blur-md">
                {blogCategories.map(
                  (category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className={`block rounded-lg px-4 py-3 text-sm font-mono transition-colors ${isActive(
                        category.href
                      )
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-cyan-400'
                        }`}
                    >
                      {category.name}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          {/* Main Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center min-h-[44px] md:min-h-0 rounded-md px-3 py-2 text-sm font-mono transition-colors ${isActive(link.href)
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-cyan-400'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <SearchModal />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="h-[44px] w-[44px] md:h-9 md:w-9 border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-400"
          >
            {mounted ? (
              isDark ? (
                <Sun
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              ) : (
                <Moon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-[44px] w-[44px] shrink-0 border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-cyan-400 md:hidden"
            onClick={() =>
              setIsMobileMenuOpen(
                !isMobileMenuOpen
              )
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={
              isMobileMenuOpen
                ? 'Close menu'
                : 'Open menu'
            }
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-[#050810]/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-4 top-[72px] w-64 z-50 md:hidden origin-top-right"
            >
              <Surface variant="glass" padding="none" className="flex flex-col shadow-2xl rounded-2xl border border-zinc-800/80 max-h-[calc(100vh-88px)] overflow-y-auto overscroll-contain !bg-[#050810]/95">
                <div className="flex flex-col px-4 py-4 space-y-1">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    Navigation
                  </div>

                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center min-h-[44px] rounded-md px-3 py-2 text-sm font-mono transition-colors ${pathname === '/'
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400'
                      }`}
                  >
                    Home
                  </Link>

                  <Link
                    href="/blog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center min-h-[44px] rounded-md px-3 py-2 text-sm font-mono transition-colors ${isBlogActive
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400'
                      }`}
                  >
                    Blog
                  </Link>

                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center min-h-[44px] rounded-md px-3 py-2 text-sm font-mono transition-colors ${isActive(link.href)
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400'
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <div className="my-2 border-t border-zinc-800/50" />

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true }));
                    }}
                    className="flex items-center min-h-[44px] w-full rounded-md px-3 py-2 text-sm font-mono transition-colors text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400 text-left"
                  >
                    Search
                  </button>
                </div>
              </Surface>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}