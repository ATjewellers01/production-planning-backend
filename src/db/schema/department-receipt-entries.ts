import { decimal, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";
import { departmentIssueEntries } from "./department-issue-entries.js";

export const departmentReceiptEntries = pgTable(
  "department_receipt_entries",
  {
    id,

    issueNo: text("issue_no")
      .notNull()
      .references(() => departmentIssueEntries.issueNo, { onDelete: "cascade" }),

    receiptNo: text("receipt_no").notNull(),

    finishedNet: decimal("finished_net", { precision: 12, scale: 3 }).notNull().default("0"),
    scrapMetal: decimal("scrap_metal", { precision: 12, scale: 3 }).notNull().default("0"),
    dustWeight: decimal("dust_weight", { precision: 12, scale: 3 }).notNull().default("0"),
    metalLoss: decimal("metal_loss", { precision: 12, scale: 3 }).notNull().default("0"),
    returnType: text("return_type").notNull(),

    receivedBy: text("received_by").notNull(),
    remarks: text("remarks"),

    ...timestamps,
  },
  (table) => ({
    receiptNoIdx: uniqueIndex("department_receipt_entries_receipt_no_unique").on(table.receiptNo),
  }),
);

export type DepartmentReceiptEntry = typeof departmentReceiptEntries.$inferSelect;
export type NewDepartmentReceiptEntry = typeof departmentReceiptEntries.$inferInsert;
