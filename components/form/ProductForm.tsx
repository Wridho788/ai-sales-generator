"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GeneratorInput } from "@/features/generator/types";
import { downloadHTML } from "@/features/generator/exportHtml";
import { SalesPage } from "@/features/generator/types";
import { Wand2, Download, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  onGenerate: (form: GeneratorInput) => void;
  loading?: boolean;
  generatedData?: SalesPage | null;
}

type FieldError = {
  productName?: string;
  description?: string;
  audience?: string;
};

export default function ProductForm({
  onGenerate,
  loading = false,
  generatedData,
}: ProductFormProps) {
  const [form, setForm] = useState<GeneratorInput>({
    productName: "",
    description: "",
    audience: "",
    tone: "formal",
  });

  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = useCallback((data: GeneratorInput): FieldError => {
    const errs: FieldError = {};
    if (!data.productName.trim() || data.productName.trim().length < 3) {
      errs.productName = "Minimum 3 characters required";
    }
    if (!data.description.trim() || data.description.trim().length < 10) {
      errs.description = "Minimum 10 characters required";
    }
    if (!data.audience.trim()) {
      errs.audience = "Target audience is required";
    }
    return errs;
  }, []);

  const handleChange = (key: keyof GeneratorInput, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      const newErrors = validate({ ...form, [key]: value });
      setErrors((prev) => ({ ...prev, [key]: newErrors[key as keyof FieldError] }));
    }
  };

  const handleBlur = (key: string) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [key]: newErrors[key as keyof FieldError] }));
  };

  const handleSubmit = () => {
    const newErrors = validate(form);
    setErrors(newErrors);
    setTouched({ productName: true, description: true, audience: true, tone: true });

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors above");
      return;
    }

    onGenerate(form);
  };

  const handleExport = () => {
    if (!generatedData) return;
    downloadHTML(generatedData);
    toast.success("HTML file downloaded!");
  };

  const toneOptions = [
    { value: "formal", label: "Formal", description: "Professional & authoritative" },
    { value: "casual", label: "Casual", description: "Friendly & conversational" },
    { value: "persuasive", label: "Persuasive", description: "Compelling & urgent" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
            <Wand2 size={16} className="text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            Generate Sales Page
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tell us about your product and let AI create a high-converting landing page.
        </p>
      </div>

      {/* Form fields */}
      <div className="space-y-5">
        <Input
          label="Product Name"
          type="text"
          placeholder="e.g. AI Writing Assistant"
          value={form.productName}
          onChange={(e) => handleChange("productName", e.target.value)}
          onBlur={() => handleBlur("productName")}
          error={touched.productName ? errors.productName : undefined}
          hint={!touched.productName ? "Minimum 3 characters" : undefined}
          icon={<Wand2 size={16} />}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Product Description
          </label>
          <textarea
            placeholder="Describe your product, its key features, and what makes it unique..."
            className={cn(
              "w-full px-3 py-2.5 rounded-xl border text-sm transition-all duration-200",
              "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
              "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
              touched.description && errors.description
                ? "border-red-400 dark:border-red-500 focus:ring-red-500"
                : ""
            )}
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            onBlur={() => handleBlur("description")}
          />
          {touched.description && errors.description ? (
            <p className="text-xs text-red-500 flex items-center gap-1">{errors.description}</p>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">Minimum 10 characters</p>
          )}
        </div>

        <Input
          label="Target Audience"
          type="text"
          placeholder="e.g. Busy marketers who need quick content"
          value={form.audience}
          onChange={(e) => handleChange("audience", e.target.value)}
          onBlur={() => handleBlur("audience")}
          error={touched.audience ? errors.audience : undefined}
          hint={!touched.audience ? "Who is this page for?" : undefined}
        />

        {/* Tone selector */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tone
          </label>
          <div className="grid grid-cols-3 gap-2">
            {toneOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleChange("tone", opt.value)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200",
                  form.tone === opt.value
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {toneOptions.find((o) => o.value === form.tone)?.description}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-3 pt-2">
        <Button
          onClick={handleSubmit}
          loading={loading}
          className="w-full"
          size="lg"
          icon={<Wand2 size={16} />}
        >
          {loading ? "Generating..." : "Generate Page"}
        </Button>

        {generatedData && (
          <div className="flex gap-2 animate-fade-in">
            <Button
              variant="outline"
              onClick={handleExport}
              icon={<Download size={15} />}
              className="flex-1"
            >
              Export HTML
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.open("/", "_blank")}
              icon={<Eye size={15} />}
              className="flex-1"
            >
              Preview
            </Button>
          </div>
        )}
      </div>

      {/* Regenerate hint */}
      {generatedData && (
        <p className="text-xs text-center text-gray-400 dark:text-gray-500">
          Tip: Hover over sections in the preview to regenerate them.
        </p>
      )}
    </div>
  );
}