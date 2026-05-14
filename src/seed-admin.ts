import bcrypt from "bcryptjs";
import { db } from "./db/client.js";
import { users } from "./db/schema/users.js";

async function seedAdmin() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await db.insert(users).values({
    userId: "admin",
    name: "Admin",
    email: "admin@atplus.com",
    passwordHash,
    role: "Admin",
    pageAccess: "All",
  }).onConflictDoNothing();

  console.log("Admin user created: userId=admin, password=admin123");
  process.exit(0);
}

seedAdmin().catch((err) => { console.error(err); process.exit(1); });
