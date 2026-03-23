import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendOrderEmail } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { items, addressInfo, total } = body;

    if (!items || !items.length) {
      return NextResponse.json({ message: 'Sepetiniz boş' }, { status: 400 });
    }

    // Ensure a user exists (if guest, create a mock user or find anon user logic)
    // For demo simplicity, since the user is likely authenticated or acting as a guest, 
    // we use their session ID or a hardcoded 'guest' ID in DB (but Prisma schema requires userId).
    const userId = (session?.user as any)?.id;
    let finalUserId = userId;

    if (!finalUserId) {
        // Fallback for guest checkout during demo
        const guestUser = await prisma.user.upsert({
            where: { email: 'guest@claudecoffee.com' },
            create: { name: 'Misafir', email: 'guest@claudecoffee.com', role: 'USER' },
            update: {}
        });
        finalUserId = guestUser.id;
    }

    // 1. Create Address record
    const addressRecord = await prisma.address.create({
      data: {
        userId: finalUserId,
        title: `${addressInfo.ad} ${addressInfo.soyad}`,
        city: 'Belirtilmedi', // Could extract from form
        district: 'Belirtilmedi', // Could extract from form
        address: addressInfo.acikAdres,
      }
    });

    // Pre-insert mock products to satisfy Foreign Key relation if they don't exist
    for (const item of items) {
      await prisma.product.upsert({
        where: { slug: item.productId }, // Using productId as slug for demo safety
        update: {},
        create: {
          id: item.productId,
          name: item.name,
          slug: item.productId,
          description: 'Demo Ürünü',
          price: item.price,
          salePrice: item.salePrice,
          categoryName: 'Demo',
          stock: 100,
          images: '[]'
        }
      });
    }

    // 2. Create Order & OrderItems in transaction
    const orderNo = 'CLD' + Math.floor(Math.random() * 1000000);
    const order = await prisma.order.create({
      data: {
        orderNo,
        userId: finalUserId,
        addressId: addressRecord.id,
        total: total,
        status: 'PAID', // Simulating successful PayTR payment
        paymentRef: 'DEMO-' + Date.now(),
        items: {
          create: items.map((item: any) => ({
            productId: item.productId, 
            quantity: item.quantity,
            price: item.salePrice || item.price,
          }))
        }
      },
      include: {
        items: true,
      }
    });

    // 3. Send email to requested user
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

    // Background job for email
    sendOrderEmail('furkacetinkaya95@gmail.com', emailData).catch(console.error);

    return NextResponse.json({ success: true, orderNo: order.orderNo }, { status: 201 });
  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ message: 'Sipariş oluşturulamadı.' }, { status: 500 });
  }
}
