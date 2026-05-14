import { z } from "zod";

const alloyConversionBodySchema = z.object({
  productionPlan: z.string().min(1).max(160),
  targetKarat: z.string().min(1).max(40),
  batchNumber: z.string().min(1).max(120),
  input24K: z.coerce.number().positive().transform((value) => value.toFixed(3)),
  purity: z.coerce.number().min(0).max(100).transform((value) => value.toFixed(2)),
  expectedOutput: z.coerce.number().positive().transform((value) => value.toFixed(3)),
  actualOutput: z.coerce.number().nonnegative().transform((value) => value.toFixed(3)),
  estimatedLoss: z.coerce.number().transform((value) => value.toFixed(3)),
});

export const createAlloyConversionEntrySchema = z.object({
  body: alloyConversionBodySchema,
});

export type CreateAlloyConversionEntryInput = z.infer<typeof createAlloyConversionEntrySchema>["body"];
