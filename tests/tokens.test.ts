import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../styles/tokens.css", import.meta.url), "utf8");

const REQUIRED = [
  "--c-red", "--c-red-press", "--c-red-wash",
  "--c-ink", "--c-graphite", "--c-muted",
  "--c-hairline", "--c-canvas", "--c-card", "--c-night",
  "--r-control", "--r-card",
  "--f-display", "--f-body", "--f-mono",
];

describe("tokens.css", () => {
  it("defines every required token", () => {
    for (const token of REQUIRED) {
      expect(css, `missing ${token}`).toContain(`${token}:`);
    }
  });

  it("redefines every colour token in the dark-mode block", () => {
    const dark = css.slice(css.indexOf("prefers-color-scheme: dark"));
    expect(dark.length).toBeGreaterThan(0);
    for (const token of REQUIRED.filter((t) => t.startsWith("--c-"))) {
      expect(dark, `dark mode missing ${token}`).toContain(`${token}:`);
    }
  });

  it("keeps the brand red identical in both modes", () => {
    const matches = [...css.matchAll(/--c-red:\s*([^;]+);/g)].map((m) => m[1].trim());
    expect(matches.length).toBe(2);
    expect(matches[0]).toBe(matches[1]);
  });
});
