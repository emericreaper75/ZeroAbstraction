import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');
const publicDir = path.join(process.cwd(), 'public');

function getAllMDXFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMDXFiles(filePath, fileList);
    } else if (filePath.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

function buildSearchIndex() {
  console.log('Building search index...');
  const files = getAllMDXFiles(contentDir);
  const index = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data, content } = matter(raw);

    // Strip basic markdown syntax for a cleaner index, or just keep it since fuse fuzzy matches well
    // Here we'll just keep the raw content but trim it to avoid massive files, though MDX files are small.
    // For static search, full content is usually fine if total text is < a few MBs.
    
    // Determine the route path
    const isProject = file.includes(path.join('content', 'projects'));
    const isResearchLog = file.includes(path.join('content', 'research-logs'));
    const slug = data.slug || path.basename(file, '.mdx');
    const category = data.category || 'misc';
    
    // Let's deduce URL based on the file location
    let url = '';
    let categoryLabel = 'Post';
    if (isProject) {
      url = `/projects/${slug}`;
      categoryLabel = 'Project';
    } else if (isResearchLog) {
      url = `/research/${slug}`;
      categoryLabel = 'Research';
    } else {
      url = `/${category}/${slug}`;
      categoryLabel = 'Post';
    }

    index.push({
      id: url,
      title: data.title || 'Untitled',
      description: data.description || '',
      category: categoryLabel,
      tags: data.tags || [],
      content: content.slice(0, 5000), // Limit content size per entry
      url,
    });
  }

  const outputPath = path.join(publicDir, 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(index));
  console.log(`Successfully built search index at ${outputPath} with ${index.length} entries.`);
}

buildSearchIndex();
