import { db } from "../../db/client.js";
import { masterDropdown } from "../../db/schema/master-dropdown.js";
import { eq } from "drizzle-orm";

export const masterDropdownRepository = {
  findAll() {
    return db.select().from(masterDropdown).orderBy(masterDropdown.createdAt);
  },

  create(data: { storageLocation?: string; karigarName?: string; authorizedBy?: string }) {
    return db.insert(masterDropdown).values(data).returning();
  },

  update(id: string, data: { storageLocation?: string | null; karigarName?: string | null; authorizedBy?: string | null }) {
    return db.update(masterDropdown).set({ ...data, updatedAt: new Date() }).where(eq(masterDropdown.id, id)).returning();
  },

  delete(id: string) {
    return db.delete(masterDropdown).where(eq(masterDropdown.id, id)).returning();
  },
};
