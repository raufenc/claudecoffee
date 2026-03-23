import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 800,
          color: 'var(--color-primary, #2c1810)',
          opacity: 0.1,
          lineHeight: 1,
          margin: 0,
          userSelect: 'none',
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          fontWeight: 700,
          color: 'var(--color-primary, #2c1810)',
          marginTop: '-1rem',
          marginBottom: '0.75rem',
        }}
      >
        Aradığınız sayfa bulunamadı
      </h2>
      <p
        style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted, #888)',
          maxWidth: '420px',
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}
      >
        Bu sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '0.85rem 2rem',
          background: 'var(--color-primary, #2c1810)',
          color: '#fff',
          borderRadius: 'var(--radius-md, 8px)',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          transition: 'opacity 0.2s',
        }}
      >
        Ana Sayfaya Dön
      </Link>
    </main>
  );
}
