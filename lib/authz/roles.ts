/**
 * Roles del sistema. El modelo conceptual (ver AGENTS.md) define:
 *   - profiles.role: student | teacher | admin
 *
 * Este archivo solo define el tipo y un type-guard. Las reglas de
 * autorización (qué puede hacer cada rol, estado de cuenta, suscripción
 * vigente) llegan en fases posteriores y viven todas en este directorio
 * `lib/authz`, con tests unitarios (regla arquitectónica #2).
 */
export const ROLES = ["student", "teacher", "admin"] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return (
    typeof value === "string" && (ROLES as readonly string[]).includes(value)
  );
}
