import type { EconomicsBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import FigureDisplay from "@/components/ui/FigureDisplay";
import Disclosure from "@/components/ui/Disclosure";
import Reveal from "@/components/ui/Reveal";
import styles from "./EconomicsBlock.module.css";

export default function EconomicsBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />

        <Reveal className={styles.tiles}>
          {block.headline.map((figure) => (
            <div key={figure.label} data-reveal className={styles.tile}>
              <FigureDisplay figure={figure} animate />
            </div>
          ))}
        </Reveal>

        {block.detail.length > 0 ? (
          <div className={styles.detail}>
            <Disclosure summary="Full breakdown">
              <dl className={styles.rows}>
                {block.detail.map((row) => (
                  <div key={row.label} className={styles.row}>
                    <dt className={styles.label}>{row.label}</dt>
                    <dd className={styles.value}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Disclosure>
          </div>
        ) : null}
      </div>
    </section>
  );
}
