import "dotenv/config";
import { z } from "zod";
import { resolveDatabaseUrl } from "./database-url.js";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  API_PREFIX: z.string().default("/api/v1"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(16).default("change_this_secret_in_production_min_32_chars"),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

const resolvedEnv = {
  ...process.env,
  DATABASE_URL: resolveDatabaseUrl(process.env),
};

export const env = envSchema.parse(resolvedEnv);
