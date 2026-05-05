import { z } from "zod";

// ── Agent Application ─────────────────────────────────────────
export const agentApplyZodSchema = z.object({
  nidNumber: z
    .string("NID number is required")
    .min(10, "NID must be at least 10 digits")
    .max(17, "NID must be at most 17 digits")
    .regex(/^\d+$/, "NID must contain digits only"),

  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .min(5, "Address is too short")
    .optional()
    .or(z.literal("")),

  note: z.string().max(500, "Note is too long").optional().or(z.literal("")),
});

// ── Balance Request ───────────────────────────────────────────
export const balanceRequestZodSchema = z.object({
  amount: z
    .number("Amount is required")
    .min(100, "Minimum request is ৳100")
    .max(500000, "Maximum request is ৳5,00,000"),

  note: z.string().max(500, "Note is too long").optional().or(z.literal("")),
});
