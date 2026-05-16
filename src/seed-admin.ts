import bcrypt from "bcryptjs";
import { db } from "./db/client.js";
import { users } from "./db/schema/users.js";

async function seedAdmin() {
  const passwordHash = await bcrypt.hash("vikas@123", 10);

  await db.insert(users).values({
    userId: "vikas",
    name: "vikas",
    email: "vikas@atplus.com",
    passwordHash,
    role: "Admin",
    pageAccess: "All",
  }).onConflictDoUpdate({
    target: users.userId,
    set: {
      name: "vikas",
      email: "vikas@atplus.com",
      passwordHash,
      role: "Admin",
      pageAccess: "All",
      updatedAt: new Date(),
    },
  });

  console.log("Admin user ready: userId=vikas, password=vikas@123");
  process.exit(0);
}

seedAdmin().catch((err) => { console.error(err); process.exit(1); });
