import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminKullanicilarPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Kullanıcılar / Müşteriler</h1>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem', width: '60px' }}>Profil</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>İsim / E-posta</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Kayıt Tarihi</th>
              <th style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Kullanıcı bulunamadı.</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem' }}>
                    {u.image ? (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                             <Image src={u.image} alt={u.name || 'User'} fill style={{ objectFit: 'cover' }} />
                        </div>
                    ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-light)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            {u.name?.charAt(0).toUpperCase() || u.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: '#0f172a', fontWeight: 600 }}>{u.name || 'İsimsiz Kullanıcı'}</div>
                    <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#475569' }}>
                    {new Date(u.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      background: u.role === 'ADMIN' ? '#fef08a' : '#f1f5f9', 
                      color: u.role === 'ADMIN' ? '#854d0e' : '#475569',
                      padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600
                    }}>
                      {u.role}
                    </span>
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
