import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';

export default function SiteChromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-[calc(100vh-64px-128px)]" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}

