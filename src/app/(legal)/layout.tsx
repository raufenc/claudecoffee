import styles from './legal.module.css';
import type React from 'react';

interface LegalLayoutProps {
  children: React.ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}
