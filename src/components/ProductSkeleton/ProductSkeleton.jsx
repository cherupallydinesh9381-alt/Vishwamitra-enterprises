import styles from './ProductSkeleton.module.css';

export default function ProductSkeleton({ count = 8 }) {
  return (
    <div className={styles.grid} aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.image} />
          <div className={styles.body}>
            <div className={`${styles.line} ${styles.title}`} />
            <div className={styles.line} />
            <div className={`${styles.line} ${styles.short}`} />
            <div className={styles.footer}>
              <div className={styles.line} />
              <div className={styles.btn} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
