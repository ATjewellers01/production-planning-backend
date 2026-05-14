import { count, desc } from "drizzle-orm";
import { db } from "../../db/client.js";
import { karigarIssueEntries, type NewKarigarIssueEntry } from "../../db/schema/index.js";

export const karigarIssueRepository = {
  findAll() {
    return db.select().from(karigarIssueEntries).orderBy(desc(karigarIssueEntries.timestamp));
  },

  async countAll() {
    const [result] = await db.select({ value: count() }).from(karigarIssueEntries);
    return result?.value ?? 0;
  },

  async create(data: NewKarigarIssueEntry) {
    const [created] = await db.insert(karigarIssueEntries).values(data).returning();
    return created;
  },
};
