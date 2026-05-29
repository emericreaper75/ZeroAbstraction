/**
 * lib/editorial/case-studies/index.ts
 *
 * Case Study Editorial Contract and metadata definitions.
 * Extends the base Project Contract with case study specific structures.
 */

import { z } from 'zod';
import { ProjectContractSchema } from '../contracts/project-contract';

export const CaseStudyContractSchema = ProjectContractSchema.extend({
  executiveSummary: z.string().optional(),
  problemStatement: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  lessonsLearned: z.array(z.string()).optional(),
});

export type CaseStudyContract = z.infer<typeof CaseStudyContractSchema>;
