import { useTemplate } from "@/store/useTemplate";

export function TemplateSwitcher() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="flex gap-2">
      <button
        className={`px-4 py-2 rounded-xl border font-medium transition ${
          template === "default"
            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/30 dark:border-violet-500 text-gray-900 dark:text-violet-100"
            : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        onClick={() => setTemplate("default")}
      >
        Default
      </button>
      <button
        className={`px-4 py-2 rounded-xl border font-medium transition ${
          template === "modern"
            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/30 dark:border-violet-500 text-gray-900 dark:text-violet-100"
            : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        onClick={() => setTemplate("modern")}
      >
        Modern
      </button>
    </div>
  );
}
