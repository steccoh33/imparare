import { describe, expect, it } from "vitest";

import { isRole, ROLES } from "./roles";

describe("isRole", () => {
  it("acepta cada rol conocido", () => {
    for (const role of ROLES) {
      expect(isRole(role)).toBe(true);
    }
  });

  it("rechaza strings desconocidos", () => {
    expect(isRole("superadmin")).toBe(false);
    expect(isRole("")).toBe(false);
  });

  it("rechaza valores que no son string", () => {
    expect(isRole(null)).toBe(false);
    expect(isRole(undefined)).toBe(false);
    expect(isRole(42)).toBe(false);
    expect(isRole({ role: "admin" })).toBe(false);
  });
});
