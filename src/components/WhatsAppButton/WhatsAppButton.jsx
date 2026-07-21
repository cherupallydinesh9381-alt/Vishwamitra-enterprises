import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { COMPANY } from '../../utils/constants';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${COMPANY.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp aria-hidden="true" />
      <span className={styles.tooltip}>Chat on WhatsApp</span>
    </motion.a>
  );
}
