import { describe, expect, it } from "vitest";
import { SECTORS, isSector, sectorLabel } from "../lib/sectors";

describe("sectors", () => {
  it("exposes exactly the six sectors from the spec", () => {
    expect([...SECTORS]).toEqual([
      "energy", "industry", "trade", "health", "mobility", "services",
    ]);
  });

  it("accepts a known sector", () => {
    expect(isSector("mobility")).toBe(true);
  });

  it("rejects an unknown sector", () => {
    expect(isSector("logistics")).toBe(false);
  });

  it("gives every sector a capitalised display label", () => {
    for (const sector of SECTORS) {
      const label = sectorLabel(sector);
      expect(label.length).toBeGreaterThan(0);
      expect(label[0]).toBe(label[0].toUpperCase());
    }
  });
});
