'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../admin.module.css';

export default function YeniUrunPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [form, setForm] = useState({
    sku: '',
    name: '',
    slug: '',
    description: '',
    price: '',
    salePrice: '',
    discountRate: '0',
    vatRate: '20',
    categoryId: '',
    stock: '0',
    warehouse: 'Merkez Depo',
    images: '',
    isActive: true
  });

  const warehouses = ['Merkez Depo', 'Mağaza 1', 'Dış Ambar'];

  useEffect(() => {
    fetch('/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
          // Don't auto-set first category to avoid unexpected SKU generation if not selected
        }
      })
      .catch(err => {
        console.error('Category fetch failed:', err);
        alert('Kategoriler yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyiniz.');
      });
  }, []);

  const generateSKU = (catName: string) => {
    const prefix = catName.substring(0, 3).toUpperCase().replace(/[AEIOUÖÜ]/g, ''); // Sessiz harflerden prefix
    const random = Math.floor(1000 + Math.random() * 9000); // 4 haneli random rakam
    const newSku = `${prefix}-${random}`;
    setForm(prev => ({ ...prev, sku: newSku }));
  };

  const handleCategoryChange = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    setForm(prev => ({ ...prev, categoryId: catId }));
    if (cat) generateSKU(cat.name);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setForm(prev => ({ ...prev, images: data.url }));
        alert('Görsel başarıyla yüklendi!');
      } else {
        alert(data.message);
      }
    } catch {
      alert('Yükleme hatası.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const priceNum = parseFloat(form.price);
    const rateNum = parseInt(form.discountRate, 10);
    if (!isNaN(priceNum) && !isNaN(rateNum) && rateNum > 0) {
      const discounted = priceNum * (1 - rateNum / 100);
      setForm(prev => ({ ...prev, salePrice: discounted.toFixed(2) }));
    }
  }, [form.price, form.discountRate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
          salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
          discountRate: parseInt(form.discountRate, 10) || 0,
          vatRate: parseInt(form.vatRate, 10) || 20,
          stock: parseInt(form.stock, 10) || 0,
          categoryId: form.categoryId || null, // Ensure empty string becomes null
          images: JSON.stringify([form.images])
        })
      });

      if (res.ok) {
        alert('Ürün başarıyla eklendi!');
        router.push('/admin/urunler');
      } else {
        const error = await res.json();
        alert(`Hata: ${error.message}`);
      }
    } catch (err) {
      alert('Hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/urunler" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.875rem' }}>
          ← Ürün Listesine Dön
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', color: '#1e293b' }}>Ürün Kartı Oluştur (Akıllı SKU Aktif)</h1>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', maxWidth: '1000px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
          
          <div>
            <label className="label">Otomatik Stok Kodu (SKU)</label>
            <input type="text" className="input" style={{ background: '#f1f5f9', fontWeight: 700 }} value={form.sku} readOnly />
            <button type="button" onClick={() => {
              const cat = categories.find(c => c.id === form.categoryId);
              if (cat) generateSKU(cat.name);
            }} style={{ fontSize: '0.65rem', background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: '4px 0' }}>↻ Yeni Kodu Üret</button>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label className="label">Ürün Adı *</label>
            <input type="text" className="input" required value={form.name} 
              onChange={e => setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().trim().replace(/ /g, '-')})} />
          </div>

          <div>
            <label className="label">Slug (URL) *</label>
            <input type="text" className="input" required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
          </div>

          <div>
            <label className="label">Ürün Grubu / Kategori *</label>
            <select className="input" value={form.categoryId} onChange={e => handleCategoryChange(e.target.value)}>
              <option value="">— Grup Seçiniz —</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Depo / Ambar *</label>
            <select className="input" value={form.warehouse} onChange={e => setForm({...form, warehouse: e.target.value})}>
              {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <label className="label">Açıklama *</label>
            <textarea className="input" rows={2} required value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
          </div>

          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
             <div>
                <label className="label">Fiyat (₺)</label>
                <input type="number" step="0.01" className="input" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
             </div>
             <div>
                <label className="label">İskonto (%)</label>
                <input type="number" className="input" value={form.discountRate} onChange={e => setForm({...form, discountRate: e.target.value})} />
             </div>
             <div>
                <label className="label">Satış Fiyatı (₺)</label>
                <input type="number" step="0.01" className="input" value={form.salePrice} readOnly style={{ background: '#e2e8f0' }} />
             </div>
             <div>
                <label className="label">KDV (%)</label>
                <input type="number" className="input" required value={form.vatRate} onChange={e => setForm({...form, vatRate: e.target.value})} />
             </div>
          </div>

          <div>
            <label className="label">Mevcut Stok *</label>
            <input type="number" className="input" required value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label className="label">Ürün Görseli Yükle *</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
               <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '0.8rem' }} />
               {uploading && <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>Yükleniyor...</span>}
               {form.images && (
                 <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                   <img src={form.images} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
               )}
            </div>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <label className={styles.checkboxLabel}>
               <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} />
               <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Ürün Satışa Açık</span>
            </label>
          </div>

          <div style={{ gridColumn: 'span 3', marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading || uploading}>
              {loading ? 'Kayıt Yapılıyor...' : 'Ürünü Sisteme Dahil Et'}
            </button>
            <Link href="/admin/urunler" className="btn btn-ghost" style={{ flex: 1, border: '1px solid #e2e8f0', textAlign: 'center' }}>İptal</Link>
          </div>

        </form>
      </div>
    </div>
  );
}
