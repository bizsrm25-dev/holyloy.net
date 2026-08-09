import Link from "next/link";
import type { Project } from "@/lib/types";
import { sectorLabel } from "@/lib/sectors";
import ImageSlot from "@/components/ui/ImageSlot";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <Link href={`/projects/${project.slug}`} className={styles.link}>
        <ImageSlot
          src={project.cardImage}
          alt={project.name}
          ratio="4 / 3"
          sizes="(max-width: 767px) 100vw, 33vw"
        />
        <p className={styles.sector}>{sectorLabel(project.sector)}</p>
        <h2 className={styles.name}>{project.name}</h2>
        <p className={styles.thesis}>{project.thesis}</p>
        <dl className={styles.figures}>
          {project.cardFigures.map((figure) => (
            <div key={figure.label}>
              <dt className={styles.value}>{figure.value}</dt>
              <dd className={styles.label}>{figure.label}</dd>
            </div>
          ))}
        </dl>
      </Link>
    </article>
  );
}
