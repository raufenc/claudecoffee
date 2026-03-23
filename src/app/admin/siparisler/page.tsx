import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminSiparislerPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
    }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Siparişler</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <option value="ALL">Tümü</option>
            <option value="PENDING">Bekleyen (PENDING)</option>
            <option value="PAID">Ödendi (PAID)</option>
            <option value="SHIPPED">Kargoda (SHIPPED)</option>
            <option value="DELIVERED">Teslim Edildi (DELIVERED)</option>
            <option value="CANCELLED">İptal Edildi (CANCELLED)</option>
          </select>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Sipariş No</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Müşteri</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Tarih</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Tutar</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Durum</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem', textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Kayıtlı sipariş bulunamadı.</td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 600 }}>{o.orderNo}</td>
                  <td style={{ padding: '1rem', color: '#475569' }}>
                    <div style={{ fontWeight: 500 }}>{o.user?.name || 'Misafir'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{o.user?.email}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#475569' }}>
                    {new Date(o.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 600 }}>₺{o.total.toLocaleString('tr-TR')}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      background: o.status === 'PAID' || o.status === 'DELIVERED' ? '#dcfce7' : o.status === 'CANCELLED' ? '#fee2e2' : '#e0e7ff', 
                      color: o.status === 'PAID' || o.status === 'DELIVERED' ? '#166534' : o.status === 'CANCELLED' ? '#991b1b' : '#3730a3',
                      padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600
                    }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Detay</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
