import { decimal, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";

export const alloyConversionEntries = pgTable(
  "alloy_conversion_entries",
  {
    id,
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
    serialNo: text("serial_no").notNull(),
    productionPlan: text("production_plan").notNull(),
    targetKarat: text("target_karat").notNull(),
    batchNumber: text("batch_number").notNull(),
    input24K: decimal("input_24k", { precision: 12, scale: 3 }).notNull(),
    purity: decimal("purity", { precision: 5, scale: 2 }).notNull(),
    expectedOutput: decimal("expected_output", { precision: 12, scale: 3 }).notNull(),
    actualOutput: decimal("actual_output", { precision: 12, scale: 3 }).notNull(),
    estimatedLoss: decimal("estimated_loss", { precision: 12, scale: 3 }).notNull(),
    ...timestamps,
  },
  (table) => ({
    serialNoIdx: uniqueIndex("alloy_conversion_entries_serial_no_unique").on(table.serialNo),
  }),
);

export type AlloyConversionEntry = typeof alloyConversionEntries.$inferSelect;
export type NewAlloyConversionEntry = typeof alloyConversionEntries.$inferInsert;
