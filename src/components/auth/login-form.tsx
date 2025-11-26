"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInAction, type AuthState } from "@/app/login/actions";
import { Button } from "@/components/ui/button";

const initialState: AuthState = {};

export const LoginForm = () => {
  const [state, formAction] = useActionState(signInAction, initialState);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-3xl border border-slate/60 bg-white p-6 shadow-sm"
    >
      <label className="text-sm font-semibold text-slate-700">
        Email
        <input
          type="email"
          name="email"
          required
          placeholder="lab@university.edu"
          className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
        />
      </label>
      <label className="text-sm font-semibold text-slate-700">
        Password
        <input
          type="password"
          name="password"
          required
          placeholder="Enter secure password"
          className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
        />
      </label>
      <SubmitButton />
      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      {state?.message && (
        <p className="text-sm text-emerald-600">{state.message}</p>
      )}
      <p className="text-xs text-slate-500">
        Password authentication available after KYC approval. Contact ChemPort
        support to enable single sign-on for B2B accounts.
      </p>
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" fullWidth disabled={pending}>
      {pending ? "Signing in..." : "Sign in"}
    </Button>
  );
};
