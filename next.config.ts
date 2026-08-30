import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  // Hay un package-lock.json suelto en el home del usuario; fijamos la raíz
  // del workspace acá para que Turbopack no la infiera mal.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
