import { describe, expect, it } from "vitest";
import {
  collectStrings, eyebrowBudget, findBannedDash, wordCount,
} from "../lib/contentRules";

describe("wordCount", () => {
  it("counts words separated by single spaces", () => {
    expect(wordCount("Loyalty is royalty")).toBe(3);
  });

  it("ignores leading, trailing and repeated whitespace", () => {
    expect(wordCount("  a   b  ")).toBe(2);
  });

  it("counts an empty string as zero", () => {
    expect(wordCount("   ")).toBe(0);
  });

  it("treats a hyphenated compound as one word", () => {
    expect(wordCount("end-to-end delivery")).toBe(2);
  });
});

describe("findBannedDash", () => {
  it("finds an em-dash", () => {
    expect(findBannedDash("Loyalty — royalty")).toBe("—");
  });

  it("finds an en-dash", () => {
    expect(findBannedDash("2021–2026")).toBe("–");
  });

  it("allows a plain hyphen", () => {
    expect(findBannedDash("end-to-end, 2021-2026")).toBeNull();
  });

  it("allows a minus sign in context", () => {
    expect(findBannedDash("-5 degrees")).toBeNull();
  });
});

describe("eyebrowBudget", () => {
  it("allows three eyebrows across eight sections", () => {
    expect(eyebrowBudget(8)).toBe(3);
  });

  it("allows one eyebrow across three sections", () => {
    expect(eyebrowBudget(3)).toBe(1);
  });

  it("allows one eyebrow for a single section", () => {
    expect(eyebrowBudget(1)).toBe(1);
  });

  it("allows none for zero sections", () => {
    expect(eyebrowBudget(0)).toBe(0);
  });
});

describe("collectStrings", () => {
  it("walks nested objects and arrays", () => {
    const data = { a: "one", b: [{ c: "two" }, "three"], d: 4, e: null };
    expect(collectStrings(data).sort()).toEqual(["one", "three", "two"]);
  });

  it("returns a bare string as a single entry", () => {
    expect(collectStrings("solo")).toEqual(["solo"]);
  });

  it("returns nothing for a structure with no strings", () => {
    expect(collectStrings({ a: 1, b: [2, 3] })).toEqual([]);
  });
});
