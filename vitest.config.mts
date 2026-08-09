import { defineConfig } from "vitest/config";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./", import.meta.url));

/**
 * Next loads .env for dev and build. Vitest does not, so the suite would
 * otherwise run against a different configuration than the application and
 * report failures the real site does not have. Parse the same file here.
 */
function readDotEnv(path: string): Record<string, string> {
  if (!existsSync(path)) return {};

  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=");
        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
        return [key, value];
      })
      .filter(([key]) => key.length > 0),
  );
}

export default defineConfig({
  resolve: {
    alias: { "@": root },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    env: readDotEnv(`${root}.env`),
  },
});
