import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import {
  getAllPosts,
  VALID_CATEGORIES,
} from '@/lib/posts';
import { extractTOC, slugify } from '@/lib/toc';
import { generatePostMetadata } from '@/lib/metadata';
import ArticleLayout from '@/components/ArticleLayout';
import CopyButton from '@/components/CopyButton';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';

type Props = { params: { slug: string } };

/**
 * Finds a post by slug across ALL categories.
 * This enables the /blog/[slug] route to work as a unified entry point.
 */
function findPostBySlug(slug: string) {
  const allPosts = getAllPosts();
  return allPosts.find((p) => p.slug === slug) ?? null;
}

export function generateStaticParams() {
  const allPosts = getAllPosts();
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPostBySlug(params.slug);
  if (!post) return {};
  return generatePostMetadata(post, post.category);
}

function makeHeading(level: number) {
  return function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
    const text = typeof children === 'string' ? children : '';
    const id = slugify(text);
    return (
      <Tag id={id} className="scroll-mt-24" {...props}>
        {children}
      </Tag>
    );
  };
}

const mdxComponents = {
  h1: makeHeading(1),
  h2: makeHeading(2),
  h3: makeHeading(3),
  h4: makeHeading(4),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const codeEl = (children as React.ReactElement)?.props;
    const rawCode: string = typeof codeEl?.children === 'string' ? codeEl.children : '';
    return (
      <div className="group relative my-6">
        <CopyButton code={rawCode} />
        <pre
          className="overflow-x-auto rounded-lg border border-neutral-800 bg-[hsl(220,16%,10%)] p-5 font-mono text-sm leading-relaxed text-neutral-200"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },
};

export default async function BlogArticlePage({ params }: Props) {
  const post = findPostBySlug(params.slug);
  if (!post) notFound();

  const toc = extractTOC(post.content);
  const articleJsonLd = generateArticleJsonLd(post, post.category);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleLayout
        post={post}
        toc={toc}
        mdxContent={
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [
                  rehypeSlug,
                  rehypeKatex as never,
                  [
                    rehypePrettyCode,
                    {
                      theme: 'github-dark-dimmed',
                      keepBackground: true,
                      defaultLang: 'plaintext',
                    },
                  ],
                ],
              },
            }}
          />
        }
      />
    </>
  );
}
