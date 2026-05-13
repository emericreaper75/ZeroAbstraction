import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { PluggableList } from "unified";

export const mdxOptions: NonNullable<MDXRemoteProps["options"]> = {
  mdxOptions: {
    // Use mutable arrays to satisfy `next-mdx-remote/rsc` option types.
    remarkPlugins: [remarkMath, remarkGfm] as PluggableList,
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
    ] as PluggableList,
  },
};

