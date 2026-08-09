import Image from "next/image";
import styles from "./ImageSlot.module.css";

type Props = {
  src: string;
  alt: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
};

export default function ImageSlot({
  src, alt, ratio = "16 / 9", priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: Props) {
  // Must be NEXT_PUBLIC_ so the value is inlined into the client bundle as well.
  // ImageSlot renders on both sides (ProjectGrid pulls ProjectCard, and therefore
  // this component, into the client tree), and a server-only var would be
  // undefined on the client and cause a hydration mismatch.
  const pending = process.env.NEXT_PUBLIC_HOLYLOY_IMAGES_PENDING === "1";

  return (
    <div className={styles.slot} style={{ aspectRatio: ratio }}>
      {pending ? (
        <span className={styles.placeholder}>{alt}</span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={styles.image}
        />
      )}
    </div>
  );
}
