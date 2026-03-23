'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminUrunlerPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch {
      alert('Ürünler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`${name} ürününü silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Ürün silindi.');
        fetchProducts();
      } else {
        const error = await res.json();
        alert(`Hata: ${error.message}`);
      }
    } catch {
      alert('İşlem başarısız.');
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) fetchProducts();
    } catch {
       alert('Durum güncellenemedi.');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Profesyonel Ürün & Stok Yönetimi</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <Link href="/admin/kategoriler" className="btn btn-ghost" style={{ border: '1px solid #e2e8f0' }}>Grupları / Kategorileri Yönet</Link>
           <Link href="/admin/urunler/yeni" className="btn btn-primary">Yeni Ürün Ekle</Link>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '1000px' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Stok Kodu</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Ürün Adı / Grup</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Liste Fiyatı (H.)</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>İskonto %</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Satış Fiyatı</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>KDV %</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Stok / Ambar</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Satalan</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Durum</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Kayıtlı ürün bulunamadı.</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0', opacity: p.isActive ? 1 : 0.6 }}>
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.875rem', fontWeight: 600 }}>{p.sku || '-'}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.875rem' }}>{p.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{p.categoryName || 'Genel'}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.875rem' }}>₺{p.price.toLocaleString('tr-TR')}</td>
                  <td style={{ padding: '1rem', color: '#ef4444', fontSize: '0.875rem', fontWeight: 600 }}>%{p.discountRate || 0}</td>
                  <td style={{ padding: '1rem', color: '#0f172a', fontSize: '0.875rem', fontWeight: 700 }}>
                     ₺{(p.salePrice || p.price).toLocaleString('tr-TR')}
                  </td>
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.875rem' }}>%{p.vatRate}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ 
                      background: p.stock > 10 ? '#dcfce7' : p.stock > 0 ? '#fef08a' : '#fee2e2', 
                      color: p.stock > 10 ? '#166534' : p.stock > 0 ? '#854d0e' : '#991b1b',
                      padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-block'
                    }}>
                      {p.stock} Adet
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '0.25rem' }}>{p.warehouse || 'Depo belirtilmedi'}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#0f172a', fontSize: '0.875rem', fontWeight: 600 }}>{p.salesCount}</td>
                  <td style={{ padding: '1rem' }}>
                    <button 
                      onClick={() => toggleStatus(p.id, p.isActive)}
                      style={{ 
                        background: p.isActive ? '#0f172a' : '#e2e8f0',
                        color: p.isActive ? '#fff' : '#64748b',
                        border: 'none', padding: '0.25rem 0.75rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.675rem', fontWeight: 600
                      }}
                    >
                      {p.isActive ? 'SATIŞTA' : 'KAPALI'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <Link href={`/admin/urunler/duzenle/${p.id}`} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, marginRight: '1rem', textDecoration: 'none', fontSize: '0.875rem' }}>Düzenle</Link>
                    <button onClick={() => handleDelete(p.id, p.name)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>Sil</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
