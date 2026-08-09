import type { ComparisonBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import Reveal from "@/components/ui/Reveal";
import styles from "./ComparisonBlock.module.css";

export default function ComparisonBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />

        <Reveal className={styles.grid} stagger={0.06}>
          {block.clusters.map((cluster) => (
            <article key={cluster.title} data-reveal className={styles.cluster}>
              <h3 className={styles.title}>{cluster.title}</h3>
              <dl className={styles.rows}>
                {cluster.rows.map((row) => (
                  <div key={row.label} className={styles.row}>
                    <dt className={styles.label}>{row.label}</dt>
                    <dd className={styles.value}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
