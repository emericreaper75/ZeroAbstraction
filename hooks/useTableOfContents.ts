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

    const handleScroll = () => {
      let currentActiveId = '';
      
      // When at the bottom of the page, highlight the last item
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        setActiveId(headings[headings.length - 1].id);
        return;
      }

      for (const { id } of headings) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        // A heading is active if its top is above a certain threshold (150px accounts for headers)
        // We find the last heading in the list that meets this criteria.
        if (rect.top <= 150) {
          currentActiveId = id;
        }
      }

      // If no heading has top <= 150, it means we are above the first heading.
      // We can fallback to the first heading.
      if (!currentActiveId && headings.length > 0) {
        currentActiveId = headings[0].id;
      }

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId((prev) => currentActiveId !== prev ? currentActiveId : prev);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, activeId]);

  return { activeId, headings };
}
