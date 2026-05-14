import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { resolveDatabaseUrl } from "./src/config/database-url";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: resolveDatabaseUrl(process.env) ?? "",
  },
  strict: true,
  verbose: true,
});
