import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import SEO from '../components/SEO/SEO';
import { COMPANY } from '../utils/constants';
import styles from './About.module.css';

const WHY_CHOOSE = [
  { title: 'Genuine Products', desc: '100% authentic laptops and original spare parts with proper warranty documentation.' },
  { title: 'Affordable Pricing', desc: 'Competitive prices on new and refurbished laptops without compromising quality.' },
  { title: 'Warranty Support', desc: 'Comprehensive warranty on products and services for your peace of mind.' },
  { title: 'Doorstep Service', desc: 'Convenient pickup and delivery for repairs across Sangareddy and nearby areas.' },
  { title: 'Expert Technicians', desc: 'Certified professionals with 10+ years of experience in laptop repair and sales.' },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description={`Learn about ${COMPANY.name} - your trusted partner for laptop sales and services in Sangareddy, Telangana.`}
        keywords="about Vishwamitra Enterprises, laptop shop Sangareddy, Srilaxmi P"
      />

      <section className={styles.hero}>
        <div className="container">
          <h1>About Us</h1>
          <p>{COMPANY.tagline}</p>
        </div>
      </section>

      <section className={`section ${styles.main}`}>
        <div className="container">
          <div className={styles.grid}>
            <motion.div
              className={`glassCard ${styles.card}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Our Mission</h2>
              <p>
                To provide affordable, high-quality laptops and reliable repair services to every customer,
                ensuring technology is accessible and dependable for work, education, and entertainment.
              </p>
            </motion.div>

            <motion.div
              className={`glassCard ${styles.card}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Our Vision</h2>
              <p>
                To become the most trusted laptop sales and service provider in Telangana,
                known for integrity, expertise, and exceptional customer satisfaction.
              </p>
            </motion.div>
          </div>

          <motion.div
            className={`glassCard ${styles.story}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Story</h2>
            <p>
              Founded by <strong>{COMPANY.owner}</strong>, {COMPANY.name} started with a simple goal —
              to help people find the right laptop at the right price and keep their devices running smoothly.
            </p>
            <p>
              With over 10 years of experience in the laptop industry, we have served more than 5,000 happy customers
              across Sangareddy and surrounding areas. From selling brand-new laptops to expertly refurbishing pre-owned
              devices and providing chip-level repairs, we have built a reputation for honesty and quality.
            </p>
            <p>
              Located at {COMPANY.address.line1}, {COMPANY.address.line2}, we welcome you to visit our store
              or reach out for doorstep service. Your trust is our greatest achievement.
            </p>
          </motion.div>

          <div className={styles.whySection}>
            <h2 className="sectionTitle">Why Choose Us</h2>
            <p className="sectionSubtitle">Reasons customers trust Vishwamitra Enterprises</p>
            <div className={styles.whyGrid}>
              {WHY_CHOOSE.map((item, i) => (
                <motion.div
                  key={item.title}
                  className={`glassCard ${styles.whyCard}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.00  }}
                  whileHover={{ y: -8 }}

                >
                  <FaCheckCircle className={styles.icon} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
