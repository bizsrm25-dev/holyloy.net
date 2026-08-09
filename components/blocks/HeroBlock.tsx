import type { HeroBlock as Block } from "@/lib/types";
import ImageSlot from "@/components/ui/ImageSlot";
import FigureDisplay from "@/components/ui/FigureDisplay";
import styles from "./HeroBlock.module.css";

export default function HeroBlock({ block }: { block: Block }) {
  return (
    <section className={styles.hero}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.tagline}>{block.tagline}</h1>
          <p className={styles.thesis}>{block.thesis}</p>
        </div>
        <div className={styles.media}>
          <ImageSlot
            src={block.image}
            alt={block.tagline}
            ratio="4 / 3"
            priority
            sizes="(max-width: 899px) 100vw, 55vw"
          />
        </div>
      </div>

      <div className={`shell ${styles.facts}`}>
        {block.facts.map((fact) => (
          <FigureDisplay key={fact.label} figure={fact} />
        ))}
      </div>
    </section>
  );
}
