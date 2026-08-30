import "@testing-library/jest-dom/vitest";
import { loadEnvConfig } from "@next/env";

// Carga .env.local igual que Next.js. Si no existe (p. ej. en CI sin
// secretos), los tests que dependan de env se saltan solos.
try {
  loadEnvConfig(process.cwd());
} catch {
  // sin .env.local: ok
}
