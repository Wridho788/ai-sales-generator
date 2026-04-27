"use client";

import { useState } from "react";
import SplitLayout from "@/components/layout/SplitLayout";
import ProductForm from "@/components/form/ProductForm";
import Preview from "@/components/preview/Preview";
import { GeneratorInput, SalesPage } from "@/features/generator/types";

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
        <ProductForm onGenerate={handleGenerate} loading={loading} />
      }
      right={<Preview data={data} />}
    />
  );
}
