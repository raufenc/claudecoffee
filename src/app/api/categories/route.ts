import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const categories = await prisma.category.findMany({ 
    orderBy: { name: 'asc' } 
  });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 403 });
  }

  try {
    const { name } = await req.json();
    const slug = name.toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const category = await prisma.category.create({
      data: { name, slug }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'Bu grup zaten mevcut.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Grup oluşturulamadı.' }, { status: 500 });
  }
}
