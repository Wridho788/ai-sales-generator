import { NextResponse } from "next/server";
import { generateSalesPage, regenerateSection } from "@/features/generator/actions";
import { z } from "zod";

const generateSchema = z.object({
  productName: z.string().min(3),
  description: z.string().min(10),
  audience: z.string().min(1),
  tone: z.string().min(1),
});

const regenerateSchema = z.object({
  section: z.enum(["hero", "benefits"]),
  context: z.object({
    hero: z.object({
      headline: z.string(),
      subheadline: z.string(),
      cta: z.string(),
    }),
    benefits: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = new URL(req.url);

    // Check if this is a regenerate request
    if (url.searchParams.get("action") === "regenerate") {
      const parsed = regenerateSchema.parse(body);
      const result = await regenerateSection(parsed.section, parsed.context);
      return NextResponse.json(result);
    }

    // Otherwise, it's a generate request
    // Accept sessionId if provided
    const parsed = { ...generateSchema.parse(body), sessionId: body.sessionId };
    const result = await generateSalesPage(parsed);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: "Failed to generate page" },
      { status: 500 }
    );
  }
}
