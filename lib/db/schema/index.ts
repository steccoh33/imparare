/**
 * Barrel de todo el esquema de la base de datos.
 *
 * Todo acceso a datos pasa por Drizzle (regla de stack): nada de queries
 * sueltas ni `supabase-js .from()` con casts manuales.
 */
export * from "./health";
