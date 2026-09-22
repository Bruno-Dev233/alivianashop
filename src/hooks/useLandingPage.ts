import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { mergeLanding, type LandingContent } from "@/lib/landing";

export type LandingPageRow = {
  id: string;
  slug: string;
  name: string;
  content: LandingContent;
};

export const landingPagesKey = ["landing_pages"] as const;
export const landingPageKey = (slug: string) => ["landing_page", slug] as const;

export async function fetchLandingPages() {
  const { data, error } = await supabase
    .from("landing_pages")
    .select("id, slug, name, content")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    content: mergeLanding(row.content),
  })) as LandingPageRow[];
}

export async function fetchLandingPage(slug: string): Promise<LandingPageRow | null> {
  const { data, error } = await supabase
    .from("landing_pages")
    .select("id, slug, name, content")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    content: mergeLanding(data.content),
  };
}

export function useLandingPages() {
  return useQuery({ queryKey: landingPagesKey, queryFn: fetchLandingPages });
}

export function useLandingPage(slug: string) {
  return useQuery({
    queryKey: landingPageKey(slug),
    queryFn: () => fetchLandingPage(slug),
    staleTime: 30_000,
  });
}
