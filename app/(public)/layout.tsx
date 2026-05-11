import type { Metadata } from 'next';
import { Inter, IBM_Plex_Serif, JetBrains_Mono, IBM_Plex_Mono } from 'next/font/google';
import 'katex/dist/katex.min.css';
import '../globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { DistractionFreeProvider } from '@/components/DistractionFreeProvider';
import { generateSiteMetadata } from '@/lib/metadata';
import { generateWebSiteJsonLd } from '@/lib/jsonld';

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

export const metadata: Metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${ibmPlexSerif.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-300 antialiased">
        {/* Skip navigation link for WCAG 2.1 AA */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-zinc-950 focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        <DistractionFreeProvider>
          <Navbar />
          <main id="main-content" className="min-h-[calc(100vh-64px-128px)]" role="main">
            {children}
          </main>
          <Footer />
        </DistractionFreeProvider>
      </body>
    </html>
  );
}
