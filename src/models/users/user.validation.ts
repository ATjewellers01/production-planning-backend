import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    userId: z.string().min(1).max(50),
    name: z.string().min(2).max(120),
    email: z.string().email().max(255).optional().default(""),
    password: z.string().min(4),
    role: z.string().default("user"),
    phoneNumber: z.string().max(20).optional(),
    profileImage: z.string().url().optional(),
    pageAccess: z.string().default("All"),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    userId: z.string().min(1).max(50).optional(),
    name: z.string().min(2).max(120).optional(),
    email: z.string().email().max(255).optional(),
    password: z.string().min(4).optional(),
    role: z.string().optional(),
    phoneNumber: z.string().max(20).optional(),
    profileImage: z.string().url().optional(),
    pageAccess: z.string().optional(),
  }).refine((v) => Object.keys(v).length > 0, { message: "At least one field is required" }),
});

export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type UpdateUserInput = z.infer<typeof updateUserSchema>["body"];
