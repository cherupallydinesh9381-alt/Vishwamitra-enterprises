import { motion } from 'framer-motion';
import { FaTimes, FaStar, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';
import { formatPrice } from '../../data/products';
import { COMPANY } from '../../utils/constants';
import styles from './ProductModal.module.css';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (${product.brand}) priced at ${formatPrice(product.price)}. Please share more details.`
  );

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <motion.div
        className={`glassCard ${styles.modal}`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>

        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <LazyImage src={product.image} alt={product.name} className={styles.image} />
          </div>

          <div className={styles.details}>
            <span className={styles.brand}>{product.brand}</span>
            <h2 id="product-modal-title">{product.name}</h2>
            <div className={styles.rating}>
              <FaStar aria-hidden="true" />
              <span>{product.rating} / 5</span>
              <span className={styles.stock}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            <p className={styles.price}>{formatPrice(product.price)}</p>

            <dl className={styles.specs}>
              <div><dt>Processor</dt><dd>{product.processor}</dd></div>
              <div><dt>RAM</dt><dd>{product.ram}</dd></div>
              <div><dt>Storage</dt><dd>{product.storage}</dd></div>
              <div><dt>Display</dt><dd>{product.display}</dd></div>
            </dl>

            <div className={styles.actions}>
              <Link
                to={`/enquiry?product=${encodeURIComponent(product.name)}`}
                className={`btn btnPrimary ${styles.btn}`}
                onClick={onClose}
              >
                Send Enquiry
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btnWhatsApp ${styles.btn}`}
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
