import { count, desc } from "drizzle-orm";
import { db } from "../../db/client.js";
import { alloyConversionEntries, type NewAlloyConversionEntry } from "../../db/schema/index.js";

export const alloyConversionRepository = {
  findAll() {
    return db.select().from(alloyConversionEntries).orderBy(desc(alloyConversionEntries.timestamp));
  },

  async countAll() {
    const [result] = await db.select({ value: count() }).from(alloyConversionEntries);
    return result?.value ?? 0;
  },

  async create(data: NewAlloyConversionEntry) {
    const [created] = await db.insert(alloyConversionEntries).values(data).returning();
    return created;
  },
};
