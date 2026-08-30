import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { serverEnv } from "@/lib/env";
import * as schema from "./schema";

/**
 * Cliente Drizzle para el runtime de la app.
 *
 * Usa el pooler de transacciones de Supabase, por eso `prepare: false`
 * (pgbouncer en modo transacción no soporta prepared statements).
 *
 * En desarrollo se cachea la conexión en `globalThis` para no abrir una
 * nueva en cada recarga del módulo (HMR).
 */
const globalForDb = globalThis as unknown as {
  __imparandoSql__?: ReturnType<typeof postgres>;
};

const sql =
  globalForDb.__imparandoSql__ ??
  postgres(serverEnv().DATABASE_URL, { prepare: false });

if (serverEnv().NODE_ENV !== "production") {
  globalForDb.__imparandoSql__ = sql;
}

export const db = drizzle(sql, { schema });
export { schema };
