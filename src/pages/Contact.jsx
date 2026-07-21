import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO/SEO';
import ContactForm from '../components/ContactForm/ContactForm';
import { COMPANY } from '../utils/constants';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description={`Contact ${COMPANY.name} for laptop sales and repair. Call ${COMPANY.phones[0]} or visit us in Sangareddy, Telangana.`}
        keywords="contact Vishwamitra Enterprises, laptop shop Sangareddy phone number"
      />

      <section className={styles.hero}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out anytime!</p>
        </div>
      </section>

      <section className={`section ${styles.main}`}>
        <div className="container">
          <div className={styles.grid}>
            <div>
              <ContactForm />
            </div>

            <div className={styles.info}>
              <div className={`glassCard ${styles.card}`}>
                <h2>Get In Touch</h2>

                <div className={styles.detail}>
                  <FaPhone aria-hidden="true" />
                  <div>
                    <strong>Phone</strong>
                    {COMPANY.phones.map((phone) => (
                      <a key={phone} href={`tel:+91${phone}`}>+91 {phone}</a>
                    ))}
                  </div>
                </div>

                <div className={styles.detail}>
                  <FaEnvelope aria-hidden="true" />
                  <div>
                    <strong>Email</strong>
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                  </div>
                </div>

                <div className={styles.detail}>
                  <FaMapMarkerAlt aria-hidden="true" />
      <div>
        <div className={styles.detail}>

              <div>
                <strong>Address</strong>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=5-77/OF/203+Orchids+Flora+Apartment+Durga+Nagar+Kistareddypet+Ameenpur+Sangareddy+Telangana+502319"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {COMPANY.address.full}
                </a>
              </div>
            </div>
            </div>
                </div>
                <div className={styles.buttons}>
                  <a href={`tel:+91${COMPANY.phones[0]}`} className="btn btnPrimary">
                    <FaPhone /> Call Now
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btnWhatsApp"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="btn btnSecondary">
                    <FaEnvelope /> Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.map}>
            <h2>Find Us on Map</h2>
            <div className={styles.mapWrap}>
              <iframe
                title="Vishwamitra Enterprises Location"
                src="https://maps.google.com/maps?q=Kistareddypet+Ameenpur+Sangareddy+Telangana&t=&z=15&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
