import { pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "./common.js";

export const users = pgTable(
  "users",
  {
    id,
    userId: text("user_id").notNull().default(""),
    name: text("name").notNull(),
    email: text("email").notNull().default(""),
    passwordHash: text("password_hash").notNull(),
    role: text("role").notNull().default("user"),
    phoneNumber: text("phone_number"),
    profileImage: text("profile_image"),
    pageAccess: text("page_access").notNull().default("All"),
    ...timestamps,
  },
  (table) => ({
    userIdIdx: uniqueIndex("users_user_id_unique").on(table.userId),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
