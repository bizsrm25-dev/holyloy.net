import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <p className={styles.wordmark}>HolyLoy</p>

        <nav className={styles.links} aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a href="mailto:hello@holyloy.net">Contact</a>
        </nav>

        <p className={styles.legal}>HolyLoy. Loyalty is royalty.</p>
      </div>
    </footer>
  );
}
