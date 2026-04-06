'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Electronics', href: '/electronics' },
  { name: 'Astrophysics', href: '/astrophysics' },
  { name: 'Physics & Math', href: '/physics-math' },
  { name: 'Research Logs', href: '/research-logs' },
  { name: 'Projects', href: '/projects' },
  { name: 'Timeline', href: '/timeline' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = useCallback(() => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  }, [isDark]);

  const isActive = (href: string) => {
    if (href === '/blog') return pathname === '/blog' || pathname.startsWith('/blog/');
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050810]/90 backdrop-blur-md border-b border-zinc-800/60 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1 group" aria-label="Zero Abstraction — Home">
          <span className="font-serif text-xl font-bold text-white transition-colors">
            Zero
          </span>
          <span className="font-serif text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 group-hover:from-cyan-300 group-hover:to-indigo-300 transition-all">
            Abstraction
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-mono transition-colors ${
                isActive(link.href)
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800/50'
              }`}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50"
          >
            {isDark ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-9 h-9 border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-cyan-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-[28rem] border-b border-zinc-800 bg-[#050810]/95 backdrop-blur-md'
            : 'max-h-0'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2.5 rounded-md text-sm font-mono transition-colors ${
                isActive(link.href)
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800/50'
              }`}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
