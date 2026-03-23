'use client';

import { useState, useEffect } from 'react';

export default function AdminKuponlarPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [discountPercent, setDiscountPercent] = useState('15');

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/coupons');
      const data = await res.json();
      setCoupons(Array.isArray(data) ? data : []);
    } catch {
      alert('Kuponlar yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discountPercent })
      });
      if (res.ok) {
        alert('Yeni kupon oluşturuldu!');
        fetchCoupons(); // Refresh list
      } else {
        const errorData = await res.json();
        alert(`Kupon oluşturma başarısız: ${errorData.message || res.statusText}`);
      }
    } catch (err) {
      alert('Kupon oluşturma sırasında bir ağ hatası oluştu.');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>İndirim Kuponları</h1>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1, background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', alignSelf: 'start' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Pazarlama / Yeni Kupon Üret</h2>
          <form onSubmit={handleCreateCoupon}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>İndirim Oranı (%)</label>
              <input type="number" min="1" max="100" className="input" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Rastgele İndirim Kodu Üret</button>
          </form>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>Bu işlemi onayladığınızda sistem anında otomatik eşsiz bir 8 haneli kod üretecek ve veritabanına ekleyecektir. Yeni kodu sepet ekranında deneme amacıyla oluşturabilirsiniz.</p>
        </div>

        <div style={{ flex: 2, background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Kupon Kodu</th>
                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>İndirim Tutarı</th>
                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Durum</th>
                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Eklendiği Tarih</th>
                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Henüz kayıtlı indirim kodu yok.</td>
                </tr>
              ) : (
                coupons.map((c: any) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--color-primary)' }}>{c.code}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>%{c.discountPercent} İndirim</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: c.isActive ? '#dcfce7' : '#fee2e2', color: c.isActive ? '#166534' : '#991b1b', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {c.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#475569' }}>{new Date(c.createdAt).toLocaleDateString('tr-TR')}</td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={async () => {
                          const res = await fetch('/api/coupons', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: c.id, isActive: !c.isActive }) });
                          if (res.ok) fetchCoupons();
                        }}
                        style={{ color: c.isActive ? '#ef4444' : '#16a34a', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        {c.isActive ? 'Pasife Al' : 'Aktife Al'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
