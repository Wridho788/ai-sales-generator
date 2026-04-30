"use server";

import { openai } from "@/lib/openai";
import { buildPrompt } from "./prompt";
import { GeneratorInput, SalesPage } from "./types";

// ==============================
// 🔒 SAFE JSON PARSER (HARDENED)
// ==============================
function safeParseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
    } catch (err) {
      console.error("JSON fallback parse failed:", err);
    }

    console.error("Invalid AI response:", text);
    throw new Error("Invalid AI response format");
  }
}

// ==============================
// 🤖 CORE AI CALL WRAPPER
// ==============================
async function callAI(prompt: string, temperature = 0.7) {
  try {
    const res = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an expert marketing copywriter. Always return strictly valid JSON. No explanation. No markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature,
    });

    const text = res.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("Empty AI response");
    }

    return text;
  } catch {
    console.error("AI CALL ERROR");
    throw new Error("AI request failed");
  }
}

// ==============================
// 🚀 GENERATE FULL PAGE
// ==============================
export async function generateSalesPage(
  input: GeneratorInput
): Promise<SalesPage> {
  const prompt = buildPrompt(input);
  const text = await callAI(prompt, 0.7);
  const result = safeParseJSON(text);

  // Return the full sales page — persistence is handled client-side via localStorage
  return result as SalesPage;
}

// ==============================
// 🔁 REGENERATE SECTION
// ==============================
export async function regenerateSection(
  section: keyof SalesPage,
  context: SalesPage
): Promise<Partial<SalesPage>> {
  const prompt = `
Regenerate ONLY the "${section}" section of this sales page.

Current data:
${JSON.stringify(context, null, 2)}

Rules:
- Return ONLY valid JSON
- No explanation
- No markdown
- Keep structure consistent
- Improve clarity and persuasiveness

Format:
{
  "${section}": { ... }
}
`;

  const text = await callAI(prompt, 0.8);
  const parsed = safeParseJSON(text);

  if (!parsed[section]) {
    throw new Error(`Invalid section response: ${section}`);
  }

  return parsed;
}