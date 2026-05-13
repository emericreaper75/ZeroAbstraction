import { extractTOC, nestTOC } from '../lib/toc';
import fs from 'fs';

const content = fs.readFileSync('./content/research-logs/003-msc-thesis-gnss-anti-jamming.mdx', 'utf-8');
const entries = extractTOC(content);
console.log('Entries length:', entries.length);
console.log('Entries:', JSON.stringify(entries, null, 2));

const nested = nestTOC(entries);
console.log('Nested length:', nested.length);
