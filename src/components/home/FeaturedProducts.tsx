import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import styles from './FeaturedProducts.module.css';

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  });
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h2 className="section-title">Öne Çıkan Ürünler</h2>
            <p className="section-subtitle">Kahve tutkunlarının en çok tercih ettiği seçimler</p>
          </div>
          <Link href="/urunler" className="btn btn-ghost" id="featured-view-all">
            Tümünü Gör
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className={styles.grid}>
          {products.map((p: any) => {
             // Adapt DB product to ProductCard expectation if needed
             const product = {
               ...p,
               image: JSON.parse(p.images)[0],
               rating: 4.8, // Mocked for now in UI
               reviews: 50, // Mocked for now in UI
               badge: p.salePrice ? `-%${Math.round(((p.price - p.salePrice) / p.price) * 100)}` : null
             };
             return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
}
