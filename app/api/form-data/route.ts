import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [cities, categories, conditions] = await Promise.all([
      prisma.city.findMany({
        where: { isActive: true },
        select: { id: true, name: true, state: true },
        orderBy: { name: 'asc' },
      }),
      prisma.category.findMany({
        where: { isActive: true },
        include: {
          devices: {
            where: { isActive: true },
            include: {
              brands: {
                where: { isActive: true },
                include: {
                  models: {
                    where: { isActive: true },
                    include: {
                      variants: {
                        where: { isActive: true },
                        select: { id: true, name: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.condition.findMany({
        where: { isActive: true },
        select: { id: true, name: true, multiplier: true },
        orderBy: { name: 'asc' },
      }),
    ]);

    return NextResponse.json({
      cities,
      categories,
      conditions,
    });
  } catch (error) {
    console.error('Failed to fetch form data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form data' },
      { status: 500 }
    );
  }
}