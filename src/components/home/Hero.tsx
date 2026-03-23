import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Ana banner">
      {/* Background */}
      <div className={styles.bg}>
        <div className={styles.bgGradient} />
        <div className={styles.bgPattern} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          {/* Eyebrow */}
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Premium Kahve Dünyası
          </span>

          {/* Heading */}
          <h1 className={styles.title}>
            Her Yudumda<br/>
            <span className={styles.titleAccent}>Kusursuzluk</span>
          </h1>

          {/* Description */}
          <p className={styles.desc}>
            Dünya&apos;nın dört bir yanından özenle seçilmiş çekirdekler, uzman donanım ve 
            barista teknikleriyle kahvenizi bir sanat eserine dönüştürün.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctas}>
            <Link href="/urunler" className="btn btn-primary btn-lg" id="hero-shop-btn">
              Alışverişe Başla
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <Link href="/hakkimizda" className="btn btn-secondary btn-lg" id="hero-learn-btn">
              Bizi Tanıyın
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { value: '5.000+', label: 'Mutlu Müşteri' },
              { value: '50+', label: 'Premium Ürün' },
              { value: '4.9★', label: 'Ortalama Puan' },
            ].map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className={styles.visual}>
          <div className={styles.visualCard}>
            <div className={styles.coffeeIcon}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="rgba(200,151,58,0.15)"/>
                <circle cx="40" cy="40" r="28" fill="rgba(200,151,58,0.2)"/>
                <path d="M28 50c3-8 9-12 12-12s9 4 12 12" stroke="#c8973a" strokeWidth="3" strokeLinecap="round"/>
                <path d="M40 38V24" stroke="#c8973a" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="40" cy="22" r="4" fill="#c8973a"/>
                <path d="M22 56h36" stroke="#c8973a" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.floatBadge1}>
              <span>🌱</span>
              <span>%100 Doğal</span>
            </div>
            <div className={styles.floatBadge2}>
              <span>🚀</span>
              <span>Hızlı Kargo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scroll}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
