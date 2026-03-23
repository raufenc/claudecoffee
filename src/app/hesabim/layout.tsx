import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import styles from './hesabim.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Hesabım | Claude Coffee'
};

export default async function HesabimLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/giris');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Hesabım</h1>
          <p className={styles.subtitle}>Merhaba, {session.user?.name || 'Kahvesever'}</p>
        </div>
      </div>
      <div className={`container ${styles.layout}`}>
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            <Link href="/hesabim" className={styles.navItem}>Profilim</Link>
            <Link href="/hesabim/siparislerim" className={styles.navItem}>Siparişlerim</Link>
            <Link href="/hesabim/adreslerim" className={styles.navItem}>Adreslerim</Link>
          </nav>
        </aside>
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
