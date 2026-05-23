import type { Metadata } from 'next';
import {
  Inter,
  IBM_Plex_Serif,
  JetBrains_Mono,
  IBM_Plex_Mono,
} from 'next/font/google';

import 'katex/dist/katex.min.css';
import './globals.css';
import SkeletonProvider from '@/components/SkeletonProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-plex-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zero-abstraction.dev'),
  title: {
    default: "ZeroAbstraction | First-Principles Engineering",
    template: "%s | ZeroAbstraction"
  },
  description: "Exploring first-principles engineering across aerospace, embedded systems, and astrophysics.",
  authors: [{ name: "ZeroAbstraction" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ZeroAbstraction",
    title: "ZeroAbstraction | First-Principles Engineering",
    description: "Exploring first-principles engineering across aerospace, embedded systems, and astrophysics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroAbstraction",
    description: "First-Principles Engineering",
    creator: "@zeroabstraction"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${ibmPlexSerif.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-300 antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SkeletonProvider>
          {children}
        </SkeletonProvider>
      </body>
    </html>
  );
}