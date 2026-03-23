import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../giris/auth.module.css';

export const metadata: Metadata = {
  title: 'Şifremi Unuttum',
  description: 'Claude Coffee hesabınızın şifresini sıfırlayın.',
};

export default function SifremiUnuttumPage() {
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

        <h1 className={styles.title}>Şifremi Unuttum</h1>
        <p className={styles.subtitle}>E-posta adresinizi girin, sıfırlama bağlantısı gönderelim.</p>

        <form className={styles.form}>
          <div className="form-group">
            <label className="label" htmlFor="reset-email">E-posta</label>
            <input id="reset-email" type="email" className="input" placeholder="Kayıtlı e-posta adresiniz" required />
          </div>
          <button type="submit" className="btn btn-primary w-full" id="reset-submit" style={{ marginTop: '0.5rem' }}>
            Sıfırlama Linki Gönder
          </button>
        </form>

        <p className={styles.switchText}>
          Şifrenizi hatırladınız mı? <Link href="/giris" className={styles.switchLink}>Giriş Yapın</Link>
        </p>
      </div>
    </div>
  );
}
