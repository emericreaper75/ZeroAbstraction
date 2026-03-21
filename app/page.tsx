import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6);

  const categories = [
    {
      href: '/electronics',
      label: 'Electronics & Comm',
      description: 'Signal processing, circuits, RF systems, and embedded design.',
      color: 'text-amber-400',
      border: 'border-amber-900/50 hover:border-amber-700',
    },
    {
      href: '/astrophysics',
      label: 'Astrophysics',
      description: 'Cosmology, stellar physics, gravitational waves, and observational methods.',
      color: 'text-violet-400',
      border: 'border-violet-900/50 hover:border-violet-700',
    },
    {
      href: '/physics-math',
      label: 'Physics & Math',
      description: 'Quantum mechanics, electrodynamics, analysis, and differential geometry.',
      color: 'text-sky-400',
      border: 'border-sky-900/50 hover:border-sky-700',
    },
    {
      href: '/research-logs',
      label: 'Research Logs',
      description: 'Experimental notes, field logs, and ongoing investigation threads.',
      color: 'text-emerald-400',
      border: 'border-emerald-900/50 hover:border-emerald-700',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950 px-6 py-28 sm:py-36">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 opacity-20 brightness-50 contrast-125"
          style={{ 
            backgroundImage: 'url("/images/electronics.jpg")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            filter: 'grayscale(100%) brightness(0.4) contrast(1.2)'
          }}
        />
        <div className="mx-auto max-w-screen-xl relative z-10">
          <div className="max-w-prose">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-sky-500 font-semibold">
              Technical writing & Research
            </p>
            <h1 className="font-serif text-5xl font-bold leading-tight text-white sm:text-7xl">
              Zero<span className="text-sky-500">Abstraction</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-neutral-300 font-light">
              Rigorous notes on electronics, astrophysics, physics, and mathematics.
              No hand-waving. No simplifications. First principles only.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/electronics"
                className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/20 transition-all hover:bg-sky-500 hover:-translate-y-0.5"
              >
                Browse Articles
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-neutral-700 bg-neutral-900/50 px-6 py-3 text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-all hover:border-neutral-500 hover:bg-neutral-800 hover:-translate-y-0.5"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category navigation */}
      <section className="border-b border-neutral-800 px-6 py-16 bg-neutral-950">
        <div className="mx-auto max-w-screen-xl">
          <h2 className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Research Domains
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group relative overflow-hidden rounded-xl border bg-neutral-900/30 p-8 transition-all hover:bg-neutral-900 ${cat.border}`}
              >
                {/* Background Pattern/Image Overlay */}
                <div 
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ 
                    backgroundImage: cat.label === 'Astrophysics' ? 'url("/images/astrophysics.jpg")' : 
                                     cat.label === 'Physics & Math' ? 'url("/images/math-blueprint.jpg")' : 
                                     cat.label === 'Electronics & Comm' ? 'url("/images/electronics.jpg")' : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%)'
                  }}
                />
                <div className="relative z-10">
                  <h3 className={`font-serif text-xl font-bold ${cat.color}`}>
                    {cat.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300">
                    {cat.description}
                  </p>
                  <div className="mt-6 flex items-center text-xs font-mono font-bold uppercase tracking-widest text-neutral-600 transition-colors group-hover:text-neutral-200">
                    Explore Domain <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent articles */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-600">
              Recent Articles
            </h2>
          </div>
          {posts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={`${post.category}-${post.slug}`} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">No articles yet. Check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
