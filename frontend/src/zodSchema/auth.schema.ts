import { z } from "zod";

export const registerZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email"),
  phone: z.string().min(11, "Phone must be valid"),

  password: z.string().regex(/^\d{5}$/, "PIN must be exactly 5 digits"),
});

export const loginZodSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().regex(/^\d{5}$/, "PIN must be exactly 5 digits"),
});
