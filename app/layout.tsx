import type { Metadata } from 'next';
import { Inter, IBM_Plex_Serif, JetBrains_Mono } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { DistractionFreeProvider } from '@/components/DistractionFreeProvider';
import { generateSiteMetadata } from '@/lib/metadata';

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

export const metadata: Metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${ibmPlexSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-neutral-950 text-neutral-300 antialiased">
        <DistractionFreeProvider>
          <Navigation />
          <main className="min-h-[calc(100vh-64px-128px)]">{children}</main>
          <Footer />
        </DistractionFreeProvider>
      </body>
    </html>
  );
}
