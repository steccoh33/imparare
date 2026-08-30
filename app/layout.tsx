import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "imparando — Impara l'italiano scrivendo",
  description:
    "Plataforma de aprendizaje de italiano: escribí textos, una IA los corrige y puntúa según los estándares CEFR (A1–C2).",
};

/**
 * Root layout. Server Component siempre (regla arquitectónica #1): sin
 * 'use client', sin hooks de navegación, sin estado de UI. La
 * interactividad va en componentes hoja marcados 'use client'.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
