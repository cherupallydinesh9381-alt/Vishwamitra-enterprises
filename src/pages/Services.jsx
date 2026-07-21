import SEO from '../components/SEO/SEO';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { services } from '../data/services';
import styles from './Services.module.css';

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Professional laptop repair, SSD upgrade, screen replacement, data recovery and IT support services at Vishwamitra Enterprises."
        keywords="laptop repair, screen replacement, SSD upgrade, data recovery, virus removal, AMC support"
      />

      <section className={styles.hero}>
        <div className="container">
          <h1>Our Services</h1>
          <p>Expert laptop repair and IT support services you can trust</p>
        </div>
      </section>

      <section className={`section ${styles.main}`}>
        <div className="container">
          <div className={styles.grid}>
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
