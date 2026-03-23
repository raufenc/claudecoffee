import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  // If a specific code is requested (Cart applying coupon)
  if (code) {
    const coupon = await prisma.coupon.findUnique({ where: { code } });
    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ message: 'Geçersiz veya süresi dolmuş kupon' }, { status: 404 });
    }
    return NextResponse.json({ discountPercent: coupon.discountPercent });
  }

  // Admin fetching all coupons
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Yetkisiz' }, { status: 403 });
  }

  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(coupons);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Yetkisiz' }, { status: 403 });
  }

  try {
    const { discountPercent } = await req.json();
    
    // Generate an 8 character random alphanumeric code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();

    const newCoupon = await prisma.coupon.create({
      data: {
        code,
        discountPercent: parseInt(discountPercent, 10) || 10
      }
    });

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Kupon oluşturulamadı' }, { status: 500 });
  }
}
