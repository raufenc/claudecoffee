'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast';
import styles from './sepet.module.css';

export default function SepetPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getSummary } = useCartStore();
  const { showToast } = useToast();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { subtotal } = getSummary();
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 29.90;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subtotal === 0) return;
    
    try {
      const res = await fetch(`/api/coupons?code=${coupon}`);
      if (res.ok) {
        const data = await res.json();
        const calculatedDiscount = (subtotal * data.discountPercent) / 100;
        setDiscount(calculatedDiscount);
        showToast(`Kupon uygulandı! %${data.discountPercent} indirim kazandınız.`, 'success');
      } else {
        const data = await res.json();
        showToast(data.message || 'Geçersiz veya süresi dolmuş kupon kodu.', 'error');
        setDiscount(0);
      }
    } catch {
      showToast('Kupon kontrol edilirken bir hata oluştu.', 'error');
      setDiscount(0);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.emptyWrap}>
            <div className={styles.emptyIcon}>🛒</div>
            <h1 className={styles.emptyTitle}>Sepetiniz Boş</h1>
            <p className={styles.emptyDesc}>Sepetinizde henüz hiç ürün yok. Kahve dünyasını keşfetmeye ne dersiniz?</p>
            <Link href="/urunler" className="btn btn-primary btn-lg">Alışverişe Başla</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>Alışveriş Sepeti</h1>

        {/* Free Shipping Progress Bar */}
        {subtotal > 0 && subtotal < 250 && (
          <div style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #fcd34d', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🚚</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e', marginBottom: '0.5rem' }}>
                Ücretsiz kargoya <strong>₺{(250 - subtotal).toLocaleString('tr-TR')}</strong> kaldı!
              </p>
              <div style={{ background: '#fde68a', borderRadius: '100px', height: '8px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)', height: '100%', borderRadius: '100px', width: `${Math.min((subtotal / 250) * 100, 100)}%`, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>
        )}
        {subtotal >= 250 && (
          <div style={{ background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', border: '1px solid #6ee7b7', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎉</span>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#065f46' }}>Tebrikler! Ücretsiz kargo kazandınız!</p>
          </div>
        )}

        <div className={styles.grid}>
          {/* Cart Items */}
          <div className={styles.items}>
            <div className={styles.itemsHeader}>
              <span>Ürün</span>
              <span className={styles.hideMobile}>Fiyat</span>
              <span className={styles.hideMobile}>Adet</span>
              <span className={styles.hideMobile}>Toplam</span>
            </div>

            {items.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.itemProduct}>
                  <div className={styles.itemImage}>
                    {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                    ) : (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <circle cx="20" cy="20" r="20" fill="rgba(200,151,58,0.1)"/>
                          <path d="M12 26c1.5-4 4.5-6 6-6s4.5 2 6 6" stroke="#c8973a" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M20 20v-6" stroke="#c8973a" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="20" cy="12" r="2" fill="#c8973a"/>
                        </svg>
                    )}
                  </div>
                  <div>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemVariant}>{item.variant}</p>
                    {/* Mobile Only Info */}
                    <div className={styles.mobileInfo}>
                      <span className={styles.mobilePrice}>₺{(item.salePrice || item.price).toLocaleString('tr-TR')}</span>
                      <div className={styles.qtyControl} style={{ marginTop: '0.5rem' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.itemPrice} ${styles.hideMobile}`}>
                  ₺{(item.salePrice || item.price).toLocaleString('tr-TR')}
                </div>

                <div className={`${styles.hideMobile}`}>
                  <div className={styles.qtyControl}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>

                <div className={`${styles.itemTotal} ${styles.hideMobile}`}>
                  ₺{((item.salePrice || item.price) * item.quantity).toLocaleString('tr-TR')}
                </div>

                <button className={styles.removeBtn} onClick={() => removeItem(item.id)} aria-label="Kaldır">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            ))}

            <Link href="/urunler" className={styles.continueLink}>
              ← Alışverişe Devam Et
            </Link>
          </div>

          {/* Sidebar / Summary */}
          <div className={styles.sidebar}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Sipariş Özeti</h2>

              <div className={styles.summaryRow}>
                <span>Ara Toplam</span>
                <span>₺{subtotal.toLocaleString('tr-TR')}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Kargo Bedeli</span>
                <span>{shipping === 0 ? <strong className="text-success">Ücretsiz</strong> : `₺${shipping.toLocaleString('tr-TR')}`}</span>
              </div>

              {discount > 0 && (
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>İndirim (COFFEE15)</span>
                  <span>-₺{discount.toLocaleString('tr-TR')}</span>
                </div>
              )}

              <div className={styles.summaryTotal}>
                <span>Genel Toplam</span>
                <span>₺{total.toLocaleString('tr-TR')}</span>
              </div>

              <form className={styles.couponForm} onSubmit={handleApplyCoupon}>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="İndirim Kodu" 
                  value={coupon}
                  onChange={e => setCoupon(e.target.value.toUpperCase())}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '0.75rem 1rem' }}>Uygula</button>
              </form>

              <Link href="/odeme" className="btn btn-primary btn-lg w-full" style={{ marginTop: '1.5rem' }}>
                Ödemeye Geç
              </Link>
            </div>

            <div className={styles.paymentInfo}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', color: 'var(--color-primary-light)' }}>
                {/* Simulated payment logos */}
                <div style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, fontStyle: 'italic' }}>VISA</div>
                <div style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, fontStyle: 'italic' }}>MasterCard</div>
                <div style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#005fB0' }}>PayTR</div>
              </div>
              <p>256-bit SSL Güvenli Ödeme</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
