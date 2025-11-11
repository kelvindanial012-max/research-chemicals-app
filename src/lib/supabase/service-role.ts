import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type GenericSchema = Record<string, unknown>;
type GenericTable = Record<string, unknown>;
type ServiceClient = SupabaseClient<GenericSchema, "public", GenericTable>;

/**
 * Service role client used for server actions like batch logging where RLS
 * policies need elevated permissions. Never expose the service key to the
 * browser.
 */
export const getServiceRoleClient = (): ServiceClient | null => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
};
