import { createBrowserClient, type SupabaseClient } from "@supabase/ssr";

type GenericSchema = Record<string, unknown>;
type GenericTable = Record<string, unknown>;
type BrowserClient = SupabaseClient<GenericSchema, "public", GenericTable>;

export const getBrowserSupabaseClient = (): BrowserClient | null => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return null;
  }

  return createBrowserClient(url, anonKey);
};
