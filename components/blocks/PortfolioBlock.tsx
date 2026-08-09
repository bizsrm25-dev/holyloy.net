import type { PortfolioBlock as Block } from "@/lib/types";
import SectionHead from "@/components/layout/SectionHead";
import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import styles from "./PortfolioBlock.module.css";

export default function PortfolioBlock({ block }: { block: Block }) {
  return (
    <section className={styles.section}>
      <div className="shell">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />

        <Reveal className={styles.grid} stagger={0.06}>
          {block.categories.map((category) => (
            <article key={category.title} data-reveal className={styles.card}>
              <ImageSlot
                src={category.image}
                alt={category.title}
                ratio="4 / 3"
                sizes="(max-width: 767px) 100vw, 30vw"
              />
              <h3 className={styles.title}>{category.title}</h3>
              <ul className={styles.items}>
                {category.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
