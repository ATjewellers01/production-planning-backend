import { and, count, desc, eq, like, sql, sum } from "drizzle-orm";
import { db } from "../../db/client.js";
import {
  type NewProductionPlanningEntry,
  productionPlanningEntries,
  departmentIssueEntries,
  departmentReceiptEntries,
} from "../../db/schema/index.js";

export const productionPlanningRepository = {
  findAll() {
    return db
      .select()
      .from(productionPlanningEntries)
      .where(sql`lower(${productionPlanningEntries.status}) = 'pending'`)
      .orderBy(desc(productionPlanningEntries.timestamp));
  },

  findById(id: string) {
    return db.query.productionPlanningEntries.findFirst({
      where: eq(productionPlanningEntries.id, id),
    });
  },

  async countAll() {
    const [result] = await db.select({ value: count() }).from(productionPlanningEntries);
    return result?.value ?? 0;
  },

  findPnSerials() {
    return db
      .select({ serialNo: productionPlanningEntries.serialNo })
      .from(productionPlanningEntries)
      .where(like(productionPlanningEntries.serialNo, "PN-%"));
  },

  async create(data: NewProductionPlanningEntry) {
    const [created] = await db.insert(productionPlanningEntries).values(data).returning();
    return created;
  },

  updateStatusBySerialDept(serialNo: string, dept: string | undefined, status: string) {
    const filters = [eq(productionPlanningEntries.serialNo, serialNo)];
    if (dept) filters.push(eq(productionPlanningEntries.dept, dept));

    return db
      .update(productionPlanningEntries)
      .set({ status })
      .where(and(...filters))
      .returning();
  },

  async getStats() {
    // Total entries in production_planning_entries
    const [totalRow] = await db
      .select({ value: count() })
      .from(productionPlanningEntries);
    const totalOrders = totalRow?.value ?? 0;

    // Pending: entries still in 'pending' status
    const [pendingRow] = await db
      .select({ value: count() })
      .from(productionPlanningEntries)
      .where(sql`lower(${productionPlanningEntries.status}) = 'pending'`);
    const pendingCount = pendingRow?.value ?? 0;

    // Complete: entries in 'complete' status
    const [completeRow] = await db
      .select({ value: count() })
      .from(productionPlanningEntries)
      .where(sql`lower(${productionPlanningEntries.status}) = 'complete'`);
    const completeCount = completeRow?.value ?? 0;

    // ── Issue Pending breakdown (from production_planning_entries) ───────────
    // issuePending = count of pending entries per dept
    // issuePendingWeight (blue) = sum of remaining_weight where pending → 0 when complete
    const issuePendingRows = await db
      .select({
        dept: productionPlanningEntries.dept,
        issuePending: sql<number>`cast(count(*) as int)`,
        issuePendingWeight: sql<string>`cast(coalesce(sum(${productionPlanningEntries.remainingWeight}), 0) as text)`,
      })
      .from(productionPlanningEntries)
      .where(sql`lower(${productionPlanningEntries.status}) = 'pending'`)
      .groupBy(productionPlanningEntries.dept);

    // ── Return Pending breakdown (from department_issue_entries LEFT JOIN receipts) ─
    // returnPending = count of dept issues that have NO receipt yet (not returned)
    // returnPendingWeight (orange) = sum of issue_weight for unreturned issues → 0 when receipt done
    const returnPendingRows = await db
      .select({
        dept: departmentIssueEntries.dept,
        returnPending: sql<number>`cast(count(*) as int)`,
        returnPendingWeight: sql<string>`cast(coalesce(sum(${departmentIssueEntries.issueWeight}), 0) as text)`,
      })
      .from(departmentIssueEntries)
      .leftJoin(
        departmentReceiptEntries,
        eq(departmentIssueEntries.issueNo, departmentReceiptEntries.issueNo)
      )
      .where(sql`${departmentReceiptEntries.issueNo} is null`) // no receipt = not returned yet
      .groupBy(departmentIssueEntries.dept);

    // Merge both sets into unified dept breakdown
    const allDepts = Array.from(
      new Set([
        ...issuePendingRows.map(r => r.dept),
        ...returnPendingRows.map(r => r.dept),
      ])
    ).filter(d => d && d.trim() !== "");

    const deptBreakdown = allDepts.map(dept => {
      const ip = issuePendingRows.find(r => r.dept === dept);
      const rp = returnPendingRows.find(r => r.dept === dept);
      return {
        dept,
        issuePending: Number(ip?.issuePending) || 0,
        issuePendingWeight: parseFloat(ip?.issuePendingWeight ?? "0") || 0,
        returnPending: Number(rp?.returnPending) || 0,
        returnPendingWeight: parseFloat(rp?.returnPendingWeight ?? "0") || 0,
      };
    });

    return { totalOrders, pendingCount, completeCount, deptBreakdown };
  },

  async getStockBasedSummary() {
    // Low Stock card available stock for Taar / Chain / KDM:
    //   - Planning only (no issue yet)              → 0   (don't count)
    //   - Department Issued, no receipt yet          → issue_weight (in karigar's hands)
    //   - Department Receipt (CompleteReturn)        → finished_net (returned finished goods)
    const rows = await db.execute(sql`
      SELECT
        dept,
        "meltingType",
        SUM(stock)::text AS "remainingWeight"
      FROM (

        -- Stage 1: Issued to karigar but NOT yet returned (receipt exists = complete)
        SELECT
          di.dept,
          pp.melting_type AS "meltingType",
          COALESCE(di.issue_weight, 0) AS stock
        FROM department_issue_entries di
        JOIN production_planning_entries pp ON di.serial_no = pp.serial_no
        WHERE UPPER(pp.order_no) = 'STOCK-BASED'
          AND di.dept IS NOT NULL AND di.dept <> ''
          AND NOT EXISTS (
            SELECT 1 FROM department_receipt_entries dr
            WHERE dr.issue_no = di.issue_no
          )

        UNION ALL

        -- Stage 2: Receipt received → finished_net is now available stock
        SELECT
          di.dept,
          pp.melting_type AS "meltingType",
          COALESCE(dr.finished_net, 0) AS stock
        FROM department_receipt_entries dr
        JOIN department_issue_entries   di ON dr.issue_no  = di.issue_no
        JOIN production_planning_entries pp ON di.serial_no = pp.serial_no
        WHERE UPPER(pp.order_no) = 'STOCK-BASED'
          AND di.dept IS NOT NULL AND di.dept <> ''

      ) combined
      GROUP BY dept, "meltingType"
    `);

    return (rows.rows as Array<{ dept: string; meltingType: string; remainingWeight: string }>)
      .filter(r => r.dept && r.dept.trim() !== "")
      .map(r => ({
        dept: r.dept,
        meltingType: r.meltingType,
        remainingWeight: parseFloat(r.remainingWeight) || 0,
      }));
  },
};


