import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const products = await prisma.product.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const product = await prisma.product.create({
      data: {
        sku: data.sku,
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        salePrice: data.salePrice,
        discountRate: data.discountRate,
        vatRate: data.vatRate,
        stock: data.stock,
        warehouse: data.warehouse,
        isActive: data.isActive,
        images: data.images,
        categoryId: data.categoryId || null,
        categoryName: data.categoryName || null // Legacy support
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'Bu slug veya SKU zaten kullanımda.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Ürün eklenemedi.' }, { status: 500 });
  }
}
