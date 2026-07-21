import { motion } from 'framer-motion';
import { FaStar, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';
import { formatPrice } from '../../data/products';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onView, index = 0 }) {
  const inStock = product.stock > 0;

  return (
    <motion.article
      className={`glassCard ${styles.card}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * -0.0 }}
      whileHover={{ y: -7 }}
    >
      <div className={styles.imageWrap}>
        <LazyImage src={product.image} alt={product.name} className={styles.image} />
        <span className={styles.brand}>{product.brand}</span>
        {!inStock && <span className={styles.outOfStock}>Out of Stock</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.specs}>
          <span>{product.processor.split(' ').slice(0, 3).join(' ')}</span>
          <span>{product.ram} RAM</span>
          <span>{product.storage}</span>
        </div>
        <div className={styles.footer}>
          <div>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <div className={styles.rating} aria-label={`Rating ${product.rating} out of 5`}>
              <FaStar aria-hidden="true" />
              <span>{product.rating}</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.viewBtn} onClick={() => onView?.(product)} aria-label={`View ${product.name}`}>
              <FaEye />
            </button>
            <Link
              to={`/enquiry?product=${encodeURIComponent(product.name)}`}
              className={`btn btnPrimary ${styles.enquiryBtn}`}
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
