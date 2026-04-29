"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Search, Trash2, Pencil, ArrowLeft, Clock3 } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { getSessionId } from "@/lib/session";
import { deletePage, renamePage } from "@/features/generator/history";

const Preview = dynamic(() => import("@/components/preview/Preview"), {
  ssr: false,
});

export default function HistoryPage() {
  const router = useRouter();

  const sessionId = useMemo(() => getSessionId(), []);

  const [pages, setPages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // ==============================
  // FETCH HISTORY
  // ==============================
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

        if (data && data.length > 0) {
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
  }, [sessionId]);

  // ==============================
  // FILTERED PAGES
  // ==============================
  const filteredPages = useMemo(() => {
    return pages.filter((page) =>
      page.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [pages, search]);

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this page?"
    );

    if (!confirmDelete) return;

    try {
      await deletePage(id);

      const updatedPages = pages.filter((p) => p.id !== id);

      setPages(updatedPages);

      if (selected?.id === id) {
        setSelected(updatedPages[0] || null);
      }
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  // ==============================
  // RENAME
  // ==============================
  const handleRename = async (id: string) => {
    if (!renameValue.trim()) return;

    try {
      await renamePage(id, renameValue.trim());

      setPages((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                title: renameValue.trim(),
              }
            : p
        )
      );

      if (selected?.id === id) {
        setSelected({
          ...selected,
          title: renameValue.trim(),
        });
      }

      setRenamingId(null);
      setRenameValue("");
    } catch (err) {
      console.error("RENAME ERROR:", err);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black">
      {/* ============================== */}
      {/* SIDEBAR */}
      {/* ============================== */}
      <aside className="w-full lg:w-90 border-r border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5 backdrop-blur-xl flex flex-col">
        {/* HEADER */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 space-y-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              History
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View and manage your generated sales pages.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-800"
                />
              ))}
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 text-gray-400">
              <Clock3 className="mb-3" />
              <p className="text-sm">
                No history found.
              </p>
            </div>
          ) : (
            filteredPages.map((page) => {
              const isSelected = selected?.id === page.id;

              return (
                <div
                  key={page.id}
                  onClick={() => setSelected(page)}
                  className={`
                    group
                    rounded-2xl
                    border
                    p-4
                    cursor-pointer
                    transition-all
                    duration-200
                    backdrop-blur-xl
                    ${
                      isSelected
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10"
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-white/5 hover:border-violet-300"
                    }
                  `}
                >
                  {renamingId === page.id ? (
                    <div className="space-y-3">
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRename(page.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-violet-500 text-white text-xs hover:bg-violet-600"
                        >
                          Save
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRenamingId(null);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-semibold truncate text-gray-900 dark:text-white">
                            {page.title}
                          </h3>

                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(page.created_at).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRenamingId(page.id);
                              setRenameValue(page.title);
                            }}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                          >
                            <Pencil
                              size={14}
                              className="text-gray-500"
                            />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(page.id);
                            }}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                          >
                            <Trash2
                              size={14}
                              className="text-red-500"
                            />
                          </button>
                        </div>
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
      {/* PREVIEW */}
      {/* ============================== */}
      <main className="hidden lg:block flex-1 overflow-y-auto bg-linear-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-950 p-10">
        <div className="max-w-5xl mx-auto">
          {selected ? (
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-sm p-10">
              <Preview data={selected.output} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[70vh] text-gray-400 text-sm">
              Select a page to preview.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
