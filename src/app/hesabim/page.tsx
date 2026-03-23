import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import styles from './hesabim.module.css';

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);
  
  // Refetch user to get the latest DB data
  const user = await prisma.user.findUnique({
    where: { id: (session?.user as any)?.id }
  });

  return (
    <div>
      <h2 className={styles.sectionTitle}>Profil Bilgileri</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <label className="label">Ad Soyad</label>
          <input type="text" className="input" defaultValue={user?.name || ''} readOnly />
        </div>
        <div>
          <label className="label">E-posta</label>
          <input type="email" className="input" defaultValue={user?.email || ''} readOnly />
        </div>
      </div>
      <button className="btn btn-secondary">Bilgileri Güncelle (Yapım Aşamasında)</button>
    </div>
  );
}
