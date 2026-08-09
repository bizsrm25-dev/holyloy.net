"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import type { Sector } from "@/lib/sectors";
import { filterProjects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import SectorFilter from "./SectorFilter";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Sector | "all">("all");

  const visible = useMemo(
    () => filterProjects(projects, active),
    [projects, active],
  );

  return (
    <>
      <SectorFilter active={active} onChange={setActive} projects={projects} />

      {visible.length === 0 ? (
        <p className={styles.empty}>
          No ventures in this sector yet. Choose another sector to keep looking.
        </p>
      ) : (
        <div className={styles.grid}>
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </>
  );
}
