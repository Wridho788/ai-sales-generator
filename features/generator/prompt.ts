import { GeneratorInput } from "./types";

export function buildPrompt(input: GeneratorInput) {
  return `
Generate a high-converting sales page in JSON format.

Return ONLY JSON:
{
  "hero": {
    "headline": "",
    "subheadline": "",
    "cta": ""
  },
  "benefits": [
    { "title": "", "description": "" }
  ],
}

Product: ${input.productName}
Description: ${input.description}
Audience: ${input.audience}
Tone: ${input.tone}

IMPORTANT:
- Generate a realistic, relevant image URL for the product (e.g., from Unsplash or similar, do not use markdown, just the URL string)
- Return ONLY valid JSON
- No explanation
- No markdown
- Follow the exact structure
`;
}
