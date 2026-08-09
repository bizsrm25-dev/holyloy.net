"use client";

import type { FlowBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import { useDrawPath } from "@/components/gsap/useDrawPath";
import styles from "./FlowBlock.module.css";

export default function FlowBlock({ block }: { block: Block }) {
  const pathRef = useDrawPath();

  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />

        <svg
          className={styles.line}
          viewBox="0 0 1000 2"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M0 1 H1000"
            stroke="var(--c-red)"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <ol className={styles.steps}>
          {block.steps.map((step) => (
            <li key={step.label} className={styles.step}>
              <h3 className={styles.label}>{step.label}</h3>
              <p className={styles.body}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
