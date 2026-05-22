import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { headers } from 'next/headers';
import { DistractionFreeProvider } from '@/components/DistractionFreeProvider';
import { generateWebSiteJsonLd } from '@/lib/jsonld';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

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



      <DistractionFreeProvider>
        <div className="min-h-screen bg-neutral-950 text-neutral-300">
          <Navbar />
          <Breadcrumbs />

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