import type { NarrativeBlock as Block } from "@/lib/types";
import ImageSlot from "@/components/ui/ImageSlot";
import FigureDisplay from "@/components/ui/FigureDisplay";
import Reveal from "@/components/ui/Reveal";
import styles from "./NarrativeBlock.module.css";

export default function NarrativeBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <Reveal className={`shell ${styles.inner}`}>
        <div data-reveal>
          <h2 className={styles.heading}>{block.heading}</h2>
          <p className={styles.body}>{block.body}</p>
          {block.pull ? (
            <div className={styles.pull}>
              <FigureDisplay figure={block.pull} />
            </div>
          ) : null}
        </div>

        {block.image ? (
          <div data-reveal>
            <ImageSlot
              src={block.image}
              alt={block.heading}
              ratio="3 / 4"
              sizes="(max-width: 899px) 100vw, 45vw"
            />
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
