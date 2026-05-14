import { timestamp, uuid } from "drizzle-orm/pg-core";

export const id = uuid("id").primaryKey().defaultRandom();

export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const productionPlanningColumns = [
  "Timestamp",
  "Serial No",
  "Order No",
  "Melting Type",
  "Karigar Name",
  "Category",
  "Design Code",
  "Total Weight (g)",
  "Customer",
  "Dept",
  "Planned (g)",
  "Wastage %",
  "Planned",
  "Issue Timestamp",
  "Issue Ref",
  "Issue Weight",
  "Remaining Weight",
] as const;
