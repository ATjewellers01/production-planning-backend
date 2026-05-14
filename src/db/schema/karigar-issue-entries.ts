import { decimal, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";

export const karigarIssueEntries = pgTable(
  "karigar_issue_entries",
  {
    id,
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
    issueNo: text("issue_no").notNull(),
    orderNo: text("order_no").notNull(),
    totalWeight: decimal("total_weight", { precision: 12, scale: 3 }).notNull(),
    meltingType: text("melting_type").notNull(),
    karigarName: text("karigar_name").notNull(),
    expectedDelivery: text("expected_delivery").default(""),
    authorizedBy: text("authorized_by").notNull(),
    directMetal: decimal("direct_metal", { precision: 12, scale: 3 }).notNull().default("0"),
    die: decimal("die", { precision: 12, scale: 3 }).notNull().default("0"),
    chain: decimal("chain", { precision: 12, scale: 3 }).notNull().default("0"),
    taar: decimal("taar", { precision: 12, scale: 3 }).notNull().default("0"),
    kdm: decimal("kdm", { precision: 12, scale: 3 }).notNull().default("0"),
    planned: text("planned").default(""),
    ...timestamps,
  },
  (table) => ({
    issueNoIdx: uniqueIndex("karigar_issue_entries_issue_no_unique").on(table.issueNo),
  }),
);

export type KarigarIssueEntry = typeof karigarIssueEntries.$inferSelect;
export type NewKarigarIssueEntry = typeof karigarIssueEntries.$inferInsert;
