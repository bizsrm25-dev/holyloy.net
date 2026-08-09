import type { Figure } from "@/lib/types";
import CountUp from "./CountUp";
import styles from "./FigureDisplay.module.css";

type Props = { figure: Figure; tone?: "dark" | "light"; animate?: boolean };

export default function FigureDisplay({
  figure, tone = "light", animate = false,
}: Props) {
  return (
    <div className={`${styles.figure} ${styles[tone]}`}>
      <p className={styles.value}>
        {animate ? <CountUp value={figure.value} /> : figure.value}
      </p>
      <p className={styles.label}>{figure.label}</p>
      {figure.note ? <p className={styles.note}>{figure.note}</p> : null}
    </div>
  );
}
