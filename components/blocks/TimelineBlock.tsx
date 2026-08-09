"use client";

import type { TimelineBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import { useDrawPath } from "@/components/gsap/useDrawPath";
import styles from "./TimelineBlock.module.css";

export default function TimelineBlock({ block }: { block: Block }) {
  const pathRef = useDrawPath();

  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />

        <div className={styles.track}>
          <svg
            className={styles.line}
            viewBox="0 0 2 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d="M1 0 V1000"
              stroke="var(--c-red)"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          <ol className={styles.phases}>
            {block.phases.map((phase) => (
              <li key={phase.title} className={styles.phase}>
                <p className={styles.horizon}>{phase.horizon}</p>
                <h3 className={styles.title}>{phase.title}</h3>
                <p className={styles.body}>{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
