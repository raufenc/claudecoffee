'use client';

import { useState, useEffect } from 'react';

export default function AdminAyarlarPage() {
  const [settings, setSettings] = useState({
    siteName: 'Claude Coffee',
    contactEmail: 'destek@claudecoffee.com',
    contactPhone: '0850 123 45 67',
    address: 'Örnek Cad. Kahve Sok. No:1 Kadıköy / İstanbul',
    instagramLink: 'https://instagram.com/claudecoffee',
    footerText: 'Premium kahve kültürünü Türkiye\'nin her köşesine taşıyoruz. Çekirdekten fincana mükemmellik.'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length > 0) {
          setSettings(prev => ({ ...prev, ...data }));
        }
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) alert('Ayarlar başarıyla kaydedildi!');
      else alert('Kaydetme başarısız oldu.');
    } catch {
      alert('Bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '2rem' }}>Site Ayarları</h1>
      
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Genel Bilgiler</h2>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Site Adı</label>
            <input type="text" className="input" value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Slogan (Footer)</label>
            <textarea className="input" rows={3} value={settings.footerText} onChange={e => setSettings({...settings, footerText: e.target.value})} />
          </div>

          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '1rem' }}>İletişim & Sosyal Medya</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>E-posta</label>
              <input type="email" className="input" value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Telefon</label>
              <input type="text" className="input" value={settings.contactPhone} onChange={e => setSettings({...settings, contactPhone: e.target.value})} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Açık Adres</label>
            <textarea className="input" rows={2} value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Instagram Linki</label>
            <input type="url" className="input" value={settings.instagramLink} onChange={e => setSettings({...settings, instagramLink: e.target.value})} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }} disabled={saving}>
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </form>
      </div>
    </div>
  );
}
