import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Simple auth check - in production, implement proper JWT validation
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-demo-token') {
      // For demo purposes, allow access without auth
      // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        city: { select: { name: true } },
        model: {
          include: {
            brand: { select: { name: true } },
          },
        },
      },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Failed to fetch admin bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}