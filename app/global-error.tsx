"use client";

/**
 * Fallback para errores que ocurren en el root layout. Reemplaza al
 * <html>/<body>, por eso los declara. En fases posteriores acá se
 * engancha el reporte a Sentry.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="it">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1>Errore critico</h1>
        <p>{error.digest ? `Ref: ${error.digest}` : "Error inesperado."}</p>
        <button type="button" onClick={reset}>
          Reintentar
        </button>
      </body>
    </html>
  );
}
