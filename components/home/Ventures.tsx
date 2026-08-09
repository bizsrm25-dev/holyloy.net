"use client";

import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { sectorLabel } from "@/lib/sectors";
import ImageSlot from "@/components/ui/ImageSlot";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { useHorizontalPan } from "@/components/gsap/useHorizontalPan";
import { VENTURES } from "@/lib/home";
import styles from "./Ventures.module.css";

export default function Ventures() {
  const { wrap, track } = useHorizontalPan();

  return (
    <section ref={wrap} className={styles.section}>
      <div className={`shell ${styles.head}`}>
        <div>
          <Eyebrow>{VENTURES.eyebrow}</Eyebrow>
          <h2 className={styles.heading}>{VENTURES.heading}</h2>
        </div>
        <Button href="/projects" variant="secondary">
          All ventures
        </Button>
      </div>

      <div ref={track} className={styles.track}>
        {PROJECTS.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={styles.card}
          >
            <ImageSlot
              src={project.cardImage}
              alt={project.name}
              ratio="3 / 4"
              sizes="320px"
            />
            <p className={styles.sector}>{sectorLabel(project.sector)}</p>
            <h3 className={styles.name}>{project.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
