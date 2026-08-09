import Link from "next/link";
import styles from "./Button.module.css";

type Props = {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export default function Button({ href, variant = "primary", children }: Props) {
  return (
    <Link href={href} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </Link>
  );
}
