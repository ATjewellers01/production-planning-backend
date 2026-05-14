import { decimal, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";
import { karigarIssueEntries } from "./karigar-issue-entries.js";

export const karigarReceiptEntries = pgTable(
  "karigar_receipt_entries",
  {
    id,

    issueNo: text("issue_no")
      .notNull()
      .references(() => karigarIssueEntries.issueNo, { onDelete: "cascade" }),

    delay: text("delay").notNull().default("0"),
    voucherNumber: text("voucher_number").notNull(),
    pcs: integer("pcs").notNull().default(0),
    ghatJamaWeight: decimal("ghat_jama_weight", { precision: 12, scale: 3 }).notNull().default("0"),
    ghatMelting: decimal("ghat_melting", { precision: 12, scale: 3 }).notNull().default("0"),
    ghatWastage: decimal("ghat_wastage", { precision: 12, scale: 3 }).notNull().default("0"),
    totalWeight: decimal("total_weight", { precision: 12, scale: 3 }).notNull().default("0"),

    ...timestamps,
  },
  (table) => ({
    voucherNumberIdx: uniqueIndex("karigar_receipt_entries_voucher_number_unique").on(table.voucherNumber),
  }),
);

export type KarigarReceiptEntry = typeof karigarReceiptEntries.$inferSelect;
export type NewKarigarReceiptEntry = typeof karigarReceiptEntries.$inferInsert;
