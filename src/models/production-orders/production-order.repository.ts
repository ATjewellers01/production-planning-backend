import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import {
  type NewProductionOrder,
  productionOrders,
} from "../../db/schema/index.js";
import type { UpdateProductionOrderInput } from "./production-order.validation.js";

export const productionOrderRepository = {
  findAll() {
    return db.query.productionOrders.findMany({
      with: {
        product: true,
      },
      orderBy: productionOrders.createdAt,
    });
  },

  findById(id: string) {
    return db.query.productionOrders.findFirst({
      where: eq(productionOrders.id, id),
      with: {
        product: true,
      },
    });
  },

  findByOrderNumber(orderNumber: string) {
    return db.query.productionOrders.findFirst({
      where: eq(productionOrders.orderNumber, orderNumber),
    });
  },

  async create(data: NewProductionOrder) {
    const [created] = await db.insert(productionOrders).values(data).returning();
    return created;
  },

  async update(id: string, data: UpdateProductionOrderInput) {
    const [updated] = await db
      .update(productionOrders)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(productionOrders.id, id))
      .returning();

    return updated;
  },

  async delete(id: string) {
    const [deleted] = await db.delete(productionOrders).where(eq(productionOrders.id, id)).returning();
    return deleted;
  },
};
