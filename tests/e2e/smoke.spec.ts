import { test, expect } from "@playwright/test";

test("la home carga sin errores de consola", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "imparando" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("una ruta inexistente devuelve 404", async ({ page }) => {
  const response = await page.goto("/ruta-que-no-existe");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Pagina non trovata" }),
  ).toBeVisible();
});
