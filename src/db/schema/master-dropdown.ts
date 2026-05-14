import { pgTable, text } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";

export const masterDropdown = pgTable("master_dropdown", {
  id,
  storageLocation: text("storage_location"),
  karigarName: text("karigar_name"),
  authorizedBy: text("authorized_by"),
  ...timestamps,
});

export type MasterDropdown = typeof masterDropdown.$inferSelect;
export type NewMasterDropdown = typeof masterDropdown.$inferInsert;
