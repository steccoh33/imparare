/**
 * Home placeholder de la Fase 0. Sin lógica de negocio: solo confirma que
 * el esqueleto (routing, layout, Tailwind, fuentes) renderiza.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm font-mono uppercase tracking-widest text-muted">
        Fase 0 · esqueleto
      </p>
      <h1 className="text-4xl font-semibold text-foreground">imparando</h1>
      <p className="text-lg text-muted">
        Plataforma de aprendizaje de italiano. Escribí textos, una IA los
        corrige y los puntúa según los estándares CEFR (A1–C2).
      </p>
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
          Next.js
        </span>
        <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
          Drizzle + Supabase
        </span>
        <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">
          Vitest + Playwright
        </span>
      </div>
    </main>
  );
}
