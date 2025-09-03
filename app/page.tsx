import { HeroSection } from '@/components/hero-section';
import { StatsSection } from '@/components/stats-section';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import { CoverageMap } from '@/components/coverage-map';
import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, CreditCard, Truck, Recycle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const steps = [
  {
    icon: Smartphone,
    title: 'Choose Your Device',
    description: 'Select your device category, brand, model and condition for instant pricing',
  },
  {
    icon: CreditCard,
    title: 'Get Instant Quote',
    description: 'Receive accurate pricing based on current market rates and device condition',
  },
  {
    icon: Truck,
    title: 'Schedule Pickup',
    description: 'Book a convenient pickup slot and our team will collect from your doorstep',
  },
];

const features = [
  {
    title: 'Free Doorstep Pickup',
    description: 'We come to you - no need to travel or ship your devices',
    icon: '🚚',
  },
  {
    title: 'Instant Cash Payment',
    description: 'Get paid immediately after device verification',
    icon: '💰',
  },
  {
    title: 'Secure Data Wiping',
    description: 'Professional data destruction for your privacy',
    icon: '🔒',
  },
  {
    title: 'Environmental Impact',
    description: 'Contribute to e-waste reduction and recycling',
    icon: '🌱',
  },
  {
    title: 'Fair Market Pricing',
    description: 'Competitive rates based on real-time market values',
    icon: '📊',
  },
  {
    title: 'Quick 30-Min Pickup',
    description: 'Fast pickup within 30 minutes in major cities',
    icon: '⚡',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works - Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Sell your electronics in just a few clicks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                  <div className="inline-flex p-4 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                    <step.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-green-600 h-8 w-8" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/book-pickup">
                Start Selling Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose EZElectronicsPickup?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We make selling electronics easy, secure, and rewarding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel />
      <CoverageMap />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Turn Your Old Electronics into Cash?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of satisfied customers who have already sold their devices with us.
            Get started in less than 2 minutes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/book-pickup">
                Book Free Pickup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-black border-white hover:bg-white hover:text-green-600">
              <Link href="/track">
                Track Your Pickup
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}