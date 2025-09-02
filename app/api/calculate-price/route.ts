import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { modelId, conditionId } = await request.json();

    if (!modelId || !conditionId) {
      return NextResponse.json(
        { error: 'Model ID and Condition ID are required' },
        { status: 400 }
      );
    }

    const [model, condition] = await Promise.all([
      prisma.model.findUnique({
        where: { id: modelId },
        include: {
          brand: {
            include: {
              device: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      }),
      prisma.condition.findUnique({
        where: { id: conditionId },
      }),
    ]);

    if (!model || !condition) {
      return NextResponse.json(
        { error: 'Model or condition not found' },
        { status: 404 }
      );
    }

    // Find the most specific pricing rule
    const pricingRules = await prisma.pricingRule.findMany({
      where: {
        isActive: true,
        OR: [
          { modelId: modelId },
          { brandId: model.brandId },
          { deviceId: model.brand.deviceId },
          { categoryId: model.brand.device.categoryId },
          {
            categoryId: null,
            deviceId: null,
            brandId: null,
            modelId: null,
          },
        ],
      },
      orderBy: [
        { modelId: 'desc' },
        { brandId: 'desc' },
        { deviceId: 'desc' },
        { categoryId: 'desc' },
      ],
    });

    let basePrice = 1000; // Default base price

    if (pricingRules.length > 0) {
      basePrice = pricingRules[0].basePrice;
    }

    const estimatedPrice = Math.round(basePrice * condition.multiplier);

    return NextResponse.json({
      estimatedPrice,
      basePrice,
      conditionMultiplier: condition.multiplier,
    });
  } catch (error) {
    console.error('Price calculation failed:', error);
    return NextResponse.json(
      { error: 'Failed to calculate price' },
      { status: 500 }
    );
  }
}