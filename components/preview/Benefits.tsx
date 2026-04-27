import { Section } from "./Section";

interface BenefitsProps {
  items?: {
    title: string;
    description: string;
  }[];
}

export function Benefits({ items }: BenefitsProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section>
      <h2 className="text-xl font-semibold mb-4">Benefits</h2>
      <div className="grid gap-4">
        {items.map((b, i) => (
          <div key={i} className="border p-4 rounded-xl bg-white hover:shadow-md transition">
            <h3 className="font-semibold text-violet-600">{b.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{b.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
