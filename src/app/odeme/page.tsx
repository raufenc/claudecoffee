'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

export default function OdemePage() {
  const router = useRouter();
  const { items, getSummary, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Sadece rakamlar
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  useEffect(() => {
    setMounted(true);
    if (items.length === 0 && mounted) {
      router.push('/sepet');
    }
  }, [items.length, mounted, router]);

  const { subtotal, total, shipping } = getSummary();

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target as HTMLFormElement;
      const addressInfo = {
        ad: (form.querySelector('input[defaultValue="Ahmet"]') as HTMLInputElement)?.value || 'Ahmet',
        soyad: (form.querySelector('input[defaultValue="Yılmaz"]') as HTMLInputElement)?.value || 'Yılmaz',
        telefon: (form.querySelector('input[type="tel"]') as HTMLInputElement)?.value || '05555555555',
        acikAdres: (form.querySelector('textarea') as HTMLTextAreaElement)?.value || 'Test Adres',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, addressInfo, total })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Sipariş hatası');

      clearCart();
      router.push(`/odeme/basarili?siparisNo=${data.orderNo}`);
    } catch (err) {
      console.error(err);
      alert('Sipariş tamamlanamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || items.length === 0) return null;

  return (
    <div style={{ marginTop: '80px', padding: '3rem 0 5rem', minHeight: '80vh', background: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 className="section-title" style={{ marginBottom: '2rem' }}>Ödeme ve Teslimat</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '2rem' }}>
          {/* Form Side */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <form onSubmit={handlePay}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Teslimat Adresi</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label className="label">Ad</label>
                  <input type="text" className="input" required defaultValue="Ahmet" />
                </div>
                <div>
                  <label className="label">Soyad</label>
                  <input type="text" className="input" required defaultValue="Yılmaz" />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label className="label">Telefon</label>
                <input type="tel" className="input" required defaultValue="0555 555 55 55" />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label className="label">Açık Adres</label>
                <textarea className="input" rows={3} required defaultValue="Örnek Mahallesi, 123. Sokak No:4 Daire: 5, Kadıköy / İstanbul" />
              </div>

              <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                   <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>Ödeme Bilgileri</h2>
                   <div style={{ display: 'flex', gap: '0.5rem', fontWeight: 800, color: '#005fB0' }}>PayTR</div>
                </div>
               
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>Bu alan PayTR altyapısı ile güvence altındadır.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label className="label">Kart Üzerindeki İsim</label>
                    <input type="text" className="input" required placeholder="AHMET YILMAZ" />
                  </div>
                  <div>
                    <label className="label">Kart Numarası</label>
                    <input 
                      type="text" 
                      className="input" 
                      required 
                      placeholder="**** **** **** ****" 
                      maxLength={19}
                      value={cardNumber}
                      onChange={handleCardNumberChange} 
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="label">Son Kullanma (AA/YY)</label>
                      <input type="text" className="input" required placeholder="12/26" maxLength={5} />
                    </div>
                    <div>
                      <label className="label">CVC</label>
                      <input type="text" className="input" required placeholder="***" maxLength={3} />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
                {loading ? 'Ödeme İşleniyor...' : `₺${total.toLocaleString('tr-TR')} Öde ve Siparişi Tamamla`}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>Siparişiniz</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 600 }}>{item.quantity}x</span> {item.name}
                      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{item.variant}</div>
                    </div>
                    <div style={{ fontWeight: 600, marginLeft: '1rem' }}>
                      ₺{((item.salePrice || item.price) * item.quantity).toLocaleString('tr-TR')}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Ara Toplam</span>
                  <span>₺{subtotal.toLocaleString('tr-TR')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Kargo</span>
                  <span>{shipping === 0 ? 'Ücretsiz' : `₺${shipping.toLocaleString('tr-TR')}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed #cbd5e1', fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  <span>Toplam</span>
                  <span>₺{total.toLocaleString('tr-TR')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
