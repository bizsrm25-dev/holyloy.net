import type { PillarsBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import ImageSlot from "@/components/ui/ImageSlot";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import styles from "./PillarsBlock.module.css";

export default function PillarsBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />

        <Reveal className={styles.grid}>
          {block.items.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              className={[
                styles.cell,
                index === 0 ? styles.wide : "",
                item.image ? styles.hasImage : "",
              ].join(" ")}
            >
              {item.image ? (
                <ImageSlot
                  src={item.image}
                  alt={item.title}
                  ratio="16 / 10"
                  sizes="(max-width: 767px) 100vw, 40vw"
                />
              ) : (
                <span className={styles.icon}>
                  <Icon name={item.icon} size={28} />
                </span>
              )}
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
