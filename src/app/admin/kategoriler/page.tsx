'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminKategorilerPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');

  const fetchCats = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch {
      alert('Kategoriler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name: newName })
      });
      if (res.ok) {
        setNewName('');
        fetchCats();
      } else {
        const error = await res.json();
        alert(`Hata: ${error.message}`);
      }
    } catch {
      alert('Hata oluştu.');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/urunler" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.875rem' }}>
          ← Ürün Listesine Dön
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', color: '#1e293b' }}>Ürün Gruplarını (Kategorileri) Yönet</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
         <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Yeni Grup Ekle</h3>
            <form onSubmit={handleCreate}>
               <input 
                 type="text" 
                 className="input" 
                 placeholder="Kategori Adı" 
                 required 
                 value={newName} 
                 onChange={e => setNewName(e.target.value)} 
               />
               <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Sisteme Kaydet</button>
            </form>
         </div>

         <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Grup Adı</th>
                  <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Slug</th>
                  <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Grup bulunamadı.</td>
                  </tr>
                ) : (
                  categories.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 600 }}>{c.name}</td>
                      <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>{c.slug}</td>
                      <td style={{ padding: '1rem' }}>
                         <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>Sil</button>
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
