import { z } from "zod";

/**
 * Validación de variables de entorno.
 *
 * - `clientEnv`: solo las `NEXT_PUBLIC_*`. Se evalúa al importar (también en
 *   el bundle del cliente), por eso solo puede contener valores públicos.
 * - `serverEnv()`: secretos de servidor. Nunca se evalúa en el cliente; la
 *   guarda tira un error explícito si se llama desde el browser.
 *
 * Regla arquitectónica #7: ningún secreto se commitea ni se loguea. Este
 * módulo solo lee `process.env`.
 */

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const serverSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export type ClientEnv = z.infer<typeof clientSchema>;
export type ServerEnv = z.infer<typeof serverSchema>;

function format(error: z.ZodError): string {
  return error.issues
    .map((i) => `  - ${i.path.join(".") || "(raíz)"}: ${i.message}`)
    .join("\n");
}

export const clientEnv: ClientEnv = (() => {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  if (!parsed.success) {
    throw new Error(
      `Variables de entorno públicas inválidas:\n${format(parsed.error)}`,
    );
  }
  return parsed.data;
})();

let cached: ServerEnv | undefined;

export function serverEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error("serverEnv() no puede llamarse desde el cliente.");
  }
  if (!cached) {
    const parsed = serverSchema.safeParse(process.env);
    if (!parsed.success) {
      throw new Error(
        `Variables de entorno de servidor inválidas:\n${format(parsed.error)}`,
      );
    }
    cached = parsed.data;
  }
  return cached;
}
