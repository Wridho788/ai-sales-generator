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
  } catch (err: any) {
    console.error("AI CALL ERROR:", err);
    throw new Error("AI request failed");
  }
}

// ==============================
// 🚀 GENERATE FULL PAGE
// ==============================
import { supabase } from "@/lib/supabase";

export async function generateSalesPage(
  input: GeneratorInput & { sessionId?: string }
): Promise<SalesPage> {

  const prompt = `
${buildPrompt(input)}

IMPORTANT:
- Return ONLY valid JSON
- No explanation
- No markdown
- Follow the exact structure
- Add a realistic, relevant, and visually appealing image URL for the hero section as 'imageUrl' (use Unsplash, Pexels, or similar free image sources, or a placeholder if needed)
- Example hero structure:
  {
    "headline": "...",
    "subheadline": "...",
    "cta": "...",
    "imageUrl": "https://images.unsplash.com/photo-..."
  }
`;

  const text = await callAI(prompt, 0.7);
  const result = safeParseJSON(text);

  // Save to Supabase if sessionId is provided
  if (input.sessionId) {
    await supabase.from("pages").insert({
      session_id: input.sessionId,
      title: input.productName,
      input,
      output: result,
    });
  }

  return result;
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

  // 🛡️ extra guard (biar tidak rusak state)
  if (!parsed[section]) {
    throw new Error(`Invalid section response: ${section}`);
  }

  return parsed;
}