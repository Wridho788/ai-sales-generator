"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GeneratorInput } from "@/features/generator/types";

interface ProductFormProps {
  onGenerate: (form: GeneratorInput) => void;
  loading?: boolean;
}

export default function ProductForm({ onGenerate, loading = false }: ProductFormProps) {
  const [form, setForm] = useState<GeneratorInput>({
    productName: "",
    description: "",
    audience: "",
    tone: "formal",
  });

  const handleChange = (key: keyof GeneratorInput, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Generate Sales Page</h2>

      <Input
        type="text"
        placeholder="Product Name"
        value={form.productName}
        onChange={(e) => handleChange("productName", e.target.value)}
      />

      <textarea
        placeholder="Product Description"
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
        rows={4}
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Input
        type="text"
        placeholder="Target Audience"
        value={form.audience}
        onChange={(e) => handleChange("audience", e.target.value)}
      />

      <select
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
        value={form.tone}
        onChange={(e) => handleChange("tone", e.target.value)}
      >
        <option value="formal">Formal</option>
        <option value="casual">Casual</option>
        <option value="persuasive">Persuasive</option>
      </select>

      <Button
        onClick={() => onGenerate(form)}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Page"}
      </Button>
    </div>
  );
}
