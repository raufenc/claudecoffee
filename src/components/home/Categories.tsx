import Link from 'next/link';
import styles from './Categories.module.css';

const categories = [
  { slug: 'cekirdek', name: 'Kahve Çekirdekleri', desc: 'Tek köken & blend', count: 18, color: '#2d5a27', icon: '☕' },
  { slug: 'ekipman', name: 'Ekipmanlar', desc: 'Pour over, espresso & daha fazlası', count: 14, color: '#1a2744', icon: '⚗️' },
  { slug: 'aksesuar', name: 'Aksesuarlar', desc: 'Filtre, değirmen, fıncan', count: 12, color: '#6b3a2a', icon: '🫘' },
  { slug: 'hediye', name: 'Hediye Setleri', desc: 'Arkadaşlarınıza özel seçimler', count: 6, color: '#7a4528', icon: '🎁' },
];

export default function Categories() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title">Kategoriler</h2>
          <p className="section-subtitle">İhtiyacınıza göre keşfedin</p>
        </div>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/urunler?kategori=${cat.slug}`}
              className={styles.card}
              id={`category-${cat.slug}`}
              style={{ '--cat-color': cat.color } as React.CSSProperties}
            >
              <div className={styles.icon}>{cat.icon}</div>
              <div className={styles.info}>
                <h3 className={styles.name}>{cat.name}</h3>
                <p className={styles.desc}>{cat.desc}</p>
                <span className={styles.count}>{cat.count} ürün</span>
              </div>
              <div className={styles.arrow}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
