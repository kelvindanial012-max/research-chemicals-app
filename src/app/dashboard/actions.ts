"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServiceRoleClient } from "@/lib/supabase/service-role";

const schema = z.object({
  productId: z.string().min(1),
  lotNumber: z.string().min(1),
  expiryDate: z.string().min(1),
  storageConditions: z.string().min(1),
  notes: z.string().optional(),
});

export interface CreateBatchState {
  success?: boolean;
  error?: string;
  message?: string;
}

export const createBatchAction = async (
  prevState: CreateBatchState | null,
  formData: FormData,
): Promise<CreateBatchState> => {
  const parsed = schema.safeParse({
    productId: formData.get("productId"),
    lotNumber: formData.get("lotNumber"),
    expiryDate: formData.get("expiryDate"),
    storageConditions: formData.get("storageConditions"),
    notes: formData.get("notes") ?? "",
  });

  if (!parsed.success) {
    return { error: "Please complete all required fields." };
  }

  const supabase = getServiceRoleClient();
  if (!supabase) {
    return {
      success: true,
      message:
        "Batch captured locally. Configure SUPABASE_SERVICE_ROLE_KEY to persist.",
    };
  }

  const { error } = await supabase.from("batches").insert({
    product_id: parsed.data.productId,
    lot_number: parsed.data.lotNumber,
    expiry_date: parsed.data.expiryDate,
    storage_conditions: parsed.data.storageConditions,
    notes: parsed.data.notes,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Batch logged" };
};
