import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import ProjectGrid from "@/components/projects/ProjectGrid";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Twelve ventures across energy, industry, trade, health, mobility and services in Saudi Arabia.",
};

export default function ProjectsPage() {
  return (
    <main className={`shell ${styles.page}`}>
      <header className={styles.head}>
        <h1 className={styles.title}>Twelve ventures.</h1>
        <p className={styles.intro}>
          A portfolio spanning energy, industry, trade, health, mobility and
          services, each built around a specific opening in the Saudi market.
        </p>
      </header>

      <ProjectGrid projects={PROJECTS} />
    </main>
  );
}
