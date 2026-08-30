import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// Carga .env.local / .env de la misma forma que Next.js.
loadEnvConfig(process.cwd());

const PLACEHOLDER =
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

// Las migraciones usan la conexión directa (5432), no el pooler.
// `db:generate` no necesita conexión real, por eso el placeholder.
const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? PLACEHOLDER;

if (url === PLACEHOLDER) {
  console.warn(
    "[drizzle] DIRECT_URL/DATABASE_URL no definidas: solo funcionará `db:generate`.",
  );
}

export default defineConfig({
  schema: "./lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
