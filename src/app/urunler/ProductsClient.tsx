'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import styles from './products.module.css';

export default function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const allProducts = useMemo(() => {
    return initialProducts.map(p => ({
      ...p,
      image: JSON.parse(p.images)[0],
      displayCategory: p.category?.name || p.categoryName || 'Genel',
      rating: 4.8, 
      reviews: Math.floor(Math.random() * 100) + 20
    }));
  }, [initialProducts]);

  const categories = ['Tümü', ...Array.from(new Set(allProducts.map(p => p.displayCategory)))];
  const sortOptions = [
    { value: 'newest', label: 'En Yeni' },
    { value: 'price-asc', label: 'Fiyat: Düşük → Yüksek' },
    { value: 'price-desc', label: 'Fiyat: Yüksek → Düşük' },
    { value: 'rating', label: 'En Yüksek Puan' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);


  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (selectedCategory !== 'Tümü') result = result.filter(p => p.displayCategory === selectedCategory);
    if (minPrice) result = result.filter(p => (p.salePrice ?? p.price) >= Number(minPrice));
    if (maxPrice) result = result.filter(p => (p.salePrice ?? p.price) <= Number(maxPrice));
    if (inStockOnly) result = result.filter(p => p.stock > 0 && p.isActive);
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case 'price-desc': result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
    return result;
  }, [selectedCategory, sortBy, minPrice, maxPrice, inStockOnly]);

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Tüm Ürünler</h1>
          <p className={styles.pageDesc}>Premium kahve dünyasını keşfedin — {allProducts.length} ürün</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Kategori</h3>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                  id={`filter-category-${cat}`}
                >
                  {cat}
                  <span className={styles.filterCount}>
                    {cat === 'Tümü' ? allProducts.length : allProducts.filter(p => p.displayCategory === cat).length}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Fiyat Aralığı (₺)</h3>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  className={`input ${styles.priceInput}`}
                  placeholder="Min"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  id="filter-price-min"
                />
                <span className={styles.priceSep}>—</span>
                <input
                  type="number"
                  className={`input ${styles.priceInput}`}
                  placeholder="Max"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  id="filter-price-max"
                />
              </div>
            </div>

            <div className={styles.filterSection}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  id="filter-in-stock"
                />
                <span>Yalnızca Stokta Olanlar</span>
              </label>
            </div>
          </aside>

          {/* Products */}
          <div className={styles.main}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <p className={styles.resultCount}><strong>{filtered.length}</strong> ürün bulundu</p>
              <div className={styles.sortWrap}>
                <label htmlFor="sort-select" className="sr-only">Sırala</label>
                <select
                  id="sort-select"
                  className={`input ${styles.sortSelect}`}
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className={styles.grid}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className={styles.empty}>
                <p>Bu kriterlere uygun ürün bulunamadı.</p>
                <button className="btn btn-ghost" onClick={() => { setSelectedCategory('Tümü'); setMinPrice(''); setMaxPrice(''); }}>
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
