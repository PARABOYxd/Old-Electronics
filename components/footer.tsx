import Link from 'next/link';
import { Smartphone, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const footerNavigation = {
  services: [
    { name: 'Mobile Pickup', href: '/services/mobile' },
    { name: 'Laptop Pickup', href: '/services/laptop' },
    { name: 'Tablet Pickup', href: '/services/tablet' },
    { name: 'Gaming Console', href: '/services/gaming' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Careers', href: '/careers' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Track Pickup', href: '/track' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund' },
    { name: 'Data Protection', href: '/data-protection' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Smartphone className="h-8 w-8 text-green-400" />
              <span className="font-bold text-xl">EZElectronicsPickup</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-sm">
              India's most trusted electronics pickup and resale platform. 
              Get instant cash for your old devices with free doorstep pickup.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-sm">support@ezelectronicspickup.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-sm">Available in 50+ cities across India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 EZElectronicsPickup. All rights reserved.
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>🌱 Carbon Neutral Operations</span>
                <span className="mx-2">•</span>
                <span>♻️ Certified E-waste Recycling</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace('+', '')}`}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
              <div className="text-xs text-gray-500">
                Trusted by 10,000+ customers
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}