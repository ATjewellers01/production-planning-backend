import { z } from "zod";

export const createDepartmentReceiptSchema = z.object({
  body: z.object({
    issueNo: z.string().min(1, "Issue No is required"),
    finishedNet: z.coerce.number().min(0),
    scrapMetal: z.coerce.number().min(0),
    dustWeight: z.coerce.number().min(0),
    metalLoss: z.coerce.number().min(0),
    returnType: z.string().min(1, "Return Type is required"),
    receivedBy: z.string().min(1, "Received By is required"),
    remarks: z.string().optional().nullable(),
  }),
});

export type CreateDepartmentReceiptInput = z.infer<typeof createDepartmentReceiptSchema>["body"];
