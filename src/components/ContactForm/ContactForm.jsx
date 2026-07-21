import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';

const INITIAL = { name: '', phone: '', email: '', message: '' };

export default function ContactForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    onSubmit?.(form);
    setSubmitted(true);
    setForm(INITIAL);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.form
      className={`glassCard ${styles.form}`}
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {submitted && (
        <div className={styles.success} role="alert">
          Thank you! Your message has been sent successfully. We will contact you soon.
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="contact-name">Name *</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? styles.error : ''}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <span id="name-error" className={styles.errorMsg}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-phone">Phone *</label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          className={errors.phone ? styles.error : ''}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-email">Email *</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="Enter your mail id"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? styles.error : ''}
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={errors.message ? styles.error : ''}
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
      </div>

      <button type="submit" className={`btn btnPrimary ${styles.submit}`}>
        Send Message
      </button>
    </motion.form>
  );
}
