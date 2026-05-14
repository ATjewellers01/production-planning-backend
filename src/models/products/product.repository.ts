import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { type NewProduct, products } from "../../db/schema/index.js";
import type { UpdateProductInput } from "./product.validation.js";

export const productRepository = {
  findAll() {
    return db.select().from(products).orderBy(products.createdAt);
  },

  findById(id: string) {
    return db.query.products.findFirst({
      where: eq(products.id, id),
    });
  },

  findBySku(sku: string) {
    return db.query.products.findFirst({
      where: eq(products.sku, sku),
    });
  },

  async create(data: NewProduct) {
    const [created] = await db.insert(products).values(data).returning();
    return created;
  },

  async update(id: string, data: UpdateProductInput) {
    const [updated] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    return updated;
  },

  async delete(id: string) {
    const [deleted] = await db.delete(products).where(eq(products.id, id)).returning();
    return deleted;
  },
};
