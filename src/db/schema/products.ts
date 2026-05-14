import { decimal, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";

export const products = pgTable(
  "products",
  {
    id,
    sku: text("sku").notNull(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    purity: text("purity").notNull(),
    grossWeight: decimal("gross_weight", { precision: 12, scale: 3 }).notNull(),
    netWeight: decimal("net_weight", { precision: 12, scale: 3 }).notNull(),
    ...timestamps,
  },
  (table) => ({
    skuIdx: uniqueIndex("products_sku_unique").on(table.sku),
  }),
);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
