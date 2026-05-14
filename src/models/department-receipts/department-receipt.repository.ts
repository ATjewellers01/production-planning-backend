import { db } from "../../db/client.js";
import { departmentReceiptEntries, type NewDepartmentReceiptEntry } from "../../db/schema/index.js";
import { count, desc, sql } from "drizzle-orm";

export const departmentReceiptRepository = {
  async findAll() {
    return db.query.departmentReceiptEntries.findMany({
      with: { issue: true }, // Ensure 'issue' relation is defined in schema/relations.ts
      orderBy: [desc(departmentReceiptEntries.createdAt)],
    });
  },

  async countAll() {
    const [result] = await db
      .select({ value: count() })
      .from(departmentReceiptEntries);
    
    // Safety check for TypeScript
    return result?.value ?? 0;
  },

  async create(data: NewDepartmentReceiptEntry) {
    const [entry] = await db
      .insert(departmentReceiptEntries)
      .values(data)
      .returning();
      
    // Return entry, ensure it's not undefined
    if (!entry) {
      throw new Error("Failed to create department receipt entry");
    }
    
    return entry;
  },

  async getScrapByKarat() {
    // Scrap metal from ALL dept receipts (both PartlyReturn and CompleteReturn)
    // grouped by the issue's meltingType (22K / 20K / 18K)
    // This scrap gets added to the karat stock in Alloy Conversion page
    const rows = await db.execute(sql`
      SELECT
        di.melting_type   AS "meltingType",
        SUM(COALESCE(dr.scrap_metal, 0))::text AS "scrapWeight"
      FROM department_receipt_entries dr
      JOIN department_issue_entries di ON dr.issue_no = di.issue_no
      WHERE di.melting_type IS NOT NULL AND di.melting_type <> ''
      GROUP BY di.melting_type
    `);

    return (rows.rows as Array<{ meltingType: string; scrapWeight: string }>).map(r => ({
      meltingType: r.meltingType,
      scrapWeight: parseFloat(r.scrapWeight) || 0,
    }));
  },
};
