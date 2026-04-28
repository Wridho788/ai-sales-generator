"use client";

import { useState } from "react";

import SplitLayout from "@/components/layout/SplitLayout";
import ProductForm from "@/components/form/ProductForm";
import Preview from "@/components/preview/Preview";
import { GeneratorInput, SalesPage } from "@/features/generator/types";
import { TemplateSwitcher } from "@/components/ui/TemplateSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Dashboard() {
  const [data, setData] = useState<SalesPage | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (form: GeneratorInput) => {
    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("API error");

      const json = await res.json();
      setData(json);
    } catch (err) {
      alert("Failed to generate page");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SplitLayout
      left={
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <TemplateSwitcher />
            <ThemeToggle />
          </div>
          <ProductForm onGenerate={handleGenerate} loading={loading} />
        </div>
      }
      right={<Preview data={data} />}
    />
  );
}
