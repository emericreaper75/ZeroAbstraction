"use server";

import { generateEditorialSuggestions } from "@/lib/ai/editorial";

export async function aiEditorialSuggest(input: {
  title: string;
  description?: string;
  content: string;
  existingTags?: string[];
}) {
  return generateEditorialSuggestions(input);
}

