import { describe, expect, it } from "vitest";
import { PROJECTS, filterProjects, getProject, getProjectSlugs } from "@/lib/projects";

describe("getProject", () => {
  it("resolves a known slug", () => {
    expect(getProject("smart-taxi")?.name).toBe("Smart Taxi");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProject("not-a-venture")).toBeUndefined();
  });
});

describe("getProjectSlugs", () => {
  it("returns one slug per project", () => {
    expect(getProjectSlugs()).toHaveLength(PROJECTS.length);
  });
});

describe("filterProjects", () => {
  it("returns everything for 'all'", () => {
    expect(filterProjects(PROJECTS, "all")).toHaveLength(PROJECTS.length);
  });

  it("narrows to a single sector", () => {
    const energy = filterProjects(PROJECTS, "energy");
    expect(energy.length).toBeGreaterThan(0);
    expect(energy.every((project) => project.sector === "energy")).toBe(true);
  });

  it("returns an empty array when no project matches", () => {
    const source = [PROJECTS[0]];
    const other = source[0].sector === "energy" ? "mobility" : "energy";
    expect(filterProjects(source, other)).toEqual([]);
  });
});
