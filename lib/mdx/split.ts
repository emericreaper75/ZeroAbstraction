export function splitMDXContent(content: string, maxSections: number = 2) {
  const lines = content.split('\n');
  let sectionCount = 0;
  let splitIndex = -1;
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Toggle code block state
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    // Only count headings outside of code blocks
    if (!inCodeBlock && line.match(/^##\s/)) {
      sectionCount++;
      if (sectionCount > maxSections) {
        splitIndex = i;
        break;
      }
    }
  }

  if (splitIndex === -1) {
    return { previewMDX: content, remainingMDX: null };
  }

  return {
    previewMDX: lines.slice(0, splitIndex).join('\n'),
    remainingMDX: lines.slice(splitIndex).join('\n'),
  };
}
