import { count, desc, eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { type NewMetalStockEntry, metalStockEntries } from "../../db/schema/index.js";

export const metalStockRepository = {
  findAll() {
    return db.select().from(metalStockEntries).orderBy(desc(metalStockEntries.timestamp));
  },

  findById(id: string) {
    return db.query.metalStockEntries.findFirst({
      where: eq(metalStockEntries.id, id),
    });
  },

  async countAll() {
    const [result] = await db.select({ value: count() }).from(metalStockEntries);
    return result?.value ?? 0;
  },

  async create(data: NewMetalStockEntry) {
    const [created] = await db.insert(metalStockEntries).values(data).returning();
    return created;
  },
};
