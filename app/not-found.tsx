import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-1 flex-col justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        Pagina non trovata
      </h1>
      <Link href="/" className="text-sm text-primary underline">
        Torna alla home
      </Link>
    </main>
  );
}
