import Button from "@/components/ui/Button";
import ImageSlot from "@/components/ui/ImageSlot";
import { HERO } from "@/lib/home";
import { PRIMARY_CTA } from "@/lib/nav";
import styles from "./Hero.module.css";

export default function Hero() {
  const lead = HERO.headline.replace(HERO.accent, "");

  return (
    <section className={styles.hero}>
      <div className={`shell ${styles.inner}`}>
        <div>
          <h1 className={styles.headline}>
            {lead}
            <span className={styles.accent}>{HERO.accent}</span>
          </h1>

          <p className={styles.subtext}>{HERO.subtext}</p>

          <div className={styles.actions}>
            <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
            <Button href="/#how-it-works" variant="secondary">
              How it works
            </Button>
          </div>
        </div>

        <ImageSlot
          src={HERO.image}
          alt="The HolyLoy ecosystem"
          ratio="4 / 3"
          priority
          sizes="(max-width: 899px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
