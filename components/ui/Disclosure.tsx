"use client";

import styles from "./Disclosure.module.css";

type Props = { summary: string; children: React.ReactNode };

export default function Disclosure({ summary, children }: Props) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>{summary}</summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
