import { z } from "zod";

const optionalWeightSchema = z.coerce.number().min(0).default(0).transform((value) => value.toFixed(3));

export const createKarigarIssueSchema = z.object({
  body: z.object({
    orderNo: z.string().min(1, "Order No is required").max(120),
    totalWeight: z.coerce.number().min(0).transform((value) => value.toFixed(3)),
    meltingType: z.string().min(1, "Melting Type is required").max(80),
    karigarName: z.string().min(1, "Karigar Name is required").max(160),
    expectedDelivery: z.string().max(120).optional().default(""),
    authorizedBy: z.string().min(1, "Authorized By is required").max(160),
    directMetal: optionalWeightSchema,
    die: optionalWeightSchema,
    chain: optionalWeightSchema,
    taar: optionalWeightSchema,
    kdm: optionalWeightSchema,
    planned: z.string().max(120).optional().default(""),
  }),
});

export type CreateKarigarIssueInput = z.infer<typeof createKarigarIssueSchema>["body"];
