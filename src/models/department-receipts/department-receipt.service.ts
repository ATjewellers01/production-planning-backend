import type { CreateDepartmentReceiptInput } from "./department-receipt.validation.js";
import { departmentReceiptRepository } from "./department-receipt.repository.js";
import { db } from "../../db/client.js";
import { departmentIssueEntries, departmentReceiptEntries, productionPlanningEntries } from "../../db/schema/index.js";
import { eq, count } from "drizzle-orm";

function nextReceiptNo(totalEntries: number) {
  return `REC-${String(totalEntries + 1).padStart(4, "0")}`;
}

function nextPlanningSerialNo(existingCount: number) {
  return `PN-${String(existingCount + 1).padStart(3, "0")}`;
}

export const departmentReceiptService = {
  listEntries() {
    return departmentReceiptRepository.findAll();
  },

  getScrapByKarat() {
    return departmentReceiptRepository.getScrapByKarat();
  },

  async createEntry(input: CreateDepartmentReceiptInput) {
    return await db.transaction(async (tx) => {
      // 1. Get total entries for receipt number
      const [countResult] = await tx.select({ value: count() }).from(departmentReceiptEntries);
      const totalEntries = countResult?.value ?? 0;
      const receiptNo = nextReceiptNo(totalEntries);

      // 2. Create the Receipt Entry
      const [receipt] = await tx.insert(departmentReceiptEntries).values({
        issueNo: input.issueNo,
        receiptNo,
        finishedNet: input.finishedNet.toString(),
        scrapMetal: input.scrapMetal.toString(),
        dustWeight: input.dustWeight.toString(),
        metalLoss: input.metalLoss.toString(),
        returnType: input.returnType,
        receivedBy: input.receivedBy,
        remarks: input.remarks,
      }).returning();

      // 3. Update the Original Issue Status
      await tx.update(departmentIssueEntries)
        .set({
          plannedStatus: input.returnType === "CompleteReturn" ? "completed" : "partially_returned",
          updatedAt: new Date()
        })
        .where(eq(departmentIssueEntries.issueNo, input.issueNo));

      // 4. If Partly Return AND scrap metal > 0:
      //    Create a new Production Planning entry for the scrap weight.
      //    This makes the scrap appear in Production Planning (not Department Receipt pending).
      if (input.returnType === "PartlyReturn" && input.scrapMetal > 0) {
        // Fetch original issue to get dept, meltingType, orderNo, karigarName
        const [originalIssue] = await tx.select()
          .from(departmentIssueEntries)
          .where(eq(departmentIssueEntries.issueNo, input.issueNo));

        if (originalIssue) {
          // Get next PN serial number
          const [planCount] = await tx.select({ value: count() }).from(productionPlanningEntries);
          const serialNo = nextPlanningSerialNo(planCount?.value ?? 0);

          const scrapWeight = input.scrapMetal.toString();

          await tx.insert(productionPlanningEntries).values({
            serialNo,
            orderNo: originalIssue.orderNo || "STOCK-BASED",
            meltingType: originalIssue.meltingType || "22K",
            karigarName: originalIssue.karigarName || "",
            category: "Scrap Re-process",
            designCode: "",
            totalWeight: scrapWeight,
            customer: "Internal Stock",
            dept: originalIssue.dept || "",
            plannedWeight: scrapWeight,
            wastagePercent: "0.00",
            planned: new Date(),
            issueWeight: "0.000",
            remainingWeight: scrapWeight,
            status: "pending",
          });
        }
      }

      return receipt;
    });
  }
};
