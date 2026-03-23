import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

export const metadata = {
  title: 'Admin Paneli | Claude Coffee'
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/giris'); // Unauthorized users should see login
  }

  return (
    <div className={styles.adminContainer}>
      {/* Admin Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Link href="/admin">
            Claude<span className={styles.accent}>Admin</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navItem}>Kontrol Paneli</Link>
          <Link href="/admin/urunler" className={styles.navItem}>Ürün Yönetimi</Link>
          <Link href="/admin/kategoriler" className={styles.navItem}>Ürün Grupları (Kategoriler)</Link>
          <Link href="/admin/siparisler" className={styles.navItem}>Siparişler</Link>
          <Link href="/admin/kullanicilar" className={styles.navItem}>Müşteriler</Link>
          <Link href="/admin/kuponlar" className={styles.navItem}>İndirim Kuponları ✦</Link>
          <Link href="/admin/potansiyel" className={styles.navItem}>Müşteri Adayları (CRM) ✦</Link>
          <Link href="/admin/ayarlar" className={styles.navItem}>Site Ayarları</Link>
          <Link href="/" className={styles.navItem} style={{ marginTop: 'auto' }}>← Siteye Dön</Link>
        </nav>
      </aside>

      {/* Admin Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Yönetim Paneli</div>
          <div className={styles.headerUser}>
            <span>{session?.user?.name || 'Admin'}</span>
            <span className={styles.badge}>Admin</span>
          </div>
        </header>

        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
