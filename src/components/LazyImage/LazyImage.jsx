import { useState } from 'react';
import styles from './LazyImage.module.css';

export default function LazyImage({ src, alt, className = '', ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {!loaded && !error && <div className={styles.skeleton} aria-hidden="true" />}
      <img
        src={error ? 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80' : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${styles.image} ${loaded ? styles.visible : ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        {...props}
      />
    </div>
  );
}
