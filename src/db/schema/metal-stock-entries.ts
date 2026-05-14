import { decimal, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";

export const metalStockEntries = pgTable(
  "metal_stock_entries",
  {
    id,
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
    serialNo: text("serial_no").notNull(),
    customerName: text("customer_name").notNull(),
    invoiceNumber: text("invoice_number").notNull(),
    grossWeight: decimal("gross_weight", { precision: 12, scale: 3 }).notNull(),
    purity: decimal("purity", { precision: 5, scale: 2 }).notNull(),
    storageLocation: text("storage_location").notNull(),
    entryDate: timestamp("entry_date", { withTimezone: true }).notNull().defaultNow(),
    assayCertification: text("assay_certification").default(""),
    ...timestamps,
  },
  (table) => ({
    serialNoIdx: uniqueIndex("metal_stock_entries_serial_no_unique").on(table.serialNo),
  }),
);

export type MetalStockEntry = typeof metalStockEntries.$inferSelect;
export type NewMetalStockEntry = typeof metalStockEntries.$inferInsert;
