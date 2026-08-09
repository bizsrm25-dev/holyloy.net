"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/ui/Button";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/nav";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
      </button>

      {open ? (
        <div id="mobile-menu" className={styles.panel}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
        </div>
      ) : null}
    </>
  );
}
