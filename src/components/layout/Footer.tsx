import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = {
  urunler: [
    { href: '/urunler', label: 'Tüm Ürünler' },
    { href: '/urunler?kategori=cekirdek', label: 'Kahve Çekirdekleri' },
    { href: '/urunler?kategori=ekipman', label: 'Ekipmanlar' },
    { href: '/urunler?kategori=aksesuar', label: 'Aksesuarlar' },
  ],
  siparisler: [
    { href: '/sepet', label: 'Sepetim' },
    { href: '/giris', label: 'Siparişlerim' },
    { href: '/iptal-iade', label: 'İptal & İade' },
    { href: '/sss', label: 'Sıkça Sorulan Sorular' },
  ],
  kurumsal: [
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/iletisim', label: 'İletişim' },
    { href: '/gizlilik-politikasi', label: 'Gizlilik Politikası' },
    { href: '/kvkk', label: 'KVKK Metni' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#c8973a"/>
              <path d="M8 20c2-4 6-6 8-6s6 2 8 6" stroke="#1a2744" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 14V8" stroke="#1a2744" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="7" r="2" fill="#1a2744"/>
            </svg>
            <span className={styles.logoText}>Claude<span className={styles.logoAccent}>Coffee</span></span>
          </Link>
          <p className={styles.tagline}>
            Premium kahve kültürünü Türkiye'nin her köşesine taşıyoruz. Çekirdekten fincana mükemmellik.
          </p>
          <div className={styles.social}>
            {[
              { label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
              { label: 'Twitter/X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.188l4.264 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.icon}/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Ürünler</h4>
            {footerLinks.urunler.map((l) => (
              <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Siparişler</h4>
            {footerLinks.siparisler.map((l) => (
              <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Kurumsal</h4>
            {footerLinks.kurumsal.map((l) => (
              <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>© 2026 Claude Coffee. Tüm hakları saklıdır.</p>
            <div className={styles.legalLinks}>
              <Link href="/kullanim-kosullari" className={styles.legalLink}>Kullanım Koşulları</Link>
              <Link href="/cerez-politikasi" className={styles.legalLink}>Çerez Politikası</Link>
              <Link href="/mesafeli-satis-sozlesmesi" className={styles.legalLink}>Mesafeli Satış Sözleşmesi</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
