import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { PROJECTS } from "@/lib/projects";
import { SECTORS } from "@/lib/sectors";
import {
  collectStrings, eyebrowBudget, findBannedDash, wordCount,
} from "@/lib/contentRules";
import * as home from "@/lib/home";

const publicDir = fileURLToPath(new URL("../public", import.meta.url));

function imagePaths(value: unknown): string[] {
  return collectStrings(value).filter((s) => s.startsWith("/images/"));
}

describe("project catalogue", () => {
  it("holds exactly twelve ventures", () => {
    expect(PROJECTS).toHaveLength(12);
  });

  it("has unique slugs", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("names every data file after its slug", () => {
    const dir = fileURLToPath(new URL("../lib/projects", import.meta.url));
    const files = readdirSync(dir)
      .filter((name) => name.endsWith(".ts") && name !== "index.ts")
      .map((name) => name.replace(/\.ts$/, ""))
      .sort();
    expect(files).toEqual(PROJECTS.map((p) => p.slug).sort());
  });

  it("uses only known sectors", () => {
    for (const project of PROJECTS) {
      expect(SECTORS).toContain(project.sector);
    }
  });

  it("opens every project with a hero block", () => {
    for (const project of PROJECTS) {
      expect(project.blocks[0]?.type, project.slug).toBe("hero");
    }
  });

  it("closes every project with a closing block", () => {
    for (const project of PROJECTS) {
      expect(project.blocks.at(-1)?.type, project.slug).toBe("closing");
    }
  });
});

describe("copy rules", () => {
  it("contains no em-dash or en-dash anywhere in project data", () => {
    for (const project of PROJECTS) {
      for (const text of collectStrings(project)) {
        expect(findBannedDash(text), `${project.slug}: ${text}`).toBeNull();
      }
    }
  });

  it("contains no em-dash or en-dash anywhere in homepage data", () => {
    for (const text of collectStrings(home)) {
      expect(findBannedDash(text), text).toBeNull();
    }
  });

  it("keeps every thesis to 25 words or fewer", () => {
    for (const project of PROJECTS) {
      expect(wordCount(project.thesis), project.slug).toBeLessThanOrEqual(25);
    }
  });

  it("keeps the hero subtext to 20 words or fewer", () => {
    expect(wordCount(home.HERO.subtext)).toBeLessThanOrEqual(20);
  });

  it("stays within the eyebrow budget on every project page", () => {
    for (const project of PROJECTS) {
      const used = project.blocks.filter(
        (block) => "eyebrow" in block && Boolean(block.eyebrow),
      ).length;
      expect(used, project.slug).toBeLessThanOrEqual(
        eyebrowBudget(project.blocks.length),
      );
    }
  });

  it("stays within the eyebrow budget on the homepage", () => {
    const HOMEPAGE_SECTIONS = 8;
    const used = [home.PILLARS.eyebrow, home.VENTURES.eyebrow].filter(Boolean).length;
    expect(used).toBeLessThanOrEqual(eyebrowBudget(HOMEPAGE_SECTIONS));
  });
});

describe("assets", () => {
  const pending = process.env.NEXT_PUBLIC_HOLYLOY_IMAGES_PENDING === "1";

  it.skipIf(pending)("resolves every referenced image", () => {
    const referenced = new Set([
      ...PROJECTS.flatMap(imagePaths),
      ...imagePaths(home),
    ]);
    const missing = [...referenced].filter(
      (path) => !existsSync(`${publicDir}${path}`),
    );
    expect(missing, `missing ${missing.length} images`).toEqual([]);
  });
});
