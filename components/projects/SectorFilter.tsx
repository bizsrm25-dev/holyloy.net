"use client";

import type { Project } from "@/lib/types";
import { SECTORS, sectorLabel, type Sector } from "@/lib/sectors";
import styles from "./SectorFilter.module.css";

type Props = {
  active: Sector | "all";
  onChange: (value: Sector | "all") => void;
  projects: Project[];
};

export default function SectorFilter({ active, onChange, projects }: Props) {
  const available = SECTORS.filter((sector) =>
    projects.some((project) => project.sector === sector),
  );

  return (
    <div className={styles.bar} role="group" aria-label="Filter ventures by sector">
      <button
        type="button"
        onClick={() => onChange("all")}
        aria-pressed={active === "all"}
        className={`${styles.chip} ${active === "all" ? styles.on : ""}`}
      >
        All
      </button>

      {available.map((sector) => (
        <button
          key={sector}
          type="button"
          onClick={() => onChange(sector)}
          aria-pressed={active === sector}
          className={`${styles.chip} ${active === sector ? styles.on : ""}`}
        >
          {sectorLabel(sector)}
        </button>
      ))}
    </div>
  );
}
