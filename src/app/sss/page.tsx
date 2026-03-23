'use client';

import { useState } from 'react';
import styles from './sss.module.css';

const faqData = [
  { category: 'Sipariş', q: 'Minimum sipariş tutarı var mı?', a: 'Hayır, minimum sipariş tutarımız bulunmamaktadır. Ancak ₺250 ve üzeri siparişlerde kargo ücretsizdir.' },
  { category: 'Sipariş', q: 'Siparişimi nasıl takip edebilirim?', a: 'Sipariş kargoya verildiğinde size e-posta ile takip numarası gönderilir. Hesabım > Siparişlerim sayfasından da takip edebilirsiniz.' },
  { category: 'Sipariş', q: 'Sipariş iptali yapabilir miyim?', a: 'Sipariş hazırlanmaya başlamadan önce iptal yapabilirsiniz. Hazırlık sürecine girdikten sonra iptal mümkün değildir; ürünü teslim aldıktan sonra iade sürecini başlatabilirsiniz.' },
  { category: 'Kargo', q: 'Kargo kaç günde ulaşır?', a: 'Siparişleriniz 1-3 iş günü içinde teslim edilir. Hafta sonu verilen siparişler Pazartesi günü işleme alınır.' },
  { category: 'Kargo', q: 'Kargo ücreti ne kadar?', a: '₺250 ve üzeri siparişlerde kargo ücretsizdir. Altındaki siparişlerde kargo ücreti ₺29\'dir.' },
  { category: 'Kargo', q: 'Yurt dışına gönderim yapıyor musunuz?', a: 'Şu an yalnızca Türkiye geneline gönderim yapıyoruz. Yurt dışı gönderim için iletişim sayfasından bizimle irtibata geçebilirsiniz.' },
  { category: 'Ödeme', q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', a: 'Kredi/banka kartı (PayTR 3D Secure), havale/EFT ve kapıda ödeme kabul ediyoruz. Tüm kart işlemleri PayTR altyapısı üzerinden güvenli şekilde gerçekleşir.' },
  { category: 'Ödeme', q: 'Taksit imkânı var mı?', a: 'Evet, bazı bankalar için 3-6 taksit imkânı sunulmaktadır. Geçerli bankalar ve taksit seçenekleri ödeme sayfasında görüntülenir.' },
  { category: 'İade', q: 'İade nasıl yapabilirim?', a: 'Teslim tarihinden itibaren 14 gün içinde iade talebinde bulunabilirsiniz. Hesabım > Siparişlerim sayfasından veya iletişim formundan iade talebinizi iletebilirsiniz.' },
  { category: 'İade', q: 'İade ücretsiz mi?', a: 'Ürün hasarlı veya hatalı ise iade kargo ücreti tarafımızdan karşılanır. Diğer durumlarda iade kargo ücreti müşteriye aittir.' },
  { category: 'Ürün', q: 'Ürünler taze mi?', a: 'Kahve çekirdeklerimiz küçük parti kavurma yöntemiyle hazırlanır ve siparişe özel paketlenerek gönderilir. Tazelik garantimiz vardır.' },
  { category: 'Ürün', q: 'B2B için toplu sipariş verebilir miyim?', a: 'Evet, kurumsal müşterilerimize özel fiyatlandırma ve avantajlar sunuyoruz. B2B talebiniz için iletişim formunu kullanın.' },
];

const categories = ['Tümü', ...Array.from(new Set(faqData.map(f => f.category)))];

export default function SSSPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = faqData.filter(f => {
    const matchCat = activeCategory === 'Tümü' || f.category === activeCategory;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Sıkça Sorulan Sorular</h1>
          <p className={styles.pageDesc}>Aklınızdaki soruların cevabını hemen bulun.</p>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              id="faq-search"
              className={styles.searchInput}
              type="search"
              placeholder="Soru veya anahtar kelime ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Category Tabs */}
          <div className={styles.tabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`}
                onClick={() => setActiveCategory(cat)}
                id={`faq-tab-${cat}`}
              >{cat}</button>
            ))}
          </div>

          {/* FAQ List */}
          <div className={styles.faqList}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>Aramanızla eşleşen soru bulunamadı.</div>
            ) : (
              filtered.map((faq, i) => (
                <div key={i} className={`${styles.item} ${openIndex === i ? styles.open : ''}`}>
                  <button
                    className={styles.question}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    aria-expanded={openIndex === i}
                    id={`faq-item-${i}`}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.chevron}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </span>
                  </button>
                  {openIndex === i && (
                    <div className={styles.answer}>{faq.a}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
