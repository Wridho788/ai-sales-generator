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
  ]
}

Product: ${input.productName}
Description: ${input.description}
Audience: ${input.audience}
Tone: ${input.tone}
`;
}
