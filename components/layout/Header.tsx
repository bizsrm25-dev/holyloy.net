import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/nav";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="HolyLoy home">
          <Image
            src="/logo.svg"
            alt="HolyLoy"
            width={146}
            height={70}
            priority
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
