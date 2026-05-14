import { z } from "zod";

const productionOrderBodySchema = z.object({
  orderNumber: z.string().min(2).max(80),
  productId: z.string().uuid().optional().nullable(),
  quantity: z.coerce.number().int().positive(),
  targetWeight: z.coerce.number().positive().transform(String),
  status: z.enum(["draft", "issued", "in_progress", "completed", "cancelled"]).default("draft"),
  remarks: z.string().max(500).optional().nullable(),
});

export const createProductionOrderSchema = z.object({
  body: productionOrderBodySchema,
});

export const updateProductionOrderSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: productionOrderBodySchema.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  }),
});

export const productionOrderIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateProductionOrderInput = z.infer<typeof createProductionOrderSchema>["body"];
export type UpdateProductionOrderInput = z.infer<typeof updateProductionOrderSchema>["body"];
