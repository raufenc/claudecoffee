import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/components/cart/AddToCartButton';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { category: true } });
  return {
    title: product ? `${product.name} | Claude Coffee` : 'Ürün Bulunamadı',
    description: product?.description ?? 'Claude Coffee ürün detayları.',
    openGraph: {
      title: product?.name,
      description: product?.description,
      images: product ? JSON.parse(product.images) : [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) return notFound();

  const images = JSON.parse(product.images) as string[];
  const mainImage = images[0];
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  return (
    <div style={{ marginTop: '80px', padding: '3rem 0 5rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          <a href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Ana Sayfa</a>
          {' / '}
          <a href="/urunler" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Ürünler</a>
          {' / '}
          <span style={{ color: 'var(--color-primary)' }}>{product.name}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Image */}
          <div style={{ background: 'linear-gradient(135deg, #f0ede8, #e8e4de)', borderRadius: '16px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <svg width="120" height="120" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="rgba(200,151,58,0.15)"/>
                <path d="M22 52c3-8 9-12 13-12s10 4 13 12" stroke="#c8973a" strokeWidth="3" strokeLinecap="round"/>
                <path d="M35 40V28" stroke="#c8973a" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="35" cy="26" r="4" fill="#c8973a"/>
              </svg>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a67c28', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {product.category?.name ?? product.categoryName}
              </span>
              {product.sku && (
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>SKU: {product.sku}</span>
              )}
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
              {product.name}
            </h1>

            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
              {product.description}
            </p>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                ₺{(product.salePrice ?? product.price).toLocaleString('tr-TR')}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>+KDV (%{product.vatRate})</span>
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

            {/* Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: product.stock > 10 ? '#27ae60' : product.stock > 0 ? '#f39c12' : '#e74c3c',
                display: 'inline-block'
              }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {product.stock > 10 ? 'Stokta' : product.stock > 0 ? `Son ${product.stock} adet` : 'Tükendi'}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {product.stock > 0 && product.isActive ? (
                <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, salePrice: product.salePrice }} />
              ) : (
                <button className="btn btn-secondary btn-lg" disabled style={{ flex: 1, opacity: 0.5 }}>
                  Stokta Yok
                </button>
              )}
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', background: 'var(--color-surface)', borderRadius: '10px', marginTop: '0.5rem' }}>
              {['✓ Hızlı Kargo — 1-3 iş günü', '✓ Ücretsiz iade — 14 gün', '✓ PayTR Güvenli Ödeme', '✓ ₺250 üzeri ücretsiz kargo'].map((item) => (
                <span key={item} style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Related Products */}
        <RelatedProducts categoryId={product.categoryId} currentId={product.id} />
      </div>
    </div>
  );
}

async function RelatedProducts({ categoryId, currentId }: { categoryId: string | null; currentId: string }) {
  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryId ?? undefined,
      id: { not: currentId },
      isActive: true,
    },
    take: 3,
    orderBy: { salesCount: 'desc' },
  });

  if (products.length === 0) return null;

  return (
    <div style={{ marginTop: '4rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
        Bu Ürünü Alanlar Şunları da Aldı
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {products.map((p) => {
          const img = JSON.parse(p.images)[0];
          return (
            <Link key={p.id} href={`/urunler/${p.slug}`} style={{ textDecoration: 'none', background: 'var(--color-bg-white)', borderRadius: '12px', border: '1px solid var(--color-border-light)', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}>
              <div style={{ aspectRatio: '4/3', background: 'var(--color-surface)', overflow: 'hidden' }}>
                {img && <img src={img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />}
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{p.name}</h3>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  ₺{(p.salePrice ?? p.price).toLocaleString('tr-TR')}
                </span>
                {p.salePrice && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                    ₺{p.price.toLocaleString('tr-TR')}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
