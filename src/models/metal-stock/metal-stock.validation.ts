import { z } from "zod";

const metalStockBodySchema = z.object({
  customerName: z.string().min(1).max(160),
  invoiceNumber: z.string().min(1).max(120),
  grossWeight: z.coerce.number().positive().transform((value) => value.toFixed(3)),
  purity: z.coerce.number().min(0).max(100).transform((value) => value.toFixed(2)),
  storageLocation: z.string().min(1).max(160),
  entryDate: z.coerce.date().optional(),
  assayCertification: z.string().max(500).optional().default(""),
});

export const createMetalStockEntrySchema = z.object({
  body: metalStockBodySchema,
});

export const metalStockEntryIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateMetalStockEntryInput = z.infer<typeof createMetalStockEntrySchema>["body"];
