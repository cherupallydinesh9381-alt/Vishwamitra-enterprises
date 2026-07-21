import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO/SEO';
import { products } from '../data/products';
import styles from './Enquiry.module.css';


const INITIAL = { name: '', phone: '', email: '', product: '', message: '' };

export default function Enquiry() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [enquiries, setEnquiries] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      setForm((prev) => ({ ...prev, product: productParam }));
    }
  }, [searchParams]);

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
    if (!form.product.trim()) newErrors.product = 'Please select a product';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      setSubmitted(true);

      setForm(INITIAL);

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

      alert("Enquiry Submitted Successfully");
    } else {
      alert(data.message || "Submission Failed");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to connect to server");
  
};
    const newEnquiry = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleString('en-IN'),
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);
    setForm(INITIAL);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <SEO
        title="Enquiry"
        description="Submit a product enquiry at Vishwamitra Enterprises. Get the best laptop deals and expert advice."
        keywords="laptop enquiry, buy laptop Sangareddy, product enquiry"
      />

      <section className={styles.hero}>
        <div className="container">
          <h1>Product Enquiry</h1>
          <p>Interested in a laptop? Fill out the form and we&apos;ll get back to you</p>
        </div>
      </section>

      <section className={`section ${styles.main}`}>
        <div className="container">
          <div className={styles.grid}>
            <motion.form
              className={`glassCard ${styles.form}`}
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {submitted && (
                <div className={styles.success} role="alert">
                  Enquiry submitted successfully! We will contact you shortly.
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor="enquiry-name">Name *</label>
                <input
                  id="enquiry-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? styles.error : ''}
                />
                {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="enquiry-phone">Phone *</label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={errors.phone ? styles.error : ''}
                />
                {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="enquiry-email">Email *</label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? styles.error : ''}
                />
                {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="enquiry-product">Product Interested In *</label>
                <select
                  id="enquiry-product"
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                  className={errors.product ? styles.error : ''}
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.brand} - {p.name}
                    </option>
                  ))}
                  <option value="Other">Other / Not Listed</option>
                </select>
                {errors.product && <span className={styles.errorMsg}>{errors.product}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="enquiry-message">Message *</label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  className={errors.message ? styles.error : ''}
                />
                {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
              </div>

              <button type="submit" className={`btn btnPrimary ${styles.submit}`}>
                Submit Enquiry
              </button>
            </motion.form>

            {enquiries.length > 0 && (
              <motion.div
                className={`glassCard ${styles.history}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2>Your Enquiries</h2>
                <p className={styles.historyNote}>Stored locally in this session</p>
                <ul>
                  {enquiries.map((eq) => (
                    <li key={eq.id} className={styles.enquiryItem}>
                      <div className={styles.enquiryHeader}>
                        <strong>{eq.name}</strong>
                        <span>{eq.date}</span>
                      </div>
                      <p className={styles.productName}>{eq.product}</p>
                      <p className={styles.enquiryMsg}>{eq.message}</p>
                      <div className={styles.enquiryContact}>
                        <span>{eq.phone}</span>
                        <span>{eq.email}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
