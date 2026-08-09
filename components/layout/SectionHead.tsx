import Eyebrow from "@/components/ui/Eyebrow";
import styles from "./SectionHead.module.css";

type Props = { eyebrow?: string; heading: string; body?: string };

export default function SectionHead({ eyebrow, heading, body }: Props) {
  return (
    <div className={styles.head}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className={styles.heading}>{heading}</h2>
      {body ? <p className={styles.body}>{body}</p> : null}
    </div>
  );
}
