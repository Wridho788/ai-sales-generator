import { GeneratorInput } from "./types";

export function buildPrompt(input: GeneratorInput) {
  return `
Generate a complete, high-converting sales landing page in JSON format.

Return ONLY valid JSON with this exact structure:
{
  "hero": {
    "headline": "string (compelling, benefit-driven headline)",
    "subheadline": "string (1-2 sentences supporting the headline)",
    "cta": "string (action-oriented CTA button text, max 5 words)",
    "imageUrl": "string (realistic Unsplash image URL for hero background, or leave empty)"
  },
  "features": [
    { "title": "string", "description": "string", "icon": "string" }
  ],
  "pricing": [
    {
      "title": "string (e.g. 'Starter', 'Pro', 'Enterprise')",
      "price": "string (e.g. '$29', 'Free', 'Custom')",
      "period": "string (e.g. '/month', 'one-time', '/year')",
      "features": ["string", "string", "..."],
      "cta": "string (button text)",
      "recommended": "boolean (true for the most popular plan, false for others)"
    }
  ],
  "testimonials": [
    { "name": "string (full name)", "role": "string (job title @ company)", "content": "string (1-2 sentences quote)", "avatar": "string (2-letter initials)" }
  ],
  "faq": [
    { "question": "string", "answer": "string" }
  ],
  "cta": {
    "headline": "string (urgency-driven closing headline)",
    "subheadline": "string (supporting text)",
    "buttonText": "string (final CTA)"
  }
}

Product: ${input.productName}
Description: ${input.description}
Audience: ${input.audience}
Tone: ${input.tone}

Rules:
- Return ONLY valid JSON — no markdown, no explanation, no extra text
- Use realistic, relevant Unsplash image URLs (https://images.unsplash.com/photo-...) or empty string
- Generate 6 features (icons from: shield, zap, star, check, rocket, globe, lock, trending-up, users, refresh)
- Generate 3 pricing plans, make the middle one recommended=true
- Generate 3 testimonials with realistic names, roles, and quotes
- Generate 4 FAQ items covering common objections
- All text should be persuasive and conversion-focused
- The hero headline should be max 10 words
- Pricing features should be bullet-point benefits
`;
}