'use client';

import { useState } from 'react';
import styles from './iletisim.module.css';

export default function IletisimPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>İletişim</h1>
          <p className={styles.pageDesc}>Sorularınız için buradayız — size en kısa sürede dönüş yaparız.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Bize Yazın</h2>
            {status === 'success' ? (
              <div className={styles.successMsg}>
                <span style={{ fontSize: '2rem' }}>✅</span>
                <p><strong>Mesajınız alındı!</strong> En kısa sürede size dönüş yapacağız.</p>
                <button className="btn btn-ghost" onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className="form-group">
                    <label className="label" htmlFor="contact-name">Ad Soyad *</label>
                    <input id="contact-name" className="input" type="text" required placeholder="Adınız ve soyadınız"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="contact-email">E-posta *</label>
                    <input id="contact-email" className="input" type="email" required placeholder="ornek@email.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="contact-subject">Konu *</label>
                  <select id="contact-subject" className="input" required value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}>
                    <option value="">Konu seçin</option>
                    <option value="siparis">Siparişim Hakkında</option>
                    <option value="urun">Ürün Sorusu</option>
                    <option value="iade">İptal & İade</option>
                    <option value="b2b">B2B Teklif</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="contact-message">Mesajınız *</label>
                  <textarea id="contact-message" className={`input ${styles.textarea}`} required
                    placeholder="Mesajınızı buraya yazın..." rows={5}
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-full" id="contact-submit"
                  disabled={status === 'sending'}>
                  {status === 'sending' ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className={styles.info}>
            {[
              { icon: '📍', title: 'Adres', content: 'Levent Mah. Coffee Sokak No:1\nBeşiktaş, İstanbul' },
              { icon: '📞', title: 'Telefon', content: '+90 (212) 555 0100' },
              { icon: '✉️', title: 'E-posta', content: 'destek@claudecoffee.com' },
              { icon: '🕐', title: 'Çalışma Saatleri', content: 'Hafta içi: 09:00 – 18:00\nHafta sonu: Kapalı' },
            ].map((item) => (
              <div key={item.title} className={styles.infoCard}>
                <span className={styles.infoIcon}>{item.icon}</span>
                <div>
                  <h3 className={styles.infoTitle}>{item.title}</h3>
                  <p className={styles.infoContent}>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
