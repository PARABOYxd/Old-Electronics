'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  IndianRupee,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Edit
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Booking {
  id: string;
  referenceCode: string;
  customerName: string;
  contactNumber: string;
  email: string;
  address: string;
  pincode: string;
  estimatedPrice: number;
  finalPrice?: number;
  pickupDate: string;
  preferredTimeSlot: string;
  status: string;
  notes?: string;
  city: { name: string; state: string };
  model: {
    name: string;
    brand: {
      name: string;
      device: {
        name: string;
        category: { name: string };
      };
    };
  };
  variant?: { name: string };
  condition: { name: string };
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  PENDING: {
    label: 'Pending Confirmation',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
    description: 'Your booking is being processed by our team',
  },
  CONFIRMED: {
    label: 'Pickup Confirmed',
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle,
    description: 'Your pickup has been confirmed and scheduled',
  },
  PICKED: {
    label: 'Device Picked Up',
    color: 'bg-purple-100 text-purple-800',
    icon: Truck,
    description: 'Your device has been collected and is being evaluated',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    description: 'Transaction completed successfully',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: Clock,
    description: 'This booking has been cancelled',
  },
  RESCHEDULED: {
    label: 'Rescheduled',
    color: 'bg-orange-100 text-orange-800',
    icon: Calendar,
    description: 'Pickup has been rescheduled to a new date',
  },
};

export default function TrackPickupPage({
  params,
}: {
  params: { referenceCode: string };
}) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const response = await fetch(
        `/api/bookings?referenceCode=${params.referenceCode}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setBooking(data.booking);
      } else {
        setError('Booking not found. Please check your reference code.');
      }
    } catch (err) {
      setError('Failed to fetch booking details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4" />
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-2">
              Booking Not Found
            </h1>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/track">Try Again</Link>
              </Button>
              <Button asChild>
                <Link href="/book-pickup">Book New Pickup</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const currentStatus = statusConfig[booking.status as keyof typeof statusConfig];
  const StatusIcon = currentStatus?.icon || Package;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Pickup Status
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Reference: <span className="font-mono">{booking.referenceCode}</span>
            </p>
          </div>

          {/* Status Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusIcon className="h-6 w-6 text-green-600" />
                  <span>Current Status</span>
                </div>
                <Badge className={currentStatus?.color || 'bg-gray-100'}>
                  {currentStatus?.label || booking.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {currentStatus?.description}
              </p>

              {/* Status Timeline */}
              <div className="space-y-4">
                {Object.entries(statusConfig).map(([status, config], index) => {
                  const isCompleted = 
                    (booking.status === 'CONFIRMED' && ['PENDING'].includes(status)) ||
                    (booking.status === 'PICKED' && ['PENDING', 'CONFIRMED'].includes(status)) ||
                    (booking.status === 'COMPLETED' && ['PENDING', 'CONFIRMED', 'PICKED'].includes(status));
                  const isCurrent = booking.status === status;

                  return (
                    <div key={status} className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted || isCurrent 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <config.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          isCompleted || isCurrent 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-500'
                        }`}>
                          {config.label}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {config.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Device Information
                  </h4>
                  <div className="text-sm space-y-1 ml-6">
                    <p><span className="font-medium">Category:</span> {booking.model.brand.device.category.name}</p>
                    <p><span className="font-medium">Device:</span> {booking.model.brand.device.name}</p>
                    <p><span className="font-medium">Brand:</span> {booking.model.brand.name}</p>
                    <p><span className="font-medium">Model:</span> {booking.model.name}</p>
                    {booking.variant && (
                      <p><span className="font-medium">Variant:</span> {booking.variant.name}</p>
                    )}
                    <p><span className="font-medium">Condition:</span> {booking.condition.name}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    Pricing Information
                  </h4>
                  <div className="text-sm space-y-1 ml-6">
                    <p><span className="font-medium">Estimated Price:</span> ₹{booking.estimatedPrice}</p>
                    {booking.finalPrice && (
                      <p><span className="font-medium">Final Price:</span> ₹{booking.finalPrice}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      *Final price confirmed after physical inspection
                    </p>
                  </div>
                </div>

                {booking.notes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Additional Notes</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {booking.notes}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Pickup Details */}
            <Card>
              <CardHeader>
                <CardTitle>Pickup Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Scheduled Time
                  </h4>
                  <div className="text-sm space-y-1 ml-6">
                    <p><span className="font-medium">Date:</span> {new Date(booking.pickupDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Time Slot:</span> {booking.preferredTimeSlot}</p>
                    <p><span className="font-medium">Booked on:</span> {new Date(booking.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Pickup Address
                  </h4>
                  <div className="text-sm space-y-1 ml-6">
                    <p><span className="font-medium">Customer:</span> {booking.customerName}</p>
                    <p><span className="font-medium">Contact:</span> {booking.contactNumber}</p>
                    {booking.email && (
                      <p><span className="font-medium">Email:</span> {booking.email}</p>
                    )}
                    <p><span className="font-medium">Address:</span> {booking.address}</p>
                    <p><span className="font-medium">City:</span> {booking.city.name}, {booking.city.state}</p>
                    <p><span className="font-medium">Pincode:</span> {booking.pincode}</p>
                  </div>
                </div>

                <Separator />

                {/* Contact Options */}
                <div>
                  <h4 className="font-semibold mb-3">Need Help?</h4>
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Support
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace('+', '')}?text=Hi, I need help with my booking ${booking.referenceCode}`}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp Support
                      </Link>
                    </Button>
                    {booking.status === 'PENDING' && (
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Request Reschedule
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/book-pickup">Book Another Pickup</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}