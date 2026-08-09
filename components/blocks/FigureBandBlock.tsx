import type { FigureBandBlock as Block } from "@/lib/types";
import FigureDisplay from "@/components/ui/FigureDisplay";
import styles from "./FigureBandBlock.module.css";

export default function FigureBandBlock({ block }: { block: Block }) {
  return (
    <section className={`${styles.band} ${styles[block.tone]}`}>
      <div className={`shell ${styles.grid}`}>
        {block.figures.map((figure) => (
          <FigureDisplay
            key={figure.label}
            figure={figure}
            tone={block.tone}
            animate
          />
        ))}
      </div>
    </section>
  );
}
