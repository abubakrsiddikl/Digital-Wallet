import z from "zod";
export const sendMoneyUserZodSchema = z.object({
  receiverPhone: z
    .string()
    .regex(/^01[0-9]{9}$/)
    .min(11, "Phone must be valid"),
  amount: z.number().positive(),
  pin: z
    .string()
    .length(5)
    .regex(/^\d{5}$/)
    .min(5, "PIN must be exactly 5 digits"),
});

export const cashOutUserToAgentZodSchema = z.object({
  agentPhone: z
    .string()
    .regex(/^01[0-9]{9}$/)
    .min(11, "Phone must be valid"),
  amount: z.number().positive(),
  pin: z
    .string()
    .length(5)
    .regex(/^\d{5}$/)
    .min(5, "PIN must be exactly 5 digits"),
});
