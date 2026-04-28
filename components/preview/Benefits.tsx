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
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Benefits</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((b, i) => (
          <div
            key={i}
            className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
          >
            <h3 className="font-medium text-gray-900 dark:text-white">{b.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
