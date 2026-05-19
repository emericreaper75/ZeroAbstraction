'use client';

import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Menu,
  X,
  Sun,
  Moon,
 ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import SearchModal from '@/components/SearchModal';

const blogCategories = [
  { name: 'Electronics', href: '/electronics' },
  { name: 'Astrophysics', href: '/astrophysics' },
  { name: 'Physics-Math', href: '/physics-math' },
  { name: 'Communications', href: '/communications' },
];

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Communications', href: '/communications' },
  { name: 'Timeline', href: '/timeline' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isDark, setIsDark] = useState(true);

  const [isBlogOpen, setIsBlogOpen] =
    useState(false);

  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
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
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (
      e: KeyboardEvent
    ) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener(
      'keydown',
      handleEscape
    );

    return () =>
      document.removeEventListener(
        'keydown',
        handleEscape
      );
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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isHomepage
          ? isScrolled
            ? 'bg-[#050810]/90 backdrop-blur-md border-b border-zinc-800/60 shadow-lg'
            : 'bg-transparent border-b border-transparent'
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
        <div className="flex flex-1 items-center justify-center gap-1 overflow-visible px-4">
          {/* Blog Dropdown */}
          <div className="relative overflow-visible">
            <button
              onClick={() =>
                setIsBlogOpen(!isBlogOpen)
              }
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-mono transition-colors ${
                isBlogActive
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400'
              }`}
            >
              Blog

              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isBlogOpen
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
                      className={`block rounded-lg px-4 py-3 text-sm font-mono transition-colors ${
                        isActive(
                          category.href
                        )
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400'
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
              className={`rounded-md px-3 py-2 text-sm font-mono transition-colors ${
                isActive(link.href)
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400'
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
            aria-label={
              isDark
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            className="h-9 w-9 border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-400"
          >
            {isDark ? (
              <Sun
                className="h-4 w-4"
                aria-hidden="true"
              />
            ) : (
              <Moon
                className="h-4 w-4"
                aria-hidden="true"
              />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-cyan-400 md:hidden"
            onClick={() =>
              setIsMobileMenuOpen(
                !isMobileMenuOpen
              )
            }
            aria-label={
              isMobileMenuOpen
                ? 'Close menu'
                : 'Open menu'
            }
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? 'max-h-[32rem] border-b border-zinc-800 bg-[#050810]/95 backdrop-blur-md'
            : 'max-h-0'
        }`}
      >
        <div className="flex flex-col space-y-1 px-6 py-4">
          <div className="px-3 py-2 text-xs uppercase tracking-wider text-zinc-500">
            Blog Categories
          </div>

          {blogCategories.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2.5 text-sm font-mono transition-colors ${
                isActive(link.href)
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="my-2 border-t border-zinc-800" />

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2.5 text-sm font-mono transition-colors ${
                isActive(link.href)
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-cyan-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}