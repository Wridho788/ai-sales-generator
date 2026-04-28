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
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generate Sales Page</h2>

      <Input
        label="Product Name"
        type="text"
        value={form.productName}
        onChange={(e) => handleChange("productName", e.target.value)}
      />

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Description</label>
        <textarea
          className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-500 focus:outline-none"
          rows={4}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <Input
        label="Target Audience"
        type="text"
        value={form.audience}
        onChange={(e) => handleChange("audience", e.target.value)}
      />

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tone</label>
        <select
          className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-500 focus:outline-none"
          value={form.tone}
          onChange={(e) => handleChange("tone", e.target.value)}
        >
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="persuasive">Persuasive</option>
        </select>
      </div>

      <Button
        onClick={() => onGenerate(form)}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Page"}
      </Button>
    </div>
  );
}
