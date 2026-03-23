import type { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları',
  description: 'Claude Coffee kullanım koşulları ve hizmet şartları.',
};

export default function KullanimKosullariPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Kullanım Koşulları</h1>
          <p className={styles.meta}>Son güncelleme: Mart 2026 · Yürürlük tarihi: 01.03.2026</p>
        </div>
      </div>
      <div className={`container ${styles.body}`}>
        <div className={styles.card}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Taraflar ve Kapsam</h2>
            <p className={styles.text}>
              Bu Kullanım Koşulları, Claude Coffee (&quot;Şirket&quot;, &quot;Biz&quot;) ile claudecoffee.com web sitesini (&quot;Site&quot;) kullanan bireysel ya da kurumsal kullanıcılar (&quot;Kullanıcı&quot;, &quot;Siz&quot;) arasında akdedilen sözleşmeyi oluşturur. Siteyi ziyaret etmek veya üye olmak, bu koşulları kabul ettiğiniz anlamına gelir. Koşulları kabul etmiyorsanız Siteyi kullanmayı bırakınız.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Hesap Oluşturma ve Güvenlik</h2>
            <ul className={styles.list}>
              <li>Üyelik için en az 18 yaşında olmanız gerekmektedir.</li>
              <li>Kayıt sırasında doğru ve güncel bilgi vermeniz zorunludur; yanlış bilgi nedeniyle doğacak zararlardan Şirket sorumlu değildir.</li>
              <li>Hesap şifrenizin güvenliğinden yalnızca siz sorumlusunuz; şifrenizi kimseyle paylaşmamalısınız.</li>
              <li>Hesabınızda yetkisiz bir işlem fark etmeniz hâlinde derhal destek@claudecoffee.com adresini bilgilendirmelisiniz.</li>
              <li>Şirket, kurallara aykırı kullanım tespitinde hesabı geçici olarak askıya alma veya kalıcı olarak kapatma hakkını saklı tutar.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Sipariş ve Sözleşme Oluşumu</h2>
            <p className={styles.text}>
              Sitede yaptığınız sipariş; ödeme onayının tamamlanmasının ardından Şirket tarafından doğrulama e-postası gönderilmesiyle bağlayıcı bir satış sözleşmesine dönüşür. Şirket, stok tükenmesi, fiyat hatası veya haklı gerekçelerin varlığı hâlinde onaylanan siparişi iptal etme hakkını saklı tutar; bu durumda ödeme tutarı 3-7 iş günü içinde iade edilir.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Fiyatlar ve Ödeme</h2>
            <ul className={styles.list}>
              <li>Tüm fiyatlar Türk Lirası (₺) cinsinden ve KDV dahil olarak gösterilmektedir.</li>
              <li>Fiyatlar önceden haber verilmeksizin değiştirilebilir; sipariş anındaki fiyat geçerlidir.</li>
              <li>Ödemeler PayTR altyapısıyla 3D Secure güvencesiyle işlenir.</li>
              <li>Sahte ödeme girişimleri yasal yaptırımlara tabidir.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Fikri Mülkiyet</h2>
            <p className={styles.text}>
              Site üzerindeki tüm içerikler (metinler, görseller, logolar, tasarım öğeleri, yazılım kodu) Claude Coffee&apos;nin mülkiyetindedir ve Türk Fikir ve Sanat Eserleri Kanunu kapsamında korunmaktadır. İzinsiz kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Yasaklı Kullanımlar</h2>
            <ul className={styles.list}>
              <li>Siteye zarar verebilecek bot, crawler veya otomatik sistemler kullanmak</li>
              <li>Diğer kullanıcıların verilerine erişmeye çalışmak</li>
              <li>Sahte yorum veya değerlendirme bırakmak</li>
              <li>Platformu yasa dışı amaçlar için kullanmak</li>
              <li>Toplu veya ticari yeniden satış amacıyla sipariş vermek (kurumsal müşteri anlaşması olmadan)</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Sorumluluk Sınırlaması</h2>
            <p className={styles.text}>
              Şirket, internet bağlantı sorunları, üçüncü taraf hizmet aksaklıkları veya mücbir sebepler nedeniyle oluşan dolaylı zararlardan sorumlu değildir. Şirketin azami sorumluluğu, ilgili sipariş bedeliyle sınırlıdır.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Uygulanacak Hukuk ve Yetki</h2>
            <p className={styles.text}>
              Bu Koşullar Türk hukukuna tabidir. Doğacak her türlü uyuşmazlıkta İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>9. İletişim</h2>
            <p className={styles.text}>
              Kullanım Koşulları ile ilgili sorularınız için: <strong>hukuk@claudecoffee.com</strong> adresine yazabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
