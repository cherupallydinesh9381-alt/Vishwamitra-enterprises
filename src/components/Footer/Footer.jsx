import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { COMPANY, NAV_LINKS } from '../../utils/constants';
import { FaLinkedin } from "react-icons/fa";
import { services } from '../../data/services';
import { brands } from '../../data/brands';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.col}>
              <img src="/logo.png" alt={COMPANY.name} className={styles.footerLogo} />
              <p className={styles.tagline}>{COMPANY.tagline}</p>
              <p className={styles.desc}>
                Your trusted partner for laptop sales, refurbished devices, and professional repair services in Sangareddy, Telangana.
              </p>
              <div className={styles.social}>
                <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href={COMPANY.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
                <a
                  href="https://www.linkedin.com/in/your-profile/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div className={styles.col}>
              <h4>Quick Links</h4>
              <ul>
                {NAV_LINKS.map(({ path, label }) => (
                  <li key={path}>
                    <Link to={path}>{label}</Link>
                  </li>
                ))}
                <li><Link to="/enquiry">Enquiry</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4>Services</h4>
              <ul>
                {services.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <Link to="/services">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <h4>Brands</h4>
              <ul>
                {brands.slice(0, 8).map((b) => (
                  <li key={b.id}>
                    <Link to="/brands">{b.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <h4>Contact Details</h4>
              <ul className={styles.contactList}>
                <li>
                  <FaPhone aria-hidden="true" />
                  <div>
                    {COMPANY.phones.map((phone) => (
                      <a key={phone} href={`tel:+91${phone}`}>+91 {phone}</a>
                    ))}
                  </div>
                </li>
                <li>
                  <FaEnvelope aria-hidden="true" />
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </li>
                <li>
                  <FaMapMarkerAlt aria-hidden="true" />
                  <span>{COMPANY.address.full}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {currentYear} {COMPANY.name}. All rights reserved.</p>
          <p>Owner: {COMPANY.owner}</p>
        </div>
      </div>
    </footer>
  );
}
