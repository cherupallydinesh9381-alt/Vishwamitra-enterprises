import { motion } from 'framer-motion';
import SEO from '../components/SEO/SEO';
import BrandCard from '../components/BrandCard/BrandCard';
import { brands } from '../data/brands';
import styles from './Brands.module.css';

export default function Brands() {
  return (
    <>
      <SEO
        title="Brands"
        description="Shop laptops from Dell, HP, Lenovo, Acer, Asus, Apple, MSI, Samsung and more at Vishwamitra Enterprises."
        keywords="Dell laptops, HP laptops, Lenovo, Apple MacBook, Asus, Acer, MSI, Samsung laptops"
      />

      <section className={styles.hero}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Brands
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.0 }}
          >
            We partner with the world&apos;s leading laptop manufacturers
          </motion.p>
        </div>
      </section>

      <section className={`section ${styles.main}`}>
        <div className="container">
          <div className={styles.grid}>
            {brands.map((brand, i) => (
              <BrandCard key={brand.id} brand={brand} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
