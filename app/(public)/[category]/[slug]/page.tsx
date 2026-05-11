import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import {
  getAllPostSlugs,
  getPostBySlug,
  VALID_CATEGORIES,
} from '@/lib/posts';
import { extractTOC, slugify } from '@/lib/toc';
import { generatePostMetadata } from '@/lib/metadata';
import ArticleLayout from '@/components/ArticleLayout';
import CopyButton from '@/components/CopyButton';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';

type Props = { params: { category: string; slug: string } };

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.category, params.slug);
  if (!post) return {};
  return generatePostMetadata(post, params.category);
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

const categoryLabels: Record<string, string> = {
  electronics: 'Electronics & Communications',
  astrophysics: 'Astrophysics',
  'physics-math': 'Physics & Mathematics',
  'research-logs': 'Research Logs',
};

export default async function ArticlePage({ params }: Props) {
  if (!VALID_CATEGORIES.includes(params.category as (typeof VALID_CATEGORIES)[number])) {
    notFound();
  }

  const post = getPostBySlug(params.category, params.slug);
  if (!post) notFound();

  const toc = extractTOC(post.content);
  const articleJsonLd = generateArticleJsonLd(post, params.category);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: categoryLabels[params.category] ?? params.category, href: `/${params.category}` },
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
