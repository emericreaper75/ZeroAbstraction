import type { SimilarityCandidate, NormalizedEditorialEntity } from '../relationships/types';

export interface ConceptClusterGroup {
  clusterName: string; // The primary tech or domain name
  items: SimilarityCandidate[];
}

export interface GroupedRelationships {
  relatedProjects: SimilarityCandidate[];
  relatedArticles: SimilarityCandidate[];
  conceptClusters: ConceptClusterGroup[];
  nextInSeries?: SimilarityCandidate;
}

/**
 * Organizes a mixed array of similarity candidates into presentation buckets.
 */
export function orchestrateRelationships(
  source: NormalizedEditorialEntity,
  candidates: SimilarityCandidate[]
): GroupedRelationships {
  const relatedProjects: SimilarityCandidate[] = [];
  const relatedArticles: SimilarityCandidate[] = [];
  let nextInSeries: SimilarityCandidate | undefined;

  // Filter and categorize candidates
  for (const candidate of candidates) {
    // Check for chronological series continuation
    if (
      source.series &&
      candidate.entity.series === source.series &&
      typeof candidate.entity.seriesIndex === 'number' &&
      typeof source.seriesIndex === 'number' &&
      candidate.entity.seriesIndex === source.seriesIndex + 1
    ) {
      nextInSeries = candidate;
      continue; // Skip putting it in general buckets if it's the strict "Next"
    }

    if (candidate.entity.type === 'project') {
      relatedProjects.push(candidate);
    } else {
      // Both 'post' and 'research' are grouped as articles in reading experience
      relatedArticles.push(candidate);
    }
  }

  // Generate Concept Clusters based on matchedFactors (e.g., shared technologies or categories)
  const conceptMap = new Map<string, SimilarityCandidate[]>();
  
  for (const candidate of candidates) {
    if (candidate === nextInSeries) continue;

    // We'll cluster by primary tags or matched factors
    // If a candidate matched on 'tag:typescript', we can form a 'TypeScript' cluster
    const tagMatches = candidate.matchedFactors.filter((f) => f.startsWith('tag:'));
    const techMatches = candidate.matchedFactors.filter((f) => f.startsWith('tech:'));

    // Prefer tech matches for clusters
    const primaryFactor = techMatches[0] || tagMatches[0];
    if (primaryFactor) {
      const clusterName = primaryFactor.split(':')[1];
      if (!conceptMap.has(clusterName)) {
        conceptMap.set(clusterName, []);
      }
      conceptMap.get(clusterName)!.push(candidate);
    }
  }

  const conceptClusters: ConceptClusterGroup[] = Array.from(conceptMap.entries())
    .map(([clusterName, items]) => ({
      clusterName,
      items: items.slice(0, 3), // Limit items per cluster for presentation
    }))
    .filter((cluster) => cluster.items.length > 0)
    .sort((a, b) => b.items.length - a.items.length)
    .slice(0, 2); // Show max 2 clusters

  return {
    relatedProjects: relatedProjects.slice(0, 3),
    relatedArticles: relatedArticles.slice(0, 4),
    conceptClusters,
    nextInSeries,
  };
}
