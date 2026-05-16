import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { type NewUser, users } from "../../db/schema/index.js";
import type { UpdateUserInput } from "./user.validation.js";

const safeSelect = {
  id: users.id,
  userId: users.userId,
  name: users.name,
  email: users.email,
  role: users.role,
  phoneNumber: users.phoneNumber,
  profileImage: users.profileImage,
  pageAccess: users.pageAccess,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

export const userRepository = {
  findAll() {
    return db.select(safeSelect).from(users).orderBy(users.createdAt);
  },

  findById(id: string) {
    return db.query.users.findFirst({ where: eq(users.id, id) });
  },

  findByUserId(userId: string) {
    return db.query.users.findFirst({ where: eq(users.userId, userId) });
  },

  findByEmail(email: string) {
    return db.query.users.findFirst({ where: eq(users.email, email) });
  },

  async create(data: NewUser) {
    const [created] = await db.insert(users).values(data).returning();
    if (!created) return undefined;

    const { passwordHash: _p, ...safe } = created;
    return safe;
  },

  async update(id: string, data: Partial<NewUser>) {
    const [updated] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (!updated) return undefined;
    const { passwordHash: _p, ...safe } = updated;
    return safe;
  },

  async delete(id: string) {
    const [deleted] = await db.delete(users).where(eq(users.id, id)).returning();
    if (!deleted) return undefined;
    const { passwordHash: _p, ...safe } = deleted;
    return safe;
  },
};
