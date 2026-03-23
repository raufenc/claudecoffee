'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../giris/auth.module.css'; // Reusing login styles

export default function KayitPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Bir hata oluştu');
      }

      router.push('/giris?registered=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#1a2744"/>
            <path d="M8 20c2-4 6-6 8-6s6 2 8 6" stroke="#c8973a" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 14V8" stroke="#c8973a" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="16" cy="7" r="2" fill="#c8973a"/>
          </svg>
          <span className={styles.logoText}>Claude<span className={styles.logoAccent}>Coffee</span></span>
        </div>

        <h1 className={styles.title}>Aramıza Katılın</h1>
        <p className={styles.subtitle}>Yeni bir hesap oluşturun</p>

        {error && (
          <div style={{ padding: '0.75rem', background: '#fcecea', color: '#c0392b', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="register-name">Ad Soyad</label>
            <input id="register-name" type="text" className="input" placeholder="Adınız ve soyadınız" required 
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="register-email">E-posta</label>
            <input id="register-email" type="email" className="input" placeholder="ornek@email.com" required 
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="register-password">Şifre</label>
            <input id="register-password" type="password" className="input" placeholder="En az 6 karakter" required minLength={6} 
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '0.75rem', marginTop: '0.5rem' }}>
            <input type="checkbox" id="register-terms" required style={{ marginTop: '0.25rem' }} />
            <label htmlFor="register-terms" style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <Link href="/kullanim-kosullari" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Kullanım Koşulları</Link> ve <Link href="/gizlilik-politikasi" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Gizlilik Politikası</Link>'nı okudum ve kabul ediyorum.
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-full" id="register-submit" style={{ marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <p className={styles.switchText}>
          Zaten hesabınız var mı? <Link href="/giris" className={styles.switchLink}>Giriş Yapın</Link>
        </p>
      </div>
    </div>
  );
}
