import { count, desc, eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import {
  departmentIssueEntries,
  type NewDepartmentIssueEntry,
  productionPlanningEntries,
} from "../../db/schema/index.js";

export const departmentIssueRepository = {
  findAll() {
    return db.select().from(departmentIssueEntries).orderBy(desc(departmentIssueEntries.timestamp));
  },

  async countAll() {
    const [result] = await db.select({ value: count() }).from(departmentIssueEntries);
    return result?.value ?? 0;
  },

  findPlanningBySerial(serialNo: string) {
    return db.query.productionPlanningEntries.findFirst({
      where: eq(productionPlanningEntries.serialNo, serialNo),
    });
  },

  async createIssueAndUpdatePlanning(data: NewDepartmentIssueEntry) {
    return db.transaction(async (tx) => {
      const [planning] = await tx
        .select()
        .from(productionPlanningEntries)
        .where(eq(productionPlanningEntries.serialNo, data.serialNo))
        .limit(1);

      if (!planning) {
        throw new Error("Production planning entry not found");
      }

      const currentIssued = parseFloat(String(planning.issueWeight || "0")) || 0;
      const issueWeight = parseFloat(String(data.issueWeight || "0")) || 0;
      const plannedWeight = parseFloat(String(planning.plannedWeight || "0")) || 0;
      const totalIssued = currentIssued + issueWeight;
      const remainingWeight = Math.max(0, plannedWeight - totalIssued);
      const plannedStatus = totalIssued + 0.001 >= plannedWeight ? "complete" : "pending";

      const [created] = await tx.insert(departmentIssueEntries).values({
        ...data,
        plannedStatus,
      }).returning();
      if (!created) {
        throw new Error("Department issue entry was not created");
      }

      await tx
        .update(productionPlanningEntries)
        .set({
          issueTimestamp: new Date(),
          issueRef: created.issueNo,
          issueWeight: totalIssued.toFixed(3),
          remainingWeight: remainingWeight.toFixed(3),
          status: plannedStatus,
        })
        .where(eq(productionPlanningEntries.id, planning.id));

      return created;
    });
  },
};
