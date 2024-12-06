// import type { Config } from 'drizzle-kit';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: '.env' });

// if (!process.env.DATABASE_URL) {
//   console.log('🔴 Cannot find database url');
// }

// export default {
//   schema: './src/lib/supabase/schema.ts',
//   out: './migrations',
//   driver: 'pg',
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL || '',
//   },
// } satisfies Config;

// "push": "drizzle-kit push:pg",
// "pull": "drizzle-kit introspect:pg ",
// "generate": "drizzle-kit generate:pg",
// "drop": "drizzle-kit drop",
// "check": "drizzle-kit check:pg",
// "up": "drizzle-kit up:pg",
// "migrate": "bun run src/lib/supabase/migration.ts"

import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL is not set in .env file");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/supabase/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
