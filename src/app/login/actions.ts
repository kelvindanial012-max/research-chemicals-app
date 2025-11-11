"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getServerSupabaseClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface AuthState {
  success?: boolean;
  error?: string;
  message?: string;
}

export const signInAction = async (
  prevState: AuthState | null,
  formData: FormData,
): Promise<AuthState> => {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const supabase = getServerSupabaseClient();
  if (!supabase) {
    return {
      success: true,
      message: "Supabase not configured. Set env vars to enable auth.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
};

export const signOutAction = async () => {
  const supabase = getServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/");
};
