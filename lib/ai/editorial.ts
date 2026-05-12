import "server-only";

import { z } from "zod";
import { getOpenAIClient } from "@/lib/ai/openai-client";

const AiEditorialResultSchema = z.object({
  summary: z.string().optional(),
  seoDescription: z.string().optional(),
  titleSuggestions: z.array(z.string()).optional(),
  ogTextSuggestions: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export type AiEditorialResult = z.infer<typeof AiEditorialResultSchema>;

export async function generateEditorialSuggestions(input: {
  title: string;
  description?: string;
  content: string;
  existingTags?: string[];
}) {
  const client = getOpenAIClient();

  const prompt = [
    "You are an editorial assistant for a technical publishing platform.",
    "Return JSON only that matches this shape:",
    JSON.stringify(
      {
        summary: "string (2-4 sentences)",
        seoDescription: "string (<= 160 chars)",
        titleSuggestions: ["string"],
        ogTextSuggestions: ["string (<= 120 chars)"],
        tags: ["string (short, lowercase)"],
      },
      null,
      2
    ),
    "",
    `Title: ${input.title}`,
    `Description: ${input.description ?? ""}`,
    `Existing tags: ${(input.existingTags ?? []).join(", ")}`,
    "",
    "Content (MDX/Markdown):",
    input.content,
  ].join("\n");

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_EDITORIAL_MODEL ?? "gpt-4o-mini",
    temperature: 0.4,
    messages: [
      { role: "system", content: "Return valid JSON only." },
      { role: "user", content: prompt },
    ],
  });

  const text = res.choices[0]?.message?.content ?? "{}";

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = {};
  }

  const validated = AiEditorialResultSchema.safeParse(parsed);
  if (!validated.success) {
    return {
      ok: false as const,
      error: "AI output was not valid JSON for the expected schema.",
    };
  }

  return { ok: true as const, data: validated.data };
}

