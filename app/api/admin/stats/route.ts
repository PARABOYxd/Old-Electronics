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

    const [
      totalBookings,
      pendingBookings,
      completedBookings,
      totalRevenueResult,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.booking.count({ where: { status: 'COMPLETED' } }),
      prisma.booking.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { finalPrice: true },
      }),
    ]);

    const stats = {
      totalBookings,
      pendingBookings,
      completedBookings,
      totalRevenue: totalRevenueResult._sum.finalPrice || 0,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}