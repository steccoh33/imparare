# imparando

Plataforma de aprendizaje de italiano. Los alumnos escriben textos; una IA los
corrige y puntúa según los estándares **CEFR (A1–C2)**. Los docentes gestionan
clases y siguen a sus alumnos; un admin supervisa todo.

Estado: **Fase 0** — esqueleto y configuración. Sin features de negocio todavía.

## Requisitos

- Node.js ≥ 22
- Una cuenta de Supabase (para las fases con base de datos)

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completá los valores (ver más abajo)
npm run dev                  # http://localhost:3000
```

## Variables de entorno

Todo se configura por `.env.local` (nunca se commitea). Ver `.env.example`
para la lista completa. Hay **dos entornos de base de datos separados**:

| Entorno     | Proyecto Supabase   | Dónde viven las variables        |
| ----------- | ------------------- | -------------------------------- |
| desarrollo  | `imparando-dev`     | `.env.local` en tu máquina       |
| producción  | `imparando-prod`    | variables del host (Vercel, ...) |

Nunca apuntes tu `.env.local` local a la base de producción.

## Scripts

| Comando               | Qué hace                                            |
| --------------------- | ------------------------------------------------- |
| `npm run dev`         | Dev server (Turbopack).                           |
| `npm run build`       | Build de producción.                              |
| `npm run start`       | Sirve el build de producción.                     |
| `npm run typecheck`   | `tsc --noEmit`.                                   |
| `npm run lint`        | ESLint.                                           |
| `npm run test`        | Vitest (unidad).                                  |
| `npm run test:e2e`    | Playwright (e2e).                                 |
| `npm run check`       | typecheck + lint + test (lo mismo que corre CI).  |
| `npm run db:generate` | Genera SQL de migración desde el esquema Drizzle. |
| `npm run db:migrate`  | Aplica migraciones a la base apuntada por env.    |
| `npm run db:studio`   | Drizzle Studio.                                   |

## CI

`.github/workflows/ci.yml` corre en cada PR y en push a `main`:

- **verify**: type-check → lint → unit tests → build
- **e2e**: Playwright (Chromium) contra el build de producción

## Arquitectura

Ver [`AGENTS.md`](./AGENTS.md) para el stack completo, las 7 reglas
arquitectónicas obligatorias y el modelo de datos conceptual.
