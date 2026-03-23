import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const settings = await prisma.siteSetting.findMany();
  const settingsMap = settings.reduce((acc: any, s: any) => {
    acc[s.key] = s.value;
    return acc;
  }, {});
  return NextResponse.json(settingsMap);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 403 });
    }

    const body = await req.json();
    
    // Body should be an object of key: value pairs
    const updatePromises = Object.keys(body).map((key) => 
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(body[key]) },
        create: { key, value: String(body[key]) }
      })
    );

    await Promise.all(updatePromises);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Settings save failed:', error);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}
