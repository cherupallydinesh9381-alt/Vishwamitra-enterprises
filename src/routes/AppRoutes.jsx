import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const Services = lazy(() => import('../pages/Services'));
const Brands = lazy(() => import('../pages/Brands'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Enquiry = lazy(() => import('../pages/Enquiry'));

function PageLoader() {
  return (
    <div className="pageLoader" role="status" aria-label="Loading page">
      <div className="spinner" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-primary)' }}>404</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
          Page not found
        </p>
        <a href="/" className="btn btnPrimary">Go Home</a>
      </div>
    </section>
  );
}
