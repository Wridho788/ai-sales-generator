"use server";

import { openai } from "@/lib/openai";
import { buildPrompt } from "./prompt";
import { GeneratorInput, SalesPage } from "./types";

function safeParseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    // fallback: extract JSON manually
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);

    throw new Error("Invalid AI response");
  }
}

export async function generateSalesPage(input: GeneratorInput): Promise<SalesPage> {
  const prompt = buildPrompt(input);

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = res.choices[0].message.content;

  return safeParseJSON(text || "{}");
}

export async function regenerateSection(
  section: string,
  context: SalesPage
): Promise<Partial<SalesPage>> {
  const prompt = `
Regenerate ONLY the "${section}" section of this sales page.

Current data:
${JSON.stringify(context, null, 2)}

Return ONLY valid JSON in this format:
{
  "${section}": { /* regenerated content */ }
}

Be creative and compelling.
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  const text = res.choices[0].message.content;
  return safeParseJSON(text || "{}");
}
