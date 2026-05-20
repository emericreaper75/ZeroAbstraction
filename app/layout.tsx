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
  title: "ZeroAbstraction",
  description: "Portfolio Platform",
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
      <body className="min-h-screen bg-neutral-950 text-neutral-300 antialiased">
        <SkeletonProvider>
          {children}
        </SkeletonProvider>
      </body>
    </html>
  );
}