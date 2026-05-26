import { prisma } from '@/lib/db/prisma';

export type TimelineEntry = {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'electronics' | 'astrophysics' | 'physics-math' | 'research' | 'academic';
  tags?: string[];
  /** Link to the related content page (post, project, or research log) */
  href?: string;
  /** Type of linked content for display labeling */
  contentType?: 'post' | 'project' | 'research';
};

/**
 * Canonical slug normalisation — mirrors the algorithm used by the admin
 * `createProject` / `createPost` server actions when generating slugs from titles.
 * Source: actions/project-actions.ts line 78-81
 *   `title.toLowerCase().trim().replace(/\s+/g, "-")`
 */
export function normalizeSlug(raw: string): string {
  return raw.toLowerCase().trim().replace(/\s+/g, '-');
}

/**
 * Server-only: returns timeline entries with `href` fields validated against
 * the live Prisma database.
 *
 * For every entry that carries a `contentType` link, we verify that a record
 * with the derived slug actually exists and is published.  If it doesn't, the
 * `href` is stripped so `TimelineItem` renders gracefully without a broken link.
 *
 * Call this only from Server Components — it is async and hits the DB.
 */
export async function getTimelineEntriesWithValidation(): Promise<TimelineEntry[]> {
  // Collect the slugs referenced by each content type in a single pass
  const projectSlugs: string[] = [];
  const postSlugs: string[] = [];
  const researchSlugs: string[] = [];

  for (const entry of timelineEntries) {
    if (!entry.href || !entry.contentType) continue;

    const slug = entry.href.split('/').filter(Boolean).pop() ?? '';
    if (!slug) continue;

    if (entry.contentType === 'project') projectSlugs.push(slug);
    else if (entry.contentType === 'post') postSlugs.push(slug);
    else if (entry.contentType === 'research') researchSlugs.push(slug);
  }

  // Batch-fetch only the slugs that exist in the DB (published only)
  const [existingProjects, existingPosts, existingResearch] = await Promise.all([
    projectSlugs.length > 0
      ? prisma.project.findMany({
          where: { slug: { in: projectSlugs }, published: true },
          select: { slug: true },
        })
      : Promise.resolve([]),
    postSlugs.length > 0
      ? prisma.contentPost.findMany({
          where: { slug: { in: postSlugs }, published: true },
          select: { slug: true },
        })
      : Promise.resolve([]),
    researchSlugs.length > 0
      ? prisma.researchLog.findMany({
          where: { slug: { in: researchSlugs }, published: true },
          select: { slug: true },
        })
      : Promise.resolve([]),
  ]);

  const validProjectSlugs = new Set(existingProjects.map((p) => p.slug));
  const validPostSlugs = new Set(existingPosts.map((p) => p.slug));
  const validResearchSlugs = new Set(existingResearch.map((r) => r.slug));

  return timelineEntries.map((entry) => {
    if (!entry.href || !entry.contentType) return entry;

    const slug = entry.href.split('/').filter(Boolean).pop() ?? '';

    const isValid =
      (entry.contentType === 'project' && validProjectSlugs.has(slug)) ||
      (entry.contentType === 'post' && validPostSlugs.has(slug)) ||
      (entry.contentType === 'research' && validResearchSlugs.has(slug));

    if (!isValid) {
      // Strip the broken link so TimelineItem renders without a dead href
      const { href: _removed, ...rest } = entry;
      return rest as TimelineEntry;
    }

    return entry;
  });
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'tl-001',
    date: '2025-03-01',
    title: 'Published Fourier Transform Derivation',
    description:
      'Completed a rigorous walk-through of the Continuous Fourier Transform from first principles, including convergence proofs and applications to differential equations.',
    category: 'physics-math',
    tags: ['fourier', 'analysis', 'publication'],
    href: '/physics-math/fourier-transform-from-first-principles',
    contentType: 'post',
  },
  {
    id: 'tl-002',
    date: '2025-01-15',
    title: 'MEMS Calibration Suite — v2.0 Released',
    description:
      'Major release of the MEMS calibration framework. Added support for temperature-dependent noise models and automated regression testing.',
    category: 'electronics',
    tags: ['mems', 'sensors', 'release'],
    href: '/projects/mems-calibration-suite',
    contentType: 'project',
  },
  {
    id: 'tl-003',
    date: '2024-11-20',
    title: 'Dark Matter Paper Accepted',
    description:
      'Submitted and accepted at MNRAS Letters: "Bayesian estimation of dark matter halos from weak lensing surveys."',
    category: 'astrophysics',
    tags: ['dark-matter', 'bayesian', 'paper'],
    href: '/astrophysics/dark-matter-bayesian-estimation',
    contentType: 'post',
  },
  {
    id: 'tl-004',
    date: '2024-09-05',
    title: 'Quantum Circuit Simulator — GPU Backend',
    description:
      'Integrated CUDA-based statevector backend, achieving 12× speedup on 18-qubit circuits compared to the NumPy reference implementation.',
    category: 'physics-math',
    tags: ['quantum', 'cuda', 'simulation'],
    href: '/projects/quantum-circuit-simulator',
    contentType: 'project',
  },
  {
    id: 'tl-005',
    date: '2024-07-10',
    title: 'Sensor Calibration Field Campaign',
    description:
      'Research log: conducted two-week field campaign to collect inertial data from UAV platform. Characterized vibration noise spectrum in real flight conditions.',
    category: 'research',
    tags: ['sensors', 'uav', 'field-work'],
    href: '/research/sensor-calibration-field-campaign',
    contentType: 'research',
  },
  {
    id: 'tl-006',
    date: '2024-03-22',
    title: 'FIR Filter Designer — Initial Release',
    description:
      'Launched interactive web tool for FIR filter design. Supports windowing methods, Parks-McClellan, and frequency sampling with live preview.',
    category: 'electronics',
    tags: ['dsp', 'filters', 'tool'],
    href: '/projects/fir-filter-designer',
    contentType: 'project',
  },
  {
    id: 'tl-007',
    date: '2023-12-01',
    title: 'MSc Thesis — Submitted',
    description:
      'Submitted MSc thesis on "Adaptive Signal Processing Techniques for GNSS Anti-Jamming Systems." Defense scheduled for January 2024.',
    category: 'academic',
    tags: ['thesis', 'gnss', 'signal-processing'],
    href: '/research/gnss-anti-jamming-thesis',
    contentType: 'research',
  },
  {
    id: 'tl-008',
    date: '2023-08-14',
    title: 'Pulsar Timing Array — Data Analysis Complete',
    description:
      'Finished processing 5 years of IPTA data sets. Identified 3 new candidate millisecond pulsars and constrained gravitational wave background amplitude.',
    category: 'astrophysics',
    tags: ['pulsars', 'gravitational-waves', 'data-analysis'],
    href: '/astrophysics/pulsar-timing-array-analysis',
    contentType: 'post',
  },
];

export const timelineCategories = [
  { value: 'all', label: 'All' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'astrophysics', label: 'Astrophysics' },
  { value: 'physics-math', label: 'Physics & Math' },
  { value: 'research', label: 'Research' },
  { value: 'academic', label: 'Academic' },
] as const;

