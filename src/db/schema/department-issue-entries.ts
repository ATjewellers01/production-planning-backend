import { decimal, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";
import { productionPlanningEntries } from "./production-planning-entries.js";

export const departmentIssueEntries = pgTable(
  "department_issue_entries",
  {
    id,
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
    issueNo: text("issue_no").notNull(),
    serialNo: text("serial_no")
      .notNull()
      .references(() => productionPlanningEntries.serialNo),
    orderNo: text("order_no").notNull(),
    issueWeight: decimal("issue_weight", { precision: 12, scale: 3 }).notNull(),
    karigarName: text("karigar_name").notNull(),
    authorizedBy: text("authorized_by").notNull(),
    plannedStatus: text("planned_status").notNull().default("pending"),
    dept: text("dept").notNull(),
    meltingType: text("melting_type").default(""),
    ...timestamps,
  },
  (table) => ({
    issueNoIdx: uniqueIndex("department_issue_entries_issue_no_unique").on(table.issueNo),
  }),
);

export type DepartmentIssueEntry = typeof departmentIssueEntries.$inferSelect;
export type NewDepartmentIssueEntry = typeof departmentIssueEntries.$inferInsert;
