import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Mesafeli Satış Sözleşmesi',
  description: 'Claude Coffee mesafeli satış sözleşmesi — alışverişinizle ilgili tüm hüküm ve koşullar.',
};

export default function MesafeliSatisPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Mesafeli Satış Sözleşmesi</h1>
          <p className={styles.meta}>Son güncelleme: Mart 2026 · 6502 sayılı TKHK ve Yönetmelik kapsamında</p>
        </div>
      </div>
      <div className={`container ${styles.body}`}>
        <div className={styles.card}>
          <div className={styles.infoBox}>
            ℹ️ Bu sözleşme, siparişinizi tamamladığınızda elektronik ortamda onaylanmış sayılır ve taraflar arasında bağlayıcı nitelik taşır.
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Taraflar</h2>
            <p className={styles.text}><strong>Satıcı:</strong> Claude Coffee · Levent Mah. Coffee Sokak No:1, Beşiktaş, İstanbul · destek@claudecoffee.com · +90 212 555 0100</p>
            <p className={styles.text} style={{ marginTop: '0.5rem' }}><strong>Alıcı:</strong> Sipariş tamamlama formunda belirtilen ad, soyad ve adres bilgilerine sahip kullanıcı.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Sözleşmenin Konusu</h2>
            <p className={styles.text}>
              İşbu sözleşme, Alıcı&apos;nın claudecoffee.com üzerinden elektronik ortamda sipariş verdiği ürün veya ürünlerin satışı ve teslimatına ilişkin olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri çerçevesinde Tarafların hak ve yükümlülüklerini düzenler.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Ürün Bilgileri ve Fiyat</h2>
            <p className={styles.text}>
              Sözleşme konusu ürün/ürünlerin temel özellikleri, KDV dahil satış fiyatı, ödeme ve teslimat bilgileri sipariş özeti sayfasında ve onay e-postasında yer almaktadır. Fiyatlar ₺ (Türk Lirası) cinsindendir ve tüm vergiler dahildir.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Ödeme Koşulları</h2>
            <ul className={styles.list}>
              <li>Kredi / Banka Kartı: PayTR altyapısı üzerinden 3D Secure ile anlık tahsilat</li>
              <li>Havale/EFT: Ödeme teyidinden sonra sipariş işleme alınır (1-2 iş günü)</li>
              <li>Kapıda Ödeme: Teslimat sırasında nakit veya kartla +₺15 ek ücret ile</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Teslimat</h2>
            <ul className={styles.list}>
              <li>Ürünler ödeme onayından sonra 1-3 iş günü içinde kargoya verilir.</li>
              <li>Teslimat adresi, sipariş formunda belirtilen adrestir; adres hatasından doğan gecikmelerden Satıcı sorumlu değildir.</li>
              <li>₺250 ve üzeri siparişlerde kargo ücretsizdir; altındaki siparişlerde ₺29 kargo ücreti uygulanır.</li>
              <li>Yasal azami teslimat süresi 30 takvim günüdür.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Cayma Hakkı</h2>
            <p className={styles.text}>
              Alıcı, ürünü teslim aldığı tarihten itibaren <strong>14 takvim günü</strong> içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir. Cayma bildirimini destek@claudecoffee.com adresine e-posta ile iletmeniz yeterlidir.
            </p>
            <p className={styles.text} style={{ marginTop: '0.75rem' }}>
              Cayma hakkı; alıcının talebi üzerine hazırlanan kişiselleştirilmiş ürünler, sağlık ve hijyen açısından iade uygun olmayan ürünler (açılmış kahve paketleri) ile dijital içerikler için geçerli değildir.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>7. İade ve Geri Ödeme</h2>
            <ul className={styles.list}>
              <li>Cayma bildiriminden itibaren ürün 10 iş günü içinde iade edilmelidir.</li>
              <li>Ürün hasarlı veya hatalı ise iade kargo ücreti Satıcıya aittir.</li>
              <li>Ürün orijinal ambalajında ve kullanılmamış hâlde iade edilmelidir.</li>
              <li>Geri ödeme, iade onayından itibaren en geç 14 gün içinde aynı ödeme yöntemiyle yapılır.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Uyuşmazlık Çözümü</h2>
            <p className={styles.text}>
              Uyuşmazlıklarda İl veya İlçe Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir. Tüketici başvurularında T.C. Ticaret Bakanlığı&apos;nın belirlediği parasal sınırlar dikkate alınır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
