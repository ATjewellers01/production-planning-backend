import { z } from "zod";

const productBodySchema = z.object({
  sku: z.string().min(2).max(80),
  name: z.string().min(2).max(160),
  category: z.string().min(2).max(120),
  purity: z.string().min(2).max(40),
  grossWeight: z.coerce.number().positive().transform(String),
  netWeight: z.coerce.number().positive().transform(String),
});

export const createProductSchema = z.object({
  body: productBodySchema,
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: productBodySchema.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  }),
});

export const productIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>["body"];
export type UpdateProductInput = z.infer<typeof updateProductSchema>["body"];
