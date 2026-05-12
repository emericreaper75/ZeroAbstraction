import type { Post } from '@/lib/posts';
import { tagOverlapScore } from '@/lib/related/similarity';

export function getRelatedPosts(
  allPosts: Post[],
  current: Pick<Post, 'slug' | 'category' | 'tags'>,
  limit = 4
) {
  const related = allPosts
    .filter((p) => p.published !== false)
    .filter((p) => !(p.slug === current.slug && p.category === current.category))
    .map((p) => ({
      post: p,
      score:
        tagOverlapScore(p.tags, current.tags) +
        (p.category === current.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);

  return related;
}

