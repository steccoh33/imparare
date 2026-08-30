import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { clientEnv } from "@/lib/env";

/**
 * Cliente Supabase para Server Components / Server Actions / Route Handlers.
 * Se crea uno nuevo por request — nunca se comparte entre requests.
 *
 * Se usa SOLO para autenticación (leer la sesión del usuario). Todo acceso
 * a datos de negocio va por Drizzle (`@/lib/db`).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Llamado desde un Server Component (no puede escribir cookies).
            // El refresh de sesión se hace en proxy.ts.
          }
        },
      },
    },
  );
}
