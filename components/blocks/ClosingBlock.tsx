import type { ClosingBlock as Block } from "@/lib/types";
import Button from "@/components/ui/Button";
import { PRIMARY_CTA } from "@/lib/nav";
import styles from "./ClosingBlock.module.css";

export default function ClosingBlock({ block }: { block: Block }) {
  return (
    <section className={styles.band}>
      <div className={`shell ${styles.inner}`}>
        <h2 className={styles.heading}>{block.heading}</h2>

        <ul className={styles.points}>
          {block.points.map((point) => (
            <li key={point} className={styles.point}>
              {point}
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
        </div>
      </div>
    </section>
  );
}
