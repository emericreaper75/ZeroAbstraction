import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { PluggableList } from "unified";

// Custom self-contained rehype plugin to extract raw code strings before Shiki parsing
function rehypeExtractRawCode() {
  return (tree: any) => {
    function visit(node: any) {
      if (!node) return;
      if (node.type === 'element' && node.tagName === 'pre') {
        const codeNode = node.children?.find(
          (child: any) => child.type === 'element' && child.tagName === 'code'
        );
        if (codeNode && codeNode.children && codeNode.children[0] && codeNode.children[0].type === 'text') {
          if (!node.properties) node.properties = {};
          node.properties['data-raw-code'] = codeNode.children[0].value;
        }
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    visit(tree);
  };
}

export const mdxOptions: NonNullable<MDXRemoteProps["options"]> = {
  mdxOptions: {
    // Use mutable arrays to satisfy `next-mdx-remote/rsc` option types.
    remarkPlugins: [remarkMath, remarkGfm] as PluggableList,
    rehypePlugins: [
      rehypeExtractRawCode, // Custom plugin runs first to extract original code text
      rehypeSlug,
      rehypeKatex as never,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: false,
          defaultLang: 'plaintext',
        },
      ],
    ] as PluggableList,
  },
};


