import { supabase } from "@/lib/supabase";

export async function deletePage(id: string) {
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) throw error;
}

export async function renamePage(id: string, newTitle: string) {
  const { error } = await supabase.from("pages").update({ title: newTitle }).eq("id", id);
  if (error) throw error;
}

export async function getPagesBySession(sessionId: string) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
