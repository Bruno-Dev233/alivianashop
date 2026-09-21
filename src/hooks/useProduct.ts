import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/aurelis";

export const productQueryKey = ["product"] as const;

export async function fetchProduct(): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return (data as Product | null) ?? null;
}

export function useProduct() {
  return useQuery({
    queryKey: productQueryKey,
    queryFn: fetchProduct,
    staleTime: 30_000,
  });
}
