'use client';

import { useState, useEffect } from 'react';

export default function AdminPotansiyelPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      alert('Müşteri adayları yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Yeni potansiyel müşteri eklendi!');
        setFormData({ companyName: '', contactName: '', email: '', phone: '', notes: '' });
        fetchLeads();
      } else {
        const errorData = await res.json();
        alert(`Kaydetme başarısız: ${errorData.message}`);
      }
    } catch {
      alert('Kayıt sırasında bir bağlantı hatası oluştu.');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Potansiyel B2B Müşteri Adayları (CRM)</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 1fr)', gap: '2rem' }}>
        
        {/* LİSTE */}
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', alignSelf: 'start' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Şirket Adı</th>
                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>İlgili Kişi</th>
                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>İletişim Bilgileri</th>
                <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Notlar</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Henüz kaydedilmiş aday yok.</td>
                </tr>
              ) : (
                leads.map((lead: any) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 600 }}>{lead.companyName}</td>
                    <td style={{ padding: '1rem', color: '#475569' }}>{lead.contactName || '-'}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: '#0f172a', fontSize: '0.875rem', fontWeight: 500 }}>{lead.phone || 'Tel yok'}</div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{lead.email || 'Mail yok'}</div>
                    </td>
                    <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>{lead.notes || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* YENİ EKLE FORMU */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', alignSelf: 'start' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Yeni Aday Ekle</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.3rem' }}>Şirket Adı *</label>
              <input type="text" className="input" required value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.3rem' }}>İlgili Kişi Adı</label>
              <input type="text" className="input" value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.3rem' }}>E-Posta</label>
              <input type="email" className="input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.3rem' }}>Telefon</label>
              <input type="text" className="input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.3rem' }}>Notlar / Açıklama</label>
              <textarea className="input" rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>Adayı Kaydet</button>
          </form>
        </div>

      </div>
    </div>
  );
}
