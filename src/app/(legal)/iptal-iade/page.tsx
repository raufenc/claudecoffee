import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'İptal ve İade Politikası',
  description: 'Claude Coffee sipariş iptal ve iade süreçleri hakkında bilgi alın.',
};

export default function IptalIadePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>İptal &amp; İade Politikası</h1>
          <p className={styles.meta}>Son güncelleme: Mart 2026</p>
        </div>
      </div>
      <div className={`container ${styles.body}`}>
        <div className={styles.card}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Sipariş İptali</h2>
            <p className={styles.text} style={{ marginBottom: '0.75rem' }}>
              Siparişinizi vermesini hemen pişman olduğunuzda ya da hatalı bir bilgi girdiğinizde iptal talebinde bulunabilirsiniz. İptal koşulları:
            </p>
            <ul className={styles.list}>
              <li><strong>Hazırlanmaya başlamadan önce:</strong> Tam iptal ve anında iade mümkündür. Hesabım &gt; Siparişlerim sayfasından veya destek hattımızdan talep edebilirsiniz.</li>
              <li><strong>Hazırlanma aşamasında:</strong> İptal mümkün değildir. Ürünü teslim aldıktan sonra iade sürecini başlatabilirsiniz.</li>
              <li><strong>Kargoya verildikten sonra:</strong> Sipariş teslim alınıp iade talebinde bulunulabilir.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>İade Koşulları</h2>
            <ul className={styles.list}>
              <li>Ürün, teslim tarihinden itibaren <strong>14 takvim günü</strong> içinde iade edilebilir.</li>
              <li>Ürün orijinal ambalajında, kullanılmamış ve eksiksiz olmalıdır.</li>
              <li>Açılmış kahve çekirdekleri ve öğütülmüş kahve ürünleri hijyen gerekçesiyle iade alınamaz (hasarlı veya hatalı ürün hariç).</li>
              <li>Kişiye özel olarak hazırlanan ürünler iade kapsamı dışındadır.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>İade Süreci — Adım Adım</h2>
            <ul className={styles.list}>
              <li><strong>1. Talep:</strong> destek@claudecoffee.com adresine sipariş numaranızı ve iade gerekçenizi bildirin.</li>
              <li><strong>2. Onay:</strong> İade talebiniz 1-2 iş günü içinde değerlendirilir ve size dönüş yapılır.</li>
              <li><strong>3. Kargo:</strong> Onay sonrası ürünü belirtilen adrese gönderin. Hasarlı/hatalı ürünlerde kargo etiketi tarafımızca sağlanır.</li>
              <li><strong>4. İnceleme:</strong> Ürün elimize ulaştıktan sonra 2 iş günü içinde incelenir.</li>
              <li><strong>5. İade:</strong> Geri ödeme, onaydan itibaren en geç 14 gün içinde orijinal ödeme yöntemiyle yapılır.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Hasarlı veya Hatalı Ürün</h2>
            <p className={styles.text}>
              Ürün hasarlı, eksik veya yanlış geldiyse kargo ücreti tamamen Şirketimize aittir. Bu durumda ürünün fotoğraflarını ve sipariş numaranızı destek@claudecoffee.com adresine ileterek ücretsiz iade sürecini başlatabilirsiniz. Talebiniz öncelikli olarak işleme alınır.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Geri Ödeme Süreleri</h2>
            <ul className={styles.list}>
              <li><strong>Kredi/Banka Kartı:</strong> Onaydan sonra 5-10 iş günü (bankanıza göre değişebilir)</li>
              <li><strong>Havale/EFT:</strong> Onaydan sonra 3-5 iş günü</li>
              <li><strong>Kapıda Ödeme:</strong> IBAN bilginize 5-7 iş günü içinde havale</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>İletişim</h2>
            <p className={styles.text}>
              İptal ve iade işlemleriniz için:<br/>
              📧 <strong>destek@claudecoffee.com</strong><br/>
              📞 +90 212 555 0100 (Hafta içi 09:00–18:00)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
