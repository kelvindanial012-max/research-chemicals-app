import { cookies } from "next/headers";
import {
  CookieOptions,
  createServerClient,
  type SupabaseClient,
} from "@supabase/ssr";

type GenericSchema = Record<string, unknown>;
type GenericTable = Record<string, unknown>;
type ServerClient = SupabaseClient<GenericSchema, "public", GenericTable>;

/**
 * Returns a configured Supabase server client when environment variables exist.
 * Falls back to null so the rest of the app can use mock data during local
 * development before Supabase is wired up.
 */
export const getServerSupabaseClient = (): ServerClient | null => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return null;
  }

  const cookieStore = cookies();
  const readOnly = cookieStore as unknown as {
    get: (name: string) => { value: string } | undefined;
    set?: (
      options: { name: string; value: string } & Partial<CookieOptions>
    ) => void;
  };

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return readOnly.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        readOnly.set?.({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        readOnly.set?.({ name, value: "", ...options, maxAge: 0 });
      },
    },
  });
};
