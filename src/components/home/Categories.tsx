import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './Categories.module.css';

const categoryMeta: Record<string, { desc: string; color: string; icon: string }> = {
  'Çekirdek': { desc: 'Tek köken & blend', color: '#2d5a27', icon: '☕' },
  'Ekipman': { desc: 'Pour over, espresso & daha fazlası', color: '#1a2744', icon: '⚗️' },
  'Aksesuar': { desc: 'Filtre, değirmen, fincan', color: '#6b3a2a', icon: '🫘' },
  'Hediye': { desc: 'Arkadaşlarınıza özel seçimler', color: '#7a4528', icon: '🎁' },
};

export default async function Categories() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  });

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title">Kategoriler</h2>
          <p className="section-subtitle">İhtiyacınıza göre keşfedin</p>
        </div>
        <div className={styles.grid}>
          {categories.map((cat) => {
            const meta = categoryMeta[cat.name] ?? { desc: 'Ürünleri keşfedin', color: '#1a2744', icon: '📦' };
            return (
              <Link
                key={cat.id}
                href={`/urunler?kategori=${cat.slug}`}
                className={styles.card}
                id={`category-${cat.slug}`}
                style={{ '--cat-color': meta.color } as React.CSSProperties}
              >
                <div className={styles.icon}>{meta.icon}</div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{cat.name}</h3>
                  <p className={styles.desc}>{meta.desc}</p>
                  <span className={styles.count}>{cat._count.products} ürün</span>
                </div>
                <div className={styles.arrow}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
