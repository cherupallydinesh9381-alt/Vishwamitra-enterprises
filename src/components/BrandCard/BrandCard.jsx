import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './BrandCard.module.css';


export default function BrandCard({ brand, index = 0 }) {
  const Icon = brand.icon;

  return (
    <motion.div
      className={`glassCard ${styles.card}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.0 }}
      whileHover={{ y: -8 , scale: 1.02  }}
    >
      <Link to={`/products?brand=${encodeURIComponent(brand.name)}`} className={styles.link}>
        
<div className={styles.iconWrap}>
  <Icon
    aria-hidden="true"
    style={{
      color: brand.color,
      width: "90px",
      height: "90px",
    }}
  />
</div>
        <h3>{brand.name}</h3>
        <p>{brand.description}</p>
        <span className={styles.count}>{brand.productCount}+ Models</span>
      </Link>
    </motion.div>
    
  );
}
