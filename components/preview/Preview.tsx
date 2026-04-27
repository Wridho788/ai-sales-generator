import { Hero } from "./Hero";
import { Benefits } from "./Benefits";
import { SalesPage } from "@/features/generator/types";

export default function Preview({ data }: { data?: SalesPage | null }) {
  if (!data) {
    return (
      <div className="text-gray-400 text-center mt-20">
        Your generated page will appear here
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Hero data={data.hero} />
      <Benefits items={data.benefits} />
    </div>
  );
}
