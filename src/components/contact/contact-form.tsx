"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().min(2),
  intent: z.string().min(2),
  message: z.string().min(10),
});

type ContactValues = z.infer<typeof schema>;

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(schema) });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = handleSubmit(async (values) => {
    try {
      setStatus("idle");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-3xl border border-slate/60 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Name
          <input
            {...register("name")}
            className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
          />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name.message}</span>
          )}
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Email
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Organization
          <input
            {...register("organization")}
            className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
          />
          {errors.organization && (
            <span className="text-xs text-red-600">
              {errors.organization.message}
            </span>
          )}
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Intent
          <select
            {...register("intent")}
            className="mt-1 w-full rounded-2xl border border-slate/60 bg-white px-4 py-2 focus:border-ocean focus:outline-none"
          >
            <option value="">Select intent</option>
            <option value="b2b">B2B onboarding</option>
            <option value="compliance">Compliance request</option>
            <option value="support">Support</option>
          </select>
          {errors.intent && (
            <span className="text-xs text-red-600">{errors.intent.message}</span>
          )}
        </label>
      </div>
      <label className="text-sm font-semibold text-slate-700">
        Message
        <textarea
          rows={4}
          {...register("message")}
          className="mt-1 w-full rounded-2xl border border-slate/60 px-4 py-2 focus:border-ocean focus:outline-none"
          placeholder="Please share required volumes, documentation needs, and lab credentials."
        />
        {errors.message && (
          <span className="text-xs text-red-600">{errors.message.message}</span>
        )}
      </label>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Submit request"}
      </Button>
      {status === "success" && (
        <p className="text-sm text-emerald-600">
          Thanks! We&apos;ll reach out within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Unable to send. Email us directly at hello@chemport.io.
        </p>
      )}
    </form>
  );
};
