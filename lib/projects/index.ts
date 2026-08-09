import type { Project } from "@/lib/types";
import type { Sector } from "@/lib/sectors";

import lithiumBattery from "./lithium-battery";
import solarEnergy from "./solar-energy";
import cementPlant from "./cement-plant";
import civilEngineering from "./civil-engineering";
import safetyFootwear from "./safety-footwear";
import foodTrade from "./food-trade";

export const PROJECTS: Project[] = [
  lithiumBattery,
  solarEnergy,
  cementPlant,
  civilEngineering,
  safetyFootwear,
  foodTrade,
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}

export function filterProjects(
  projects: Project[],
  sector: Sector | "all",
): Project[] {
  return sector === "all"
    ? projects
    : projects.filter((project) => project.sector === sector);
}
