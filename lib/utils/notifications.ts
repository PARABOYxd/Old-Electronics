import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendBookingEmail(booking: any) {
  const customerEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #22c55e;">Booking Confirmed - ${booking.referenceCode}</h2>
      <p>Dear ${booking.customerName},</p>
      <p>Thank you for choosing EZElectronicsPickup! Your booking has been confirmed.</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Booking Details:</h3>
        <p><strong>Reference Code:</strong> ${booking.referenceCode}</p>
        <p><strong>Device:</strong> ${booking.model.brand.name} ${booking.model.name}</p>
        <p><strong>Estimated Price:</strong> ₹${booking.estimatedPrice}</p>
        <p><strong>Pickup Date:</strong> ${new Date(booking.pickupDate).toLocaleDateString()}</p>
        <p><strong>Time Slot:</strong> ${booking.preferredTimeSlot}</p>
        <p><strong>Address:</strong> ${booking.address}, ${booking.city.name}, ${booking.pincode}</p>
      </div>

      <p>Our team will contact you shortly to confirm the pickup details.</p>
      <p>Track your pickup: <a href="${process.env.SITE_URL}/track/${booking.referenceCode}">Click here</a></p>
      
      <p>Best regards,<br>EZElectronicsPickup Team</p>
    </div>
  `;

  if (booking.email) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: `Booking Confirmed - ${booking.referenceCode}`,
      html: customerEmailHtml,
    });
  }

  // Admin notification
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Pickup Booking - ${booking.referenceCode}`,
    html: `
      <h2>New Booking Received</h2>
      <p><strong>Reference:</strong> ${booking.referenceCode}</p>
      <p><strong>Customer:</strong> ${booking.customerName}</p>
      <p><strong>Contact:</strong> ${booking.contactNumber}</p>
      <p><strong>Device:</strong> ${booking.model.brand.name} ${booking.model.name}</p>
      <p><strong>Estimated Price:</strong> ₹${booking.estimatedPrice}</p>
      <p><strong>Pickup:</strong> ${new Date(booking.pickupDate).toLocaleDateString()} - ${booking.preferredTimeSlot}</p>
      <p><strong>Address:</strong> ${booking.address}, ${booking.city.name}, ${booking.pincode}</p>
    `,
  });
}

export async function sendWhatsAppMessage(phoneNumber: string, message: string) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'text',
          text: { body: message },
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error('WhatsApp message failed:', error);
    return null;
  }
}

export function generateBookingWhatsAppMessage(booking: any) {
  return `🎉 Booking Confirmed!

Reference: ${booking.referenceCode}
Device: ${booking.model.brand.name} ${booking.model.name}
Estimated Price: ₹${booking.estimatedPrice}
Pickup: ${new Date(booking.pickupDate).toLocaleDateString()} - ${booking.preferredTimeSlot}

Our team will contact you soon!

Track: ${process.env.SITE_URL}/track/${booking.referenceCode}

- EZElectronicsPickup Team`;
}