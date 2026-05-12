import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/lib/mdx/mdx-components';
import { mdxOptions } from '@/lib/mdx/mdx-options';

type Props = {
  source: string;
};

export default async function MDXContent({ source }: Props) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={mdxOptions}
    />
  );
}

