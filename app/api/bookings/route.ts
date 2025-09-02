import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/lib/validations/booking';
import { generateReferenceCode } from '@/lib/utils/reference-generator';
import { sendBookingEmail, sendWhatsAppMessage, generateBookingWhatsAppMessage } from '@/lib/utils/notifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // Generate unique reference code
    let referenceCode = generateReferenceCode();
    let isUnique = false;
    
    while (!isUnique) {
      const existing = await prisma.booking.findUnique({
        where: { referenceCode },
      });
      
      if (!existing) {
        isUnique = true;
      } else {
        referenceCode = generateReferenceCode();
      }
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        ...validatedData,
        referenceCode,
        estimatedPrice: body.estimatedPrice,
        pickupDate: new Date(validatedData.pickupDate),
      },
      include: {
        city: true,
        model: {
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
        },
        variant: true,
        condition: true,
      },
    });

    // Send notifications
    try {
      await sendBookingEmail(booking);
      
      // Send WhatsApp message to customer
      const whatsappMessage = generateBookingWhatsAppMessage(booking);
      await sendWhatsAppMessage(booking.contactNumber, whatsappMessage);
      
      // Send WhatsApp message to admin
      const adminMessage = `🔔 New Booking Alert!

Reference: ${booking.referenceCode}
Customer: ${booking.customerName}
Contact: ${booking.contactNumber}
Device: ${booking.model.brand.name} ${booking.model.name}
Estimated: ₹${booking.estimatedPrice}
Pickup: ${new Date(booking.pickupDate).toLocaleDateString()} - ${booking.preferredTimeSlot}
Address: ${booking.address}, ${booking.city.name}

Admin Panel: ${process.env.SITE_URL}/admin`;
      
      if (process.env.ADMIN_PHONE) {
        await sendWhatsAppMessage(process.env.ADMIN_PHONE, adminMessage);
      }
    } catch (notificationError) {
      console.error('Notification failed:', notificationError);
      // Don't fail the booking if notifications fail
    }

    return NextResponse.json({
      success: true,
      referenceCode: booking.referenceCode,
      booking: {
        id: booking.id,
        referenceCode: booking.referenceCode,
        customerName: booking.customerName,
        estimatedPrice: booking.estimatedPrice,
      },
    });
  } catch (error) {
    console.error('Booking creation failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const referenceCode = searchParams.get('referenceCode');

  if (!referenceCode) {
    return NextResponse.json(
      { error: 'Reference code is required' },
      { status: 400 }
    );
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { referenceCode },
      include: {
        city: true,
        model: {
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
        },
        variant: true,
        condition: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Failed to fetch booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}