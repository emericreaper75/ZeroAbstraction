const { serialize } = require('next-mdx-remote/serialize');

async function main() {
  const data = await serialize('# Hello World', { mdxOptions: { remarkPlugins: [], rehypePlugins: [] } });
  console.log(data);
}
main().catch(console.error);
