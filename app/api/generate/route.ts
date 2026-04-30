import { NextResponse } from "next/server";
import { generateSalesPage, regenerateSection } from "@/features/generator/actions";
import { z } from "zod";

const generateSchema = z.object({
  productName: z.string().min(3),
  description: z.string().min(10),
  audience: z.string().min(1),
  tone: z.string().min(1),
});

// Allowed sections for regeneration
const SECTION_NAMES = ["hero", "features", "pricing", "testimonials", "faq", "cta"] as const;

const regenerateSchema = z.object({
  section: z.enum(SECTION_NAMES),
  context: z.object({
    hero: z.object({
      headline: z.string(),
      subheadline: z.string(),
      cta: z.string(),
      imageUrl: z.string().optional(),
    }),
    features: z.array(
      z.object({ title: z.string(), description: z.string(), icon: z.string() })
    ),
    pricing: z.array(
      z.object({
        title: z.string(),
        price: z.string(),
        period: z.string(),
        features: z.array(z.string()),
        cta: z.string(),
        recommended: z.boolean().optional(),
      })
    ),
    testimonials: z.array(
      z.object({ name: z.string(), role: z.string(), content: z.string(), avatar: z.string() })
    ),
    faq: z.array(
      z.object({ question: z.string(), answer: z.string() })
    ),
    cta: z.object({
      headline: z.string(),
      subheadline: z.string(),
      buttonText: z.string(),
    }),
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = new URL(req.url);

    if (url.searchParams.get("action") === "regenerate") {
      const parsed = regenerateSchema.parse(body);
      const result = await regenerateSection(parsed.section, parsed.context);
      return NextResponse.json(result);
    }

    const parsed = generateSchema.parse(body);
    const result = await generateSalesPage(parsed);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: "Failed to generate page. Please try again." },
      { status: 500 }
    );
  }
}