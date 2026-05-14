import { decimal, integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { products } from "./products.js";
import { id, timestamps } from "./common.js";

export const productionOrderStatus = pgEnum("production_order_status", [
  "draft",
  "issued",
  "in_progress",
  "completed",
  "cancelled",
]);

export const productionOrders = pgTable("production_orders", {
  id,
  orderNumber: text("order_number").notNull().unique(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
  quantity: integer("quantity").notNull(),
  targetWeight: decimal("target_weight", { precision: 12, scale: 3 }).notNull(),
  status: productionOrderStatus("status").notNull().default("draft"),
  remarks: text("remarks"),
  ...timestamps,
});

export type ProductionOrder = typeof productionOrders.$inferSelect;
export type NewProductionOrder = typeof productionOrders.$inferInsert;
