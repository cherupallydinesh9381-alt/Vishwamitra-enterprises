import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, index = 0 }) {
  const Icon = service.icon;

  return (
    <motion.article
      className={`glassCard ${styles.card}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.00 }}
      whileHover={{ y: -7 }}
    >
      <div className={styles.imageWrap}>
        <LazyImage src={service.image} alt={service.title} className={styles.image} />
        <div className={styles.iconBadge}>
          <Icon aria-hidden="true" />
        </div>
      </div>
      <div className={styles.body}>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <span className={styles.price}>{service.price}</span>
        <Link to="/contact" className={`btn btnPrimary ${styles.btn}`}>
          Get Service
        </Link>
      </div>
    </motion.article>
  );
}
