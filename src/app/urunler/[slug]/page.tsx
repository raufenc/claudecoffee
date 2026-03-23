import type { Metadata } from 'next';
import AddToCartButton from '@/components/cart/AddToCartButton';

const products: Record<string, { name: string; price: number; salePrice: number | null; category: string; desc: string }> = {
  'ethiopia-yirgacheffe': { name: 'Ethiopia Yirgacheffe', price: 320, salePrice: 270, category: 'Çekirdek', desc: 'Çiçeksi aroması ve parlak asitliğiyle tanınan efsanevi Etiyopya kahvesi.' },
  'colombia-supremo': { name: 'Colombia Supremo', price: 280, salePrice: null, category: 'Çekirdek', desc: 'Dengeli yapısı ve karamel notalarıyla günlük içim için mükemmel seçim.' },
  'hario-v60-set': { name: 'Hario V60 Starter Set', price: 650, salePrice: 520, category: 'Ekipman', desc: 'Filtre kahve yapmaya başlamak için ihtiyacınız olan her şey bir arada.' },
  'chemex-8-cup': { name: 'Chemex 8 Cup', price: 890, salePrice: null, category: 'Ekipman', desc: 'Zarif tasarımıyla hem işlevsel hem estetik bir demleme aleti.' },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];
  return {
    title: product?.name ?? 'Ürün',
    description: product?.desc ?? 'Claude Coffee ürün detayları.',
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug] ?? {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    price: 350,
    salePrice: null,
    category: 'Ürün',
    desc: 'Yüksek kaliteli Claude Coffee ürünü.',
  };

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  return (
    <div style={{ marginTop: '80px', padding: '3rem 0 5rem', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Image */}
          <div style={{ background: 'linear-gradient(135deg, #f0ede8, #e8e4de)', borderRadius: '16px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="120" height="120" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="rgba(200,151,58,0.15)"/>
              <path d="M22 52c3-8 9-12 13-12s10 4 13 12" stroke="#c8973a" strokeWidth="3" strokeLinecap="round"/>
              <path d="M35 40V28" stroke="#c8973a" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="35" cy="26" r="4" fill="#c8973a"/>
            </svg>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a67c28', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{product.category}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>{product.name}</h1>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{product.desc}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                ₺{(product.salePrice ?? product.price).toLocaleString('tr-TR')}
              </span>
              {product.salePrice && (
                <>
                  <span style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                    ₺{product.price.toLocaleString('tr-TR')}
                  </span>
                  <span style={{ background: '#fcecea', color: '#c0392b', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 700 }}>
                    -%{discount}
                  </span>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <AddToCartButton product={{ id: slug, name: product.name, price: product.price, salePrice: product.salePrice }} />
              <button className="btn btn-secondary btn-lg" id="detail-buy-now" style={{ flex: 1 }}>
                Hemen Al
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', background: 'var(--color-surface)', borderRadius: '10px' }}>
              {['✓ Hızlı Kargo — 1-3 iş günü', '✓ Ücretsiz iade — 14 gün', '✓ PayTR Güvenli Ödeme'].map((item) => (
                <span key={item} style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
