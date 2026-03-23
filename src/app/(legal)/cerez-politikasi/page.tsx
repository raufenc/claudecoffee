import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Çerez Politikası',
  description: 'Claude Coffee çerez politikası — sitede kullanılan çerezler ve yönetim seçenekleri.',
};

export default function CerezPolitikasiPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Çerez Politikası</h1>
          <p className={styles.meta}>Son güncelleme: Mart 2026</p>
        </div>
      </div>
      <div className={`container ${styles.body}`}>
        <div className={styles.card}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Çerez Nedir?</h2>
            <p className={styles.text}>
              Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, siteyi tekrar ziyaret ettiğinizde sizi tanımamıza, tercihlerinizi hatırlamamıza ve deneyiminizi kişiselleştirmemize yardımcı olur.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Kullandığımız Çerez Türleri</h2>

            <p className={styles.text} style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>🔒 Zorunlu Çerezler</p>
            <p className={styles.text} style={{ marginBottom: '1rem' }}>
              Sitenin düzgün çalışması için gerekli olan çerezlerdir. Giriş oturumunuz, sepetiniz ve güvenlik doğrulamaları bu çerezler aracılığıyla yönetilir. Bu çerezler devre dışı bırakılamaz.
            </p>
            <ul className={styles.list} style={{ marginBottom: '1rem' }}>
              <li><code>next-auth.session-token</code> — Kullanıcı oturumu (7 gün)</li>
              <li><code>cart_session</code> — Sepet içeriği (30 gün)</li>
              <li><code>csrf_token</code> — Güvenlik doğrulaması (Oturum boyunca)</li>
            </ul>

            <p className={styles.text} style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>📊 Analitik Çerezler</p>
            <p className={styles.text} style={{ marginBottom: '1rem' }}>
              Sitenin nasıl kullanıldığını anlamamıza yardımcı olan anonim istatistik çerezleridir. Kişisel kimliğinizi tespit etmezler.
            </p>
            <ul className={styles.list} style={{ marginBottom: '1rem' }}>
              <li><code>_ga</code> — Google Analytics ziyaretçi tanımlayıcı (2 yıl)</li>
              <li><code>_gid</code> — Google Analytics günlük istatistik (24 saat)</li>
            </ul>

            <p className={styles.text} style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>🎯 Pazarlama Çerezleri</p>
            <p className={styles.text} style={{ marginBottom: '1rem' }}>
              Size ilgi alanlarınıza uygun reklamlar göstermek için kullanılır. Bu çerezleri reddedebilirsiniz.
            </p>
            <ul className={styles.list}>
              <li><code>_fbp</code> — Meta (Facebook) Pixel (3 ay)</li>
              <li><code>_ttp</code> — TikTok Pixel (13 ay)</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Çerezleri Yönetme</h2>
            <p className={styles.text}>
              Analitik ve pazarlama çerezlerini sitemizin alt kısmındaki çerez tercih panelinden dilediğiniz zaman değiştirebilirsiniz. Ayrıca tarayıcı ayarlarınızdan tüm çerezleri engelleyebilirsiniz; ancak bu durumda sitenin bazı özellikleri düzgün çalışmayabilir.
            </p>
            <p className={styles.text} style={{ marginTop: '0.75rem' }}>Popüler tarayıcılarda çerez ayarları:</p>
            <ul className={styles.list}>
              <li>Chrome: Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
              <li>Firefox: Ayarlar → Gizlilik &amp; Güvenlik → Çerezler</li>
              <li>Safari: Tercihler → Gizlilik → Çerezleri Yönet</li>
              <li>Edge: Ayarlar → Site İzinleri → Çerezler</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Üçüncü Taraf Çerezleri</h2>
            <p className={styles.text}>
              Siteniz, Google Analytics ve Meta gibi üçüncü taraf hizmetlerini kullanmaktadır. Bu hizmetlerin çerez politikaları kendi web sitelerinde yayımlanmaktadır. Claude Coffee bu üçüncü tarafların çerez uygulamalarından sorumlu değildir.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>İletişim</h2>
            <p className={styles.text}>
              Çerez politikamız hakkında sorularınız için: <strong>gizlilik@claudecoffee.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
