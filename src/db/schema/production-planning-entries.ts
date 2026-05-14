import { decimal, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";

export const productionPlanningEntries = pgTable(
  "production_planning_entries",
  {
    id,
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
    serialNo: text("serial_no").notNull(),
    orderNo: text("order_no").notNull(),
    meltingType: text("melting_type").notNull(),
    karigarName: text("karigar_name").default(""),
    category: text("category").default(""),
    designCode: text("design_code").default(""),
    totalWeight: decimal("total_weight", { precision: 12, scale: 3 }).notNull(),
    customer: text("customer").default(""),
    dept: text("dept").notNull(),
    plannedWeight: decimal("planned_weight", { precision: 12, scale: 3 }).notNull(),
    wastagePercent: decimal("wastage_percent", { precision: 5, scale: 2 }).default("0.00"),
    planned: timestamp("planned", { withTimezone: true }).notNull().defaultNow(),
    issueTimestamp: timestamp("issue_timestamp", { withTimezone: true }),
    issueRef: text("issue_ref").default(""),
    issueWeight: decimal("issue_weight", { precision: 12, scale: 3 }).notNull().default("0.000"),
    remainingWeight: decimal("remaining_weight", { precision: 12, scale: 3 }).notNull(),
    status: text("status").notNull().default("pending"),
    ...timestamps,
  },
  (table) => ({
    serialNoIdx: uniqueIndex("production_planning_entries_serial_no_unique").on(table.serialNo),
  }),
);

export type ProductionPlanningEntry = typeof productionPlanningEntries.$inferSelect;
export type NewProductionPlanningEntry = typeof productionPlanningEntries.$inferInsert;
