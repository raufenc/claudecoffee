'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './auth.module.css';

function GirisForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
        callbackUrl
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('Giriş başarısız oldu.');
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

        <h1 className={styles.title}>Hoş Geldiniz</h1>
        <p className={styles.subtitle}>Hesabınıza giriş yapın</p>

        {registered && (
          <div style={{ padding: '0.75rem', background: '#eaf4eb', color: '#27ae60', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            Kayıt başarılı! Lütfen giriş yapın.
          </div>
        )}

        {error && (
          <div style={{ padding: '0.75rem', background: '#fcecea', color: '#c0392b', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="login-email">E-posta</label>
            <input id="login-email" type="email" className="input" placeholder="ornek@email.com" required 
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="login-password">Şifre</label>
            <input id="login-password" type="password" className="input" placeholder="••••••••" required 
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <div className={styles.forgotRow}>
            <Link href="/sifremi-unuttum" className={styles.forgotLink}>Şifremi unuttum</Link>
          </div>
          <button type="submit" className="btn btn-primary w-full" id="login-submit" style={{ marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className={styles.divider}><span>veya</span></div>

        <button className={`btn btn-ghost w-full ${styles.googleBtn}`} id="login-google">
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google ile Giriş Yap
        </button>

        <p className={styles.switchText}>
          Hesabınız yok mu? <Link href="/kayit" className={styles.switchLink}>Üye Olun</Link>
        </p>
      </div>
    </div>
  );
}

export default function GirisPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <GirisForm />
    </Suspense>
  );
}
