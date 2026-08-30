"use client";

/**
 * Error boundary de segmento. Es Client Component por requerimiento de
 * Next.js (error.tsx siempre lleva 'use client'). Es una hoja: no envuelve
 * páginas ni contiene navegación.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex max-w-md flex-1 flex-col justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        Qualcosa è andato storto
      </h1>
      <p className="text-sm text-muted">
        {error.digest ? `Ref: ${error.digest}` : "Error inesperado."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mx-auto rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Reintentar
      </button>
    </main>
  );
}
