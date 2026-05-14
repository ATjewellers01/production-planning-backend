import { z } from "zod";

const departmentIssueBodySchema = z.object({
  serialNo: z.string().min(1).max(120),
  orderNo: z.string().min(1).max(120),
  issueWeight: z.coerce.number().positive().transform((value) => value.toFixed(3)),
  karigarName: z.string().min(1).max(160),
  authorizedBy: z.string().min(1).max(160),
  plannedStatus: z.string().max(40).optional().default("pending"),
  dept: z.string().min(1).max(120),
  meltingType: z.string().max(80).optional().default(""),
});

export const createDepartmentIssueEntrySchema = z.object({
  body: departmentIssueBodySchema,
});

export type CreateDepartmentIssueEntryInput = z.infer<typeof createDepartmentIssueEntrySchema>["body"];
