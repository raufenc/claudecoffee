import { prisma } from '@/lib/prisma';
import styles from './admin.module.css';

export default async function AdminDashboard() {
  const [usersCount, productsCount, orders] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ]);

  const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#1e293b' }}>
        Özet İstatistikler
      </h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Toplam Müşteri</div>
          <div className={styles.statValue}>{usersCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Toplam Ürün</div>
          <div className={styles.statValue}>{productsCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Son 5 Sipariş Geliri</div>
          <div className={styles.statValue}>₺{totalRevenue.toLocaleString('tr-TR')}</div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '3rem', marginBottom: '1rem', color: '#1e293b' }}>
        Son Siparişler
      </h2>
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Sipariş No</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Durum</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Tutar</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                  Henüz sipariş bulunmuyor.
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', color: '#0f172a' }}>{order.orderNo}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>₺{order.total.toLocaleString('tr-TR')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
