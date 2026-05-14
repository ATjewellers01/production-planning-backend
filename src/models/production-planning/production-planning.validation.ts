import { z } from "zod";

const productionPlanningBodySchema = z.object({
  orderNo: z.string().min(1).max(120),
  meltingType: z.string().min(1).max(80),
  karigarName: z.string().max(160).optional().default(""),
  category: z.string().max(120).optional().default(""),
  designCode: z.string().max(120).optional().default(""),
  totalWeight: z.coerce.number().positive().transform((value) => value.toFixed(3)),
  customer: z.string().max(160).optional().default(""),
  dept: z.string().min(1).max(120),
  plannedWeight: z.coerce.number().positive().transform((value) => value.toFixed(3)),
  wastagePercent: z.coerce.number().min(0).max(100).optional().default(0).transform((value) => value.toFixed(2)),
  planned: z.coerce.date().optional(),
  issueWeight: z.coerce.number().min(0).optional().default(0).transform((value) => value.toFixed(3)),
  remainingWeight: z.coerce.number().min(0).optional().transform((value) => value?.toFixed(3)),
  status: z.string().max(40).optional().default("pending"),
});

export const createProductionPlanningEntrySchema = z.object({
  body: productionPlanningBodySchema,
});

export const updateProductionPlanningStatusSchema = z.object({
  body: z.object({
    serialNo: z.string().min(1).max(120),
    dept: z.string().max(120).optional(),
    status: z.string().min(1).max(40),
  }),
});

export const productionPlanningEntryIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateProductionPlanningEntryInput = z.infer<typeof createProductionPlanningEntrySchema>["body"];
export type UpdateProductionPlanningStatusInput = z.infer<typeof updateProductionPlanningStatusSchema>["body"];
