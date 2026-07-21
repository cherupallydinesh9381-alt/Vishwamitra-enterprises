import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { COMPANY } from '../../utils/constants';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero section">
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.badge}>{COMPANY.name}</span>
          <h1>{COMPANY.tagline}</h1>
          <p>
            Best Deals on New Laptops, Refurbished Laptops and Professional Repair Services
          </p>
          <div className={styles.buttons}>
            <Link to="/products" className={`btn btnPrimary ${styles.btn}`}>
              <FaShoppingBag aria-hidden="true" /> Shop Now
            </Link>
            <Link to="/contact" className={`btn btnSecondary ${styles.btn}`}>
              <FaPhone aria-hidden="true" /> Contact Us
            </Link>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btnWhatsApp ${styles.btn}`}
            >
              <FaWhatsapp aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {COMPANY.stats.map((stat, i) => (
            <div key={stat.label} className={styles.stat}>
              <motion.span
                className={styles.statValue}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
              >
                {stat.value}
              </motion.span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
