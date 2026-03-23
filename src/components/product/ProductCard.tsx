'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface Product {
  id: string;
  sku?: string; // Added
  slug: string;
  name: string;
  price: number;
  salePrice: number | null;
  vatRate: number; // Added
  image: string | null;
  rating: number;
  reviews: number;
  badge: string | null;
  categoryName: string; // From DB
  isActive: boolean; // Added
}

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  return (
    <Link href={`/urunler/${product.slug}`} className={styles.card} id={`product-card-${product.id}`}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <div className={styles.imagePlaceholder}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
              loading="lazy"
            />
          ) : (
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="30" fill="rgba(200,151,58,0.1)"/>
              <path d="M20 38c2.5-6 7.5-10 10-10s7.5 4 10 10" stroke="#c8973a" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M30 28V18" stroke="#c8973a" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="30" cy="16" r="3" fill="#c8973a"/>
            </svg>
          )}
        </div>
        {product.badge && (
          <span className={`${styles.badge} ${product.badge === 'Yeni' ? styles.badgeNew : styles.badgeSale}`}>
            {product.badge}
          </span>
        )}
        {!product.isActive && (
           <span className={styles.badge} style={{ background: '#64748b', top: '40px' }}>Satışa Kapalı</span>
        )}
        <div className={styles.actions}>
          <button
            className={`${styles.cartBtn} ${added ? styles.added : ''}`}
            onClick={handleAddToCart}
            aria-label="Sepete ekle"
            id={`add-to-cart-${product.id}`}
            disabled={!product.isActive}
            style={!product.isActive ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {!product.isActive ? (
               <>Stokta Değil</>
            ) : added ? (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                Eklendi
              </>
            ) : (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3A1 1 0 006 17h12"/>
                </svg>
                Sepete Ekle
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <span className={styles.category}>{product.categoryName}</span>
           <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>{product.sku}</span>
        </div>
        <h3 className={styles.name}>{product.name}</h3>

        {/* Rating */}
        <div className={styles.rating}>
          <div className={styles.stars}>
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="14" height="14" viewBox="0 0 24 24"
                fill={s <= Math.round(product.rating) ? '#c8973a' : 'none'}
                stroke="#c8973a" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.price}>
            ₺{(product.salePrice ?? product.price).toLocaleString('tr-TR')}
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginLeft: '4px' }}>+KDV</span>
          </span>
          {product.salePrice && (
            <span className={styles.oldPrice}>₺{product.price.toLocaleString('tr-TR')}</span>
          )}
          {discount && (
            <span className={styles.discountBadge}>-%{discount}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
