import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../styles/tokens.css", import.meta.url), "utf8");

/** Reads a token value from either the light :root block or the dark-mode block. */
function token(name: string, mode: "light" | "dark"): string {
  const darkIndex = css.indexOf("prefers-color-scheme: dark");
  const scope = mode === "light" ? css.slice(0, darkIndex) : css.slice(darkIndex);
  const match = new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`).exec(scope);
  if (!match) {
    // Tokens that are deliberately constant are only declared in the light block.
    const fallback = new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`).exec(css);
    if (!fallback) throw new Error(`token ${name} not found for ${mode} mode`);
    return fallback[1];
  }
  return match[1];
}

function luminance(hex: string): number {
  const channels = (hex.replace("#", "").match(/../g) ?? []).map((pair) => {
    const value = parseInt(pair, 16) / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string): number {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

const AA = 4.5;

describe.each(["light", "dark"] as const)("WCAG AA contrast in %s mode", (mode) => {
  const t = (name: string) => token(name, mode);

  const pairs: [string, string, string][] = [
    ["primary CTA label on red fill", "--c-on-red", "--c-red"],
    ["CTA label on pressed red", "--c-on-red", "--c-red-press"],
    ["body text on canvas", "--c-graphite", "--c-canvas"],
    ["muted labels on canvas", "--c-muted", "--c-canvas"],
    ["muted labels on card", "--c-muted", "--c-card"],
    ["primary text on canvas", "--c-ink", "--c-canvas"],
    ["red eyebrow text on canvas", "--c-red-text", "--c-canvas"],
    ["red eyebrow text on card", "--c-red-text", "--c-card"],
    ["primary text on red wash", "--c-ink", "--c-red-wash"],
    ["muted text on red wash", "--c-muted", "--c-red-wash"],
    ["heading on the night band", "--c-on-night", "--c-night"],
    ["muted text on the night band", "--c-on-night-muted", "--c-night"],
  ];

  it.each(pairs)("%s clears AA", (_label, fg, bg) => {
    expect(contrast(t(fg), t(bg))).toBeGreaterThanOrEqual(AA);
  });

  it("keeps red fills at the exact brand value", () => {
    expect(t("--c-red")).toBe("#DC0000");
  });
});
