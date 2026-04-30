"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Search, Trash2, Pencil, ArrowLeft, Clock3, Download, Eye, ExternalLink } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { getSessionId } from "@/lib/session";
import { deletePage, renamePage } from "@/features/generator/history";
import { downloadHTML } from "@/features/generator/exportHtml";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import type { SalesPage } from "@/features/generator/types";

const Preview = dynamic(() => import("@/components/preview/Preview"), {
  ssr: false,
});

interface PageRecord {
  id: string;
  title: string | null;
  created_at: string;
  output: SalesPage | null;
}

export default function HistoryPage() {
  const router = useRouter();

  const sessionId = useMemo(() => getSessionId(), []);

  const [pages, setPages] = useState<PageRecord[]>([]);
  const [selected, setSelected] = useState<PageRecord | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    async function fetchPages() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("pages")
          .select("*")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("FETCH ERROR:", error);
          return;
        }

        setPages(data || []);
        if (data && data.length > 0 && !selected) {
          setSelected(data[0]);
        }
      } catch (err) {
        console.error("HISTORY ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    if (sessionId) {
      fetchPages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const filteredPages = useMemo(() => {
    return pages.filter((page) =>
      page.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [pages, search]);

  const handleDelete = async (id: string) => {
    try {
      await deletePage(id);
      const updatedPages = pages.filter((p) => p.id !== id);
      setPages(updatedPages);
      if (selected?.id === id) {
        setSelected(updatedPages[0] || null);
      }
      setShowDeleteModal(null);
      toast.success("Page deleted successfully");
    } catch (err) {
      toast.error("Failed to delete page");
      console.error("DELETE ERROR:", err);
    }
  };

  const handleRename = async (id: string) => {
    if (!renameValue.trim()) return;
    try {
      await renamePage(id, renameValue.trim());
      setPages((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, title: renameValue.trim() } : p,
        ),
      );
      if (selected?.id === id) {
        setSelected({ ...selected, title: renameValue.trim() });
      }
      setRenamingId(null);
      setRenameValue("");
      toast.success("Page renamed successfully");
    } catch (err) {
      toast.error("Failed to rename page");
      console.error("RENAME ERROR:", err);
    }
  };

  const handleExport = () => {
    if (!selected?.output) return;
    downloadHTML(selected.output);
    toast.success("HTML file downloaded!");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black">
      {/* ============================== */}
      {/* SIDEBAR */}
      {/* ============================== */}
      <aside className="w-full lg:w-96 border-r border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-black/80 backdrop-blur-xl flex flex-col">
        {/* HEADER */}
        <div className="shrink-0 p-5 border-b border-gray-200/60 dark:border-gray-800/60 space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <ThemeToggle />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              History
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {pages.length > 0 ? `${pages.length} pages generated` : "No pages yet"}
            </p>
          </div>

          {/* SEARCH */}
          {pages.length > 0 && (
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pages..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>
          )}
        </div>

        {/* PAGE LIST */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ))}
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Clock3 size={24} className="text-gray-400" />
              </div>
              {pages.length === 0 ? (
                <>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">No pages yet</h3>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                    Start creating your first AI-powered sales page.
                  </p>
                  <Button onClick={() => router.push("/dashboard")} size="sm" className="mt-2">
                    Create Page
                  </Button>
                </>
              ) : (
                <p className="text-sm text-gray-400">No pages match &quot;{search}&quot;</p>
              )}
            </div>
          ) : (
            filteredPages.map((page) => {
              const isSelected = selected?.id === page.id;
              return (
                <div
                  key={page.id}
                  onClick={() => setSelected(page)}
                  className={`
                    group relative rounded-2xl border p-4 cursor-pointer transition-all duration-200
                    ${isSelected
                      ? "border-violet-500 bg-violet-50/80 dark:bg-violet-500/10 shadow-sm"
                      : "border-gray-100 dark:border-gray-800 bg-white dark:bg-white/5 hover:border-violet-200 dark:hover:border-violet-500/20"
                    }
                  `}
                >
                  {/* Rename mode */}
                  {renamingId === page.id ? (
                    <div className="space-y-3">
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleRename(page.id)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRename(page.id); }}
                          className="px-3 py-1.5 rounded-lg bg-violet-500 text-white text-xs font-medium hover:bg-violet-600 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setRenamingId(null); }}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs hover:bg-gray-50 dark:hover:bg-white/10 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Action buttons (desktop) */}
                      <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-150">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRenamingId(page.id);
                            setRenameValue(page.title || "");
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
                          title="Rename"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowDeleteModal(page.id); }}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="min-w-0 pr-8 sm:pr-0">
                        <h3 className="font-semibold truncate text-gray-900 dark:text-white text-sm leading-snug">
                          {page.title || "Untitled"}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {formatDate(page.created_at)}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {page.output?.benefits?.length || 0} benefits
                          </span>
                        </div>
                      </div>

                      {/* Mobile action buttons */}
                      <div className="sm:hidden flex items-center gap-1.5 mt-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); setRenamingId(page.id); setRenameValue(page.title || ""); }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowDeleteModal(page.id); }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* ============================== */}
      {/* PREVIEW PANEL */}
      {/* ============================== */}
      <main className="hidden lg:flex flex-col flex-1 overflow-hidden bg-gray-50/50 dark:bg-black/50">
        {/* Toolbar */}
        <div className="shrink-0 flex items-center justify-between px-8 py-4 border-b border-gray-200/60 dark:border-gray-800/60">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {selected ? selected.title || "Untitled" : "Select a page"}
          </span>
          {selected && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                <Download size={13} />
                Export HTML
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500 text-xs font-medium text-white hover:bg-violet-600 transition"
              >
                <ExternalLink size={13} />
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 xl:p-12">
          {selected ? (
            <div className="max-w-5xl mx-auto rounded-3xl border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm p-10 animate-fade-in">
              <Preview data={selected.output} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Eye size={24} />
              </div>
              <p className="text-sm">Select a page to preview</p>
            </div>
          )}
        </div>
      </main>

      {/* ============================== */}
      {/* DELETE MODAL */}
      {/* ============================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 shadow-xl animate-scale-in p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
              Delete Page?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
              This action cannot be undone. The page will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}