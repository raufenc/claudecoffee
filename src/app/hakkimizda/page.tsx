import type { Metadata } from 'next';
import styles from './hakkimizda.module.css';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Claude Coffee\'nin hikayesi, misyonu ve değerleri. Premium kahve kültürünü Türkiye\'ye taşıyan ekibimizi tanıyın.',
};

const values = [
  { icon: '🌱', title: 'Sürdürülebilirlik', desc: 'Etik tedarik zinciri ve çevre dostu ambalaj ile gezegenimize saygı gösteriyoruz.' },
  { icon: '🔬', title: 'Kalite Obsesyonu', desc: 'Her çekirdek titizlikle seçilir, her ekipman uzman gözüyle test edilir.' },
  { icon: '🤝', title: 'Topluluk', desc: 'Üreticiler, baristarlar ve kahve severlerle büyüyen bir topluluğuz.' },
  { icon: '📚', title: 'Eğitim', desc: 'Kahve bilgisini herkesin erişebileceği hale getirmeyi misyon ediniyoruz.' },
];

const team = [
  { name: 'Ahmet Yılmaz', title: 'Kurucu & CEO', init: 'AY' },
  { name: 'Zeynep Kara', title: 'Müşteri Deneyimi', init: 'ZK' },
  { name: 'Mehmet Demir', title: 'Ürün Direktörü', init: 'MD' },
];

export default function HakkimizdaPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Hikayemiz</span>
          <h1 className={styles.title}>Kahveyi Sanata<br/><span className={styles.accent}>Dönüştürüyoruz</span></h1>
          <p className={styles.desc}>
            2021 yılında İstanbul&apos;da kurulan Claude Coffee, kahve kültürünü Türkiye&apos;nin her köşesine 
            taşıma misyonuyla yola çıktı. Bugün binlerce kahve severe premium çekirdekler ve 
            profesyonel ekipmanlar sunuyoruz.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className={styles.story}>
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyVisual}>
            <div className={styles.storyImage}>
              <svg width="100" height="100" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="rgba(200,151,58,0.15)"/>
                <path d="M25 52c3-8 9-12 15-12s12 4 15 12" stroke="#c8973a" strokeWidth="3" strokeLinecap="round"/>
                <path d="M40 40V24" stroke="#c8973a" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="40" cy="21" r="5" fill="#c8973a"/>
              </svg>
            </div>
          </div>
          <div className={styles.storyText}>
            <h2 className="section-title">Nereden Geldik?</h2>
            <p>İki kahve tutkunu arkadaşın "Türkiye&apos;de neden gerçek specialty kahve bulmak bu kadar zor?" sorusundan doğdu Claude Coffee. Üç yıl boyunca üreticilerle doğrudan ilişkiler kurduk, her çekirdeği seyahat ederek test ettik.</p>
            <p style={{ marginTop: '1rem' }}>Bugün 50&apos;den fazla ürünle Türkiye genelinde teslimat yapıyor, her siparişin ardında gerçek bir hikaye olduğunu bilerek çalışıyoruz.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="section-title">Değerlerimiz</h2>
            <p className="section-subtitle">Bizi biz yapan prensipler</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.team}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="section-title">Ekibimiz</h2>
            <p className="section-subtitle">Arkasındaki insanlar</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((t) => (
              <div key={t.name} className={styles.teamCard}>
                <div className={styles.avatar}>{t.init}</div>
                <h3 className={styles.teamName}>{t.name}</h3>
                <p className={styles.teamTitle}>{t.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
