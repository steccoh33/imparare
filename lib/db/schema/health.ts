import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

/**
 * Tabla de sondeo de infraestructura. NO es una entidad de negocio: existe
 * solo para verificar de punta a punta que el pipeline de migraciones de
 * Drizzle Kit funciona (generate -> migrate -> query).
 *
 * La Fase 1 puede reemplazarla por el modelo de datos real.
 */
export const healthCheck = pgTable("health_check", {
  id: uuid("id").defaultRandom().primaryKey(),
  checkedAt: timestamp("checked_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
