import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./db/client.js";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`API server running on http://localhost:${env.PORT}${env.API_PREFIX}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received. Closing server...`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
