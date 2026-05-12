import "server-only";

import OpenAI from "openai";

let _client: OpenAI | null = null;

export function getOpenAIClient() {
  if (_client) return _client;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  _client = new OpenAI({ apiKey });
  return _client;
}

