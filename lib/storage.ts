import { createClient as createSupabase } from "@/lib/supabase/client";
import { GeneratorInput, SalesPage } from "@/features/generator/types";

export interface StoredPage {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  input: GeneratorInput;
  output: SalesPage;
}

function mapRow(row: {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  input: GeneratorInput;
  output: SalesPage;
}): StoredPage {
  return {
    id: row.id,
    title: row.title,
    createdAt: new Date(row.created_at).getTime(),
    updatedAt: new Date(row.updated_at).getTime(),
    input: row.input,
    output: row.output,
  };
}

export async function savePage(
  input: GeneratorInput,
  output: SalesPage
): Promise<StoredPage> {
  const supabase = createSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("pages")
    .insert({
      user_id: user.id,
      title: input.productName,
      input,
      output,
    })
    .select()
    .single();

  if (error) throw error;
  return mapRow(data);
}

export async function getPage(id: string): Promise<StoredPage | null> {
  const supabase = createSupabase();
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();
  return data ? mapRow(data) : null;
}

export async function listPages(): Promise<StoredPage[]> {
  const supabase = createSupabase();
  const { data } = await supabase
    .from("pages")
    .select("*")
    .order("created_at", { ascending: false });
  return (data || []).map(mapRow);
}

export async function deletePage(id: string): Promise<void> {
  const supabase = createSupabase();
  await supabase.from("pages").delete().eq("id", id);
}

export async function renamePage(
  id: string,
  newTitle: string
): Promise<StoredPage | null> {
  const { data } = await createSupabase()
    .from("pages")
    .update({ title: newTitle })
    .eq("id", id)
    .select()
    .single();
  return data ? mapRow(data) : null;
}
