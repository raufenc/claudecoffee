import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'Claude Coffee KVKK Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
};

export default function KVKKPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>KVKK Aydınlatma Metni</h1>
          <p className={styles.meta}>Son güncelleme: Mart 2026</p>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <div className={styles.card}>
          <div className={styles.infoBox}>
            ℹ️ Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun 10. maddesi kapsamında hazırlanmış bir şablondur. Hukuki geçerlilik için danışmanınızla gözden geçiriniz.
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Veri Sorumlusunun Kimliği</h2>
            <p className={styles.text}>
              Claude Coffee (bundan sonra &quot;Şirket&quot; olarak anılacaktır), kişisel verilerinizin işlenmesinde veri sorumlusu sıfatını taşımaktadır. Şirket iletişim bilgileri: <strong>destek@claudecoffee.com</strong> / Levent Mah. Coffee Sokak No:1, Beşiktaş, İstanbul.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. İşlenen Kişisel Veriler</h2>
            <p className={styles.text} style={{ marginBottom: '0.75rem' }}>Şirketimiz tarafından işlenebilecek kişisel veriler şunlardır:</p>
            <ul className={styles.list}>
              <li>Kimlik bilgileri (ad, soyad)</li>
              <li>İletişim bilgileri (e-posta adresi, telefon numarası, teslimat adresi)</li>
              <li>Finansal bilgiler (sipariş tutarı, ödeme yöntemi — kart bilgileri tarafımızca saklanmaz)</li>
              <li>Müşteri işlem bilgileri (sipariş geçmişi, iade talepleri)</li>
              <li>Çerez verileri ve dijital iz bilgileri</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Kişisel Verilerin İşlenme Amaçları</h2>
            <ul className={styles.list}>
              <li>Sipariş ve teslimat süreçlerinin yürütülmesi</li>
              <li>Müşteri hizmetleri ve destek sağlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi (fatura düzenleme vb.)</li>
              <li>Pazarlama ve kampanya iletişimi (açık rıza alınması hâlinde)</li>
              <li>Site güvenliği ve dolandırıcılık önleme</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Kişisel Verilerin Aktarılması</h2>
            <p className={styles.text}>
              Kişisel verileriniz; kargo şirketleri (teslimat amacıyla), ödeme altyapı sağlayıcısı PayTR (ödeme işlemi), e-arşiv hizmet sağlayıcısı ve hukuki yükümlülük kapsamında zorunlu hâllerde kamu kurumlarıyla paylaşılabilir. Verileriniz yurt dışına aktarılmaz.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
            <p className={styles.text}>
              Kişisel verileriniz; üyelik formu, sipariş formu, iletişim formu ve çerezler aracılığıyla elektronik ortamda toplanmaktadır. İşlemenin hukuki dayanağı; sözleşmenin ifası, yasal yükümlülük ve meşru menfaattir.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>6. İlgili Kişinin Hakları (Madde 11)</h2>
            <p className={styles.text} style={{ marginBottom: '0.75rem' }}>KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className={styles.list}>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
              <li>Otomatik sistemlerle analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işlenmesi sebebiyle doğan zararın giderilmesini talep etme</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Başvuru Yöntemi</h2>
            <p className={styles.text}>
              Haklarınızı kullanmak için <strong>kvkk@claudecoffee.com</strong> adresine e-posta göndererek başvurabilirsiniz. Talebiniz en geç 30 gün içinde yanıtlanacaktır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
