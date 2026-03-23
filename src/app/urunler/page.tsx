import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Ürünler',
  description: 'Kahve çekirdekleri, ekipmanlar ve aksesuarlar. Claude Coffee\'nin tüm ürün yelpazesini keşfedin.',
};

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <ProductsClient initialProducts={products} />;
}
