import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendOrderEmail } from '@/lib/mail';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Yetkisiz' }, { status: 403 });
  }
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true, items: { include: { product: true } } },
  });
  return NextResponse.json(orders);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Yetkisiz' }, { status: 403 });
  }
  try {
    const { id, status } = await req.json();
    const updated = await prisma.order.update({ where: { id }, data: { status } });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: 'Sipariş güncellenemedi' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { items, addressInfo, total } = body;

    if (!items || !items.length) {
      return NextResponse.json({ message: 'Sepetiniz boş' }, { status: 400 });
    }

    const userId = (session?.user as any)?.id;
    let finalUserId = userId;

    if (!finalUserId) {
      const guestUser = await prisma.user.upsert({
        where: { email: 'guest@claudecoffee.com' },
        create: { name: 'Misafir', email: 'guest@claudecoffee.com', role: 'USER' },
        update: {}
      });
      finalUserId = guestUser.id;
    }

    // Validate total server-side
    let calculatedTotal = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (product) {
        calculatedTotal += (product.salePrice ?? product.price) * item.quantity;
      }
    }

    const addressRecord = await prisma.address.create({
      data: {
        userId: finalUserId,
        title: `${addressInfo.ad} ${addressInfo.soyad}`,
        city: addressInfo.il || 'Belirtilmedi',
        district: addressInfo.ilce || 'Belirtilmedi',
        address: addressInfo.acikAdres,
      }
    });

    // Decrement stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity }, salesCount: { increment: item.quantity } }
      });
    }

    const orderNo = 'CLD' + Date.now().toString(36).toUpperCase();
    const order = await prisma.order.create({
      data: {
        orderNo,
        userId: finalUserId,
        addressId: addressRecord.id,
        total: calculatedTotal > 0 ? calculatedTotal : total,
        status: 'PAID',
        paymentRef: 'DEMO-' + Date.now(),
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.salePrice || item.price,
          }))
        }
      },
      include: { items: true },
    });

    // Send email to user if logged in
    const userEmail = session?.user?.email;
    if (userEmail) {
      const emailData = {
        orderNo: order.orderNo,
        total: order.total,
        address: {
          title: addressRecord.title,
          phone: addressInfo.telefon,
          fullAddress: addressRecord.address,
        },
        items: items.map((item: any) => ({
          name: item.name,
          variant: item.variant,
          quantity: item.quantity,
          price: item.salePrice || item.price
        }))
      };
      sendOrderEmail(userEmail, emailData).catch(console.error);
    }

    return NextResponse.json({ success: true, orderNo: order.orderNo }, { status: 201 });
  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ message: 'Sipariş oluşturulamadı.' }, { status: 500 });
  }
}
