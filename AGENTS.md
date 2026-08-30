# imparando — guía para agentes

## Next.js no es el que conocés

Este proyecto usa **Next.js 16** (App Router). Tiene breaking changes respecto
de versiones anteriores: APIs, convenciones y estructura de archivos pueden
diferir de lo que "sabés" de memoria. **Antes de escribir código de Next,
leé la guía relevante en `node_modules/next/dist/docs/`.** Prestá atención a
los avisos de deprecación.

Cambios notables ya en juego:

- El middleware ahora se llama **`proxy.ts`** (misma funcionalidad).
- Turbopack es el bundler por defecto.
- `next build` ya no corre el linter automáticamente: se corre por script.
- `typedRoutes` está activado.

## Qué es imparando

Plataforma de aprendizaje de italiano. Los alumnos escriben textos; una IA
los corrige y puntúa según los estándares **CEFR (A1–C2)**. Los docentes
gestionan clases y siguen a sus alumnos. Un admin supervisa todo.

## Stack (cerrado)

| Área            | Elección                                                             |
| --------------- | ------------------------------------------------------------------- |
| Framework       | Next.js 16, App Router, TypeScript strict                          |
| Estilos         | Tailwind CSS v4 (`@import "tailwindcss"`, sin `tailwind.config`)   |
| Base de datos   | PostgreSQL en Supabase — proyectos **dev y prod separados**        |
| Acceso a datos  | **Drizzle ORM + Drizzle Kit** para TODO. Nada de `supabase-js .from()` con casts |
| Auth            | Supabase Auth (solo autenticación, no acceso a datos)             |
| Autorización    | Capa propia en `lib/authz`, testeada con Vitest. RLS solo como red de seguridad amplia |
| IA              | Gemini vía REST directo (sin SDK), cascada de modelos gratis + uno de pago opcional |
| Cola async      | Inngest (o equivalente) para la corrección de IA                  |
| Pagos           | Stripe + webhooks                                                  |
| Emails          | Resend                                                             |
| Tests           | Vitest (unidad) + Playwright (e2e), desde el día uno              |
| Observabilidad  | Sentry (producción)                                               |
| Hosting         | Vercel Pro / Railway / Fly — sin cold starts                      |

## Reglas arquitectónicas obligatorias

Cada una evita un bug real de la v1. No son sugerencias.

1. **Layouts = Server Components siempre.** Ningún layout que envuelva páginas
   con `loading.tsx`/Suspense puede ser Client Component ni contener lógica de
   navegación activa (`usePathname`, estado de UI). La interactividad va solo
   en componentes hoja marcados `'use client'`.

2. **Autorización centralizada y evaluada una vez.** Toda regla (rol, estado
   de cuenta, suscripción vigente) vive en `lib/authz` con tests unitarios y
   se evalúa **una sola vez por request en `proxy.ts`**, que propaga el
   resultado a las páginas vía un header interno no falsificable por el
   cliente (`INTERNAL_AUTH_CONTEXT_HEADER`). Las **Server Actions** no las
   protege el proxy: siempre repiten su propio chequeo completo e
   independiente.

3. **Operaciones multi-fila = transacción.** Nada que toque dos filas
   relacionadas (cerrar una membership + crear la siguiente, etc.) se hace en
   dos llamadas sueltas. Si el segundo paso puede fallar, el primero no debe
   poder quedar aplicado solo.

4. **Acciones "en nombre de" otro usuario = función transaccional con
   privilegios elevados.** Docente moviendo/eliminando un alumno, admin
   reasignando, etc. Nunca dos llamadas sueltas con el cliente de sesión
   normal.

5. **Funciones de render capturan sus errores.** Toda función llamada
   directamente durante el render de una página (no desde un formulario)
   captura sus propios errores y devuelve un valor por defecto seguro. Nunca
   puede tirar abajo el render completo.

6. **Normalización de LLM = filtro determinístico en código.** Cualquier
   normalización de negocio sobre la salida de un modelo (ej. tratar
   `e'`/`è`/`é` como equivalentes) se aplica en código DESPUÉS de la
   respuesta, nunca solo como instrucción de prompt.

7. **Ningún secreto se commitea ni se loguea.** Solo variables de entorno.

## Modelo de datos conceptual

- `profiles` — rol, estado por rol, nivel CEFR objetivo, suscripción
- `classes` — dueño = docente
- `class_memberships` — alumno × docente × clase-opcional, con historial vía `left_at`
- `submissions` — texto del alumno + valutazione de la IA
- `personalized_exercises` — asignados por el docente
- `level_achievements` — logros de nivel

## Estructura de carpetas

```
app/                    Rutas (App Router). Solo routing + composición.
  layout.tsx            Root layout — Server Component.
  page.tsx              Home.
  error.tsx             Error boundary de segmento (client).
  global-error.tsx      Fallback de errores del root layout (client).
  not-found.tsx         404.
components/              Componentes de UI reutilizables.
  ui/                    Piezas presentacionales "tontas".
lib/
  env.ts                Validación de variables de entorno (zod).
  authz/                Capa de autorización. Toda regla + sus tests.
  db/                   Cliente Drizzle + esquema.
    index.ts            Instancia `db`.
    schema/             Definición de tablas (una por archivo + barrel).
  supabase/             Clientes de Supabase Auth (server / client).
drizzle/                SQL de migraciones generado por Drizzle Kit. No editar.
tests/e2e/              Specs de Playwright.
proxy.ts                (Fase 2) Refresh de sesión + resolución de authz.
drizzle.config.ts       Config de Drizzle Kit.
```

## Comandos

| Comando               | Qué hace                                             |
| --------------------- | -------------------------------------------------- |
| `npm run dev`         | Dev server (Turbopack).                            |
| `npm run build`       | Build de producción.                               |
| `npm run typecheck`   | `tsc --noEmit`.                                    |
| `npm run lint`        | ESLint.                                            |
| `npm run test`        | Vitest (unidad), una corrida.                      |
| `npm run test:e2e`    | Playwright (e2e).                                  |
| `npm run check`       | typecheck + lint + test.                           |
| `npm run db:generate` | Genera SQL de migración desde el esquema.          |
| `npm run db:migrate`  | Aplica migraciones pendientes a la base apuntada.  |
| `npm run db:studio`   | Drizzle Studio.                                    |

## Notas de la Fase 0

- `lib/db/schema/health.ts` (`health_check`) es una tabla de sondeo, **no**
  una entidad de negocio. Existe solo para probar el pipeline de migraciones.
  La Fase 1 la reemplaza por el modelo real.
