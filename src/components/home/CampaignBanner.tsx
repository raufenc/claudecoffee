'use client';

import { useState } from 'react';
import styles from './CampaignBanner.module.css';

export default function CampaignBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className={styles.banner} role="banner" aria-label="Kampanya bildirimi">
      <p className={styles.text}>
        🎉 İlk siparişinizde <strong>%15 indirim!</strong> Kod: <span className={styles.code}>COFFEE15</span>
        &nbsp;•&nbsp; Türkiye geneli ücretsiz kargo ₺250 ve üzeri siparişlerde
      </p>
      <button
        className={styles.close}
        onClick={() => setVisible(false)}
        aria-label="Kampanya bildirimini kapat"
        id="campaign-banner-close"
      >✕</button>
    </div>
  );
}
