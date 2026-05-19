import { useEffect, useState } from 'react';

export type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function useTableOfContents(initialHeadings?: TOCItem[]) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<TOCItem[]>(initialHeadings || []);

  useEffect(() => {
    // If no initial headings are provided, dynamically extract them from the DOM
    if (!initialHeadings || initialHeadings.length === 0) {
      // Find all h2 and h3 elements within the article content (if present) or body
      const contentRoot = document.getElementById('article-content') || document.body;
      const elements = Array.from(contentRoot.querySelectorAll('h2, h3'))
        .filter((el) => el.id)
        .map((el) => ({
          id: el.id,
          text: el.textContent || '',
          level: el.nodeName === 'H2' ? 2 : 3,
        }));
      setHeadings(elements);
    } else {
      setHeadings(initialHeadings);
    }
  }, [initialHeadings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // We only want to set the active ID if the entry is intersecting.
        // Because of the tight threshold, usually only one heading is intersecting.
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // The threshold ensures the "active" state triggers exactly when the heading 
      // enters the top portion of the screen (20% from top) and leaves 70% from bottom.
      { rootMargin: '-20% 0% -70% 0%' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  return { activeId, headings };
}
