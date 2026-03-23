export const dynamic = 'force-dynamic';

import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import Reviews from '@/components/home/Reviews';
import CampaignBanner from '@/components/home/CampaignBanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude Coffee — Premium Kahve Dünyası',
  description: 'Premium kahve çekirdeklerinden özel ekipmanlara, Claude Coffee ile kahve kültürünü keşfet. Türkiye\'ye hızlı kargo, güvenli ödeme.',
};

export default function HomePage() {
  return (
    <>
      <CampaignBanner />
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <Categories />
      <Reviews />
    </>
  );
}
