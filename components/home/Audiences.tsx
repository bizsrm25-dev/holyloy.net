import ImageSlot from "@/components/ui/ImageSlot";
import SectionHead from "@/components/layout/SectionHead";
import { AUDIENCES } from "@/lib/home";
import styles from "./Audiences.module.css";

export default function Audiences() {
  return (
    <section id="audiences" className={styles.section}>
      <div className="shell">
        <SectionHead heading="One ecosystem, four ways to gain from it." />
      </div>

      <div className={`shell ${styles.track}`}>
        {AUDIENCES.map((audience) => (
          <article key={audience.title} className={styles.panel}>
            <ImageSlot
              src={audience.image}
              alt={audience.title}
              ratio="3 / 4"
              sizes="(max-width: 899px) 82vw, 24vw"
            />
            <h3 className={styles.title}>{audience.title}</h3>
            <p className={styles.body}>{audience.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
