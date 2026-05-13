import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { headers } from 'next/headers';
import { DistractionFreeProvider } from '@/components/DistractionFreeProvider';
import { generateWebSiteJsonLd } from '@/lib/jsonld';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />

      {/* Skip navigation link for WCAG 2.1 AA */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-zinc-950 focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <DistractionFreeProvider>
        <div className="min-h-screen bg-neutral-950 text-neutral-300">
          <Navbar />

          <main
            id="main-content"
            role="main"
          >
            {children}
          </main>

          <Footer />
        </div>
      </DistractionFreeProvider>
    </>
  );
}