import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Yetkisiz' }, { status: 403 });
  }

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(leads);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Yetkisiz' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const newLead = await prisma.lead.create({
      data: {
        companyName: data.companyName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        notes: data.notes
      }
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Potansiyel müşteri kaydedilemedi' }, { status: 500 });
  }
}
