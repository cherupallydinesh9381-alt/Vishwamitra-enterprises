import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SEO from '../components/SEO/SEO';
import Hero from '../components/Hero/Hero';
import ProductCard from '../components/ProductCard/ProductCard';
import BrandCard from '../components/BrandCard/BrandCard';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { getFeaturedProducts } from '../data/products';
import { brands } from '../data/brands';
import { services } from '../data/services';
import styles from './Home.module.css';

const REVIEWS = [
  { name: 'Ravi Kumar', text: 'Excellent service! Got my Dell laptop repaired within a day. Genuine parts and fair pricing.', rating: 5 },
  { name: 'Priya Sharma', text: 'Bought a refurbished HP laptop — works like new. Very happy with the warranty support.', rating: 5 },
  { name: 'Mohammed Ali', text: 'Professional team. They upgraded my SSD and RAM. My laptop feels brand new now!', rating: 5 },
  { name: 'Sneha Reddy', text: 'Best laptop shop in Sangareddy. Trustworthy and knowledgeable staff. Highly recommended!', rating: 5 },
];

export default function Home() {
  const featuredProducts = getFeaturedProducts(8);
  const featuredBrands = brands.slice(0, 8);
  const featuredServices = services.slice(0, 6);

  return (
    <>
      <SEO
        title="Home"
        description="Vishwamitra Enterprises - Trusted laptop sales & services. New & refurbished laptops, repair, upgrades in Sangareddy, Telangana."
        keywords="laptop sales, laptop repair, refurbished laptops, Sangareddy, Telangana, Vishwamitra Enterprises"
      />
      <Hero />

      <section className={`section ${styles.brands}`} aria-labelledby="brands-heading">
        <div className="container">
          <h2 id="brands-heading" className="sectionTitle">Featured Brands</h2>
          <p className="sectionSubtitle">We deal in all major laptop brands with genuine products and warranty</p>
          <div className={styles.brandGrid}>
            {featuredBrands.map((brand, i) => (
              <BrandCard key={brand.id} brand={brand} index={i} />
            ))}
          </div>
          <div className={styles.centerBtn}>
            <Link to="/brands" className="btn btnOutline">View All Brands</Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.products}`} aria-labelledby="products-heading">
        <div className="container">
          <h2 id="products-heading" className="sectionTitle">Featured Products</h2>
          <p className="sectionSubtitle">Handpicked laptops with the best value for money</p>
          <div className={styles.productGrid}>
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className={styles.centerBtn}>
            <Link to="/products" className="btn btnPrimary">Browse All Products</Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.services}`} aria-labelledby="services-heading">
        <div className="container">
          <h2 id="services-heading" className="sectionTitle">Our Services</h2>
          <p className="sectionSubtitle">Professional laptop repair and IT support services</p>
          <div className={styles.serviceGrid}>
            {featuredServices.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className={styles.centerBtn}>
            <Link to="/services" className="btn btnSecondary">View All Services</Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.reviews}`} aria-labelledby="reviews-heading">
        <div className="container">
          <h2 id="reviews-heading" className="sectionTitle">Customer Reviews</h2>
          <p className="sectionSubtitle">What our customers say about us</p>
          <div className={styles.reviewGrid}>
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                className={`glassCard ${styles.reviewCard}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FaQuoteLeft className={styles.quote} aria-hidden="true" />
                <p>{review.text}</p>
                <div className={styles.reviewFooter}>
                  <strong>{review.name}</strong>
                  <div className={styles.stars} aria-label={`${review.rating} stars`}>
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <FaStar key={j} aria-hidden="true" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section gradientSection ${styles.cta}`} aria-labelledby="cta-heading">
        <div className="container">
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 id="cta-heading">Ready to Find Your Perfect Laptop?</h2>
            <p>Visit us today or contact us for the best deals on laptops and professional repair services.</p>
            <div className={styles.ctaButtons}>
              <Link to="/products" className="btn btnPrimary">Shop Now</Link>
              <Link to="/contact" className={`btn btnOutline ${styles.ctaOutline}`}>Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
