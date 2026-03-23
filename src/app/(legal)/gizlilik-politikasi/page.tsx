import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Claude Coffee gizlilik politikası — kişisel verilerinizi nasıl topladığımızı ve kullandığımızı öğrenin.',
};

export default function GizlilikPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Gizlilik Politikası</h1>
          <p className={styles.meta}>Son güncelleme: Mart 2026</p>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <div className={styles.card}>
          <div className={styles.infoBox}>
            ℹ️ Bu politika, claudecoffee.com alan adı üzerinden sunulan hizmetlere uygulanmaktadır.
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Giriş</h2>
            <p className={styles.text}>
              Claude Coffee olarak gizliliğinize saygı duyuyor ve kişisel verilerinizi güvende tutmayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve haklarınızın neler olduğunu açıklar.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Topladığımız Bilgiler</h2>
            <p className={styles.text} style={{ marginBottom: '0.75rem' }}><strong>a) Doğrudan sağladığınız bilgiler:</strong></p>
            <ul className={styles.list}>
              <li>Ad, soyad ve iletişim bilgileri (kayıt ve sipariş sırasında)</li>
              <li>Teslimat ve fatura adresi</li>
              <li>E-posta adresi ve şifre (güvenli şekilde şifrelenmiş olarak saklanır)</li>
              <li>Ödeme bilgileri (kart numaraları PayTR tarafından işlenir, tarafımızca saklanmaz)</li>
              <li>İletişim formundan gönderilen mesajlar</li>
            </ul>
            <p className={styles.text} style={{ marginTop: '1rem', marginBottom: '0.75rem' }}><strong>b) Otomatik olarak toplanan bilgiler:</strong></p>
            <ul className={styles.list}>
              <li>IP adresi ve tarayıcı bilgileri</li>
              <li>Ziyaret edilen sayfalar ve site içi davranışlar</li>
              <li>Çerez verileri (bkz. Çerez Politikası)</li>
              <li>Cihaz türü ve işletim sistemi</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Bilgilerin Kullanım Amaçları</h2>
            <ul className={styles.list}>
              <li>Siparişlerinizi işlemek, kargo ve teslimat süreçlerini yönetmek</li>
              <li>Hesabınızı oluşturmak ve yönetmek</li>
              <li>Müşteri destek hizmetleri sunmak</li>
              <li>E-posta bildirimleri ve kampanya iletişimi göndermek (onayınızla)</li>
              <li>Site güvenliğini sağlamak ve dolandırıcılığı önlemek</li>
              <li>Hizmetlerimizi geliştirmek ve kişiselleştirmek</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Bilgilerin Paylaşılması</h2>
            <p className={styles.text}>Kişisel bilgilerinizi üçüncü taraflara satmıyor veya kiralamıyoruz. Yalnızca aşağıdaki durumlarda paylaşım yapılır:</p>
            <ul className={styles.list}>
              <li><strong>Kargo şirketleri:</strong> Teslimatın gerçekleştirilmesi için ad, adres ve telefon bilgisi</li>
              <li><strong>PayTR:</strong> Ödeme işlemlerinin güvenli şekilde yapılması için</li>
              <li><strong>E-posta servisi:</strong> Bildirim ve fatura gönderimi için</li>
              <li><strong>Yasal zorunluluk:</strong> Mahkeme kararı veya resmi kurum talepleri durumunda</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Veri Güvenliği</h2>
            <p className={styles.text}>
              Verileriniz HTTPS protokolü ile şifrelenmiş bağlantılar üzerinden iletilmektedir. Şifreler bcrypt algoritmasıyla güvenli şekilde saklanmaktadır. Sunucularımız güvenlik duvarı ve düzenli güvenlik denetimleriyle korunmaktadır. Kart bilgileri tarafımızca hiçbir şekilde saklanmamakta, tüm ödeme işlemleri PCI-DSS uyumlu PayTR altyapısında gerçekleştirilmektedir.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Veri Saklama Süreleri</h2>
            <ul className={styles.list}>
              <li>Hesap bilgileri: Hesabınız aktif olduğu sürece + silme talebinden itibaren 30 gün</li>
              <li>Sipariş ve fatura kayıtları: Yasal yükümlülük gereği 10 yıl</li>
              <li>İletişim mesajları: 2 yıl</li>
              <li>Çerez verileri: Çerez türüne göre değişmektedir (bkz. Çerez Politikası)</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Haklarınız</h2>
            <p className={styles.text}>
              Kişisel verilerinize erişim, düzeltme, silme ve taşınabilirlik haklarınız bulunmaktadır. Bu haklarınızı kullanmak için <strong>gizlilik@claudecoffee.com</strong> adresine e-posta gönderebilirsiniz.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Politika Değişiklikleri</h2>
            <p className={styles.text}>
              Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişiklikler yapıldığında kayıtlı e-posta adresinize bildirim gönderilecektir. Politikanın güncel versiyonuna her zaman bu sayfadan ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
