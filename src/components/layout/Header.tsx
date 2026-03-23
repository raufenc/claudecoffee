'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import styles from './Header.module.css';

const navLinks = [
  { href: '/urunler', label: 'Ürünler' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/sss', label: 'SSS' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));
  const cartItems = mounted ? cartItemsCount : 0;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} id="header-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#1a2744"/>
              <path d="M8 20c2-4 6-6 8-6s6 2 8 6" stroke="#c8973a" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 14V8" stroke="#c8973a" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="7" r="2" fill="#c8973a"/>
            </svg>
            <span className={styles.logoText}>
              Claude<span className={styles.logoAccent}>Coffee</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Ana navigasyon">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link href="/sepet" className={styles.iconBtn} aria-label="Sepet" id="header-cart">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3A1 1 0 006 17h12M9 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z"/>
              </svg>
              <span className={styles.cartBadge}>{cartItems}</span>
            </Link>
            
            {session ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link href="/hesabim" className={styles.iconBtn} aria-label="Hesabım" id="header-account">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </Link>
                <button 
                  onClick={() => signOut()} 
                  className={styles.iconBtn} 
                  aria-label="Çıkış Yap" 
                  title="Çıkış Yap"
                  id="header-logout"
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                </button>
              </div>
            ) : (
              <Link href="/giris" className={styles.iconBtn} aria-label="Giriş Yap" id="header-account">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </Link>
            )}

            <Link href="/urunler" className={`btn btn-primary ${styles.ctaBtn}`} id="header-shop-btn">
              Alışveriş
            </Link>

            {/* Mobile hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menüyü aç/kapat"
              aria-expanded={menuOpen}
              id="header-mobile-menu-btn"
            >
              <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`}/>
              <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`}/>
              <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`}/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)}>
          <div
            ref={menuRef}
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileHeader}>
              <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
                <span className={styles.logoText}>Claude<span className={styles.logoAccent}>Coffee</span></span>
              </Link>
              <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="Kapat">✕</button>
            </div>
            <nav className={styles.mobileNav}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className={styles.mobileActions}>
              <Link href="/giris" className="btn btn-secondary w-full" onClick={() => setMenuOpen(false)}>Giriş Yap</Link>
              <Link href="/kayit" className="btn btn-primary w-full" onClick={() => setMenuOpen(false)}>Üye Ol</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
