import Button from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`shell ${styles.page}`}>
      <h1 className={styles.title}>That page does not exist.</h1>
      <p className={styles.body}>
        The link may be out of date, or the venture may have been renamed.
      </p>
      <div>
        <Button href="/projects" variant="secondary">
          See all ventures
        </Button>
      </div>
    </main>
  );
}
