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
  const pending = process.env.HOLYLOY_IMAGES_PENDING === "1";

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
