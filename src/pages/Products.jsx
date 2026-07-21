import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import SEO from '../components/SEO/SEO';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductModal from '../components/ProductModal/ProductModal';
import ProductSkeleton from '../components/ProductSkeleton/ProductSkeleton';
import { products, getBrandsFromProducts } from '../data/products';
import { PRODUCTS_PER_PAGE } from '../utils/constants';
import styles from './Products.module.css';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState(searchParams.get('brand') || 'All');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const brands = useMemo(() => ['All', ...getBrandsFromProducts()], []);

  useEffect(() => {
    const brand = searchParams.get('brand');
    if (brand) setBrandFilter(brand);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [search, brandFilter, priceRange, sortBy, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, brandFilter, priceRange, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.processor.toLowerCase().includes(q)
      );
    }

    if (brandFilter !== 'All') {
      result = result.filter((p) => p.brand === brandFilter);
    }

    if (priceRange === 'under50k') result = result.filter((p) => p.price < 50000);
    else if (priceRange === '50k-1L') result = result.filter((p) => p.price >= 50000 && p.price < 100000);
    else if (priceRange === 'above1L') result = result.filter((p) => p.price >= 100000);

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, brandFilter, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <>
      <SEO
        title="Products"
        description="Browse 60+ new and refurbished laptops from Dell, HP, Lenovo, Apple, Asus and more at Vishwamitra Enterprises."
        keywords="laptops, buy laptop, refurbished laptop, Dell, HP, Lenovo, Apple MacBook"
      />

      <section className={styles.hero}>
        <div className="container">
          <h1>Our Products</h1>
          <p>Explore our wide range of new and refurbished laptops</p>
        </div>
      </section>

      <section className={`section ${styles.main}`}>
        <div className="container">
          <div className={`glassCard ${styles.filters}`}>
            <div className={styles.searchWrap}>
              <FaSearch aria-hidden="true" />
              <input
                type="search"
                placeholder="Search laptops by name, brand, processor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search products"
              />
            </div>

            <div className={styles.filterRow}>
              <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} aria-label="Filter by brand">
                {brands.map((b) => (
                  <option key={b} value={b}>{b === 'All' ? 'All Brands' : b}</option>
                ))}
              </select>

              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} aria-label="Filter by price">
                <option value="all">All Prices</option>
                <option value="under50k">Under ₹50,000</option>
                <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                <option value="above1L">Above ₹1,00,000</option>
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort products">
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: Highest</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>

          <p className={styles.resultCount}>
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>

          {loading ? (
            <ProductSkeleton count={PRODUCTS_PER_PAGE} />
          ) : paginatedProducts.length === 0 ? (
            <div className={styles.empty}>
              <p>No products found matching your criteria.</p>
              <button
                type="button"
                className="btn btnPrimary"
                onClick={() => {
                  setSearch('');
                  setBrandFilter('All');
                  setPriceRange('all');
                  setSortBy('default');
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {paginatedProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onView={setSelectedProduct}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Product pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={styles.pageBtn}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                  onClick={() => setCurrentPage(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={styles.pageBtn}
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
