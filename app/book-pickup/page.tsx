import { PickupBookingForm } from '@/components/pickup-booking-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Pickup - EZElectronicsPickup | Free Doorstep Pickup Service',
  description: 'Book a free doorstep pickup for your old electronics. Get instant quotes and sell your devices hassle-free with EZElectronicsPickup.',
  keywords: 'electronics pickup, sell electronics, mobile pickup, laptop pickup, instant quote',
};

export default function BookPickupPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Book Your Free Pickup
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get an instant quote for your electronics and schedule a convenient pickup time. 
            We'll handle the rest!
          </p>
        </div>

        <PickupBookingForm />
      </div>
    </div>
  );
}