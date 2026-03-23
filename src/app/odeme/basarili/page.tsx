'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const siparisNo = searchParams.get('siparisNo');

  return (
    <div style={{ textAlign: 'center', background: '#fff', padding: '4rem 2rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', maxWidth: '600px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ background: '#ecfdf5', color: '#10b981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>
        Siparişiniz Alındı!
      </h1>
      
      <p style={{ color: '#64748b', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.6 }}>
        Teşekkür ederiz. Siparişiniz başarıyla oluşturuldu ve hazırlanıyor. Sipariş detaylarınızı e-posta adresinize gönderdik.
      </p>

      {siparisNo && (
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '2rem' }}>
          <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}>Sipariş Numaranız:</span>
          <br/>
          <span style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>{siparisNo}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/hesabim/siparislerim" className="btn btn-secondary">
          Siparişimi Takip Et
        </Link>
        <Link href="/urunler" className="btn btn-primary">
          Alışverişe Devam Et
        </Link>
      </div>
    </div>
  );
}

export default function OdemeBasariliPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#f8fafc' }}>
      <Suspense fallback={<div style={{ textAlign: 'center' }}>Yükleniyor...</div>}>
         <SuccessContent />
      </Suspense>
    </div>
  );
}
