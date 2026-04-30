"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import SplitLayout from "@/components/layout/SplitLayout";
import ProductForm from "@/components/form/ProductForm";
import Preview from "@/components/preview/Preview";
import { getSessionId } from "@/lib/session";
import { GeneratorInput, SalesPage } from "@/features/generator/types";
import { TemplateSwitcher } from "@/components/ui/TemplateSwitcher";

export default function Dashboard() {
  const [data, setData] = useState<SalesPage | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleGenerate = async (form: GeneratorInput) => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        sessionId: getSessionId(),
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API error");

      const json = await res.json();
      setData(json);
      // Tidak auto-redirect ke history
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
          </div>
          <ProductForm onGenerate={handleGenerate} loading={loading} />
          <button
            className="mt-4 px-4 py-2 rounded bg-violet-500 text-white hover:bg-violet-600 transition"
            onClick={() => router.push("/history")}
            type="button"
          >
            Lihat History
          </button>
        </div>
      }
      right={<Preview data={data} />}
    />
  );
}
