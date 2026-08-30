import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    // Playwright maneja lo e2e; Vitest no debe tocar esa carpeta.
    exclude: ["node_modules/**", "tests/e2e/**", ".next/**"],
  },
});
