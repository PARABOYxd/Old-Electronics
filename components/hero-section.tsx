'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Got old electronics?{' '}
                <span className="text-green-600 dark:text-green-400">
                  We'll pick it up
                </span>{' '}
                & pay you instantly.
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Door-to-door free pickup. Trusted & fast. Turn your old devices into instant cash.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/book-pickup">
                  Get Instant Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <div className="flex gap-2">
                <Button asChild variant="outline" size="lg">
                  <Link href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace('+', '')}`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Trust Elements */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">Trusted by 10,000+ customers</p>
              <div className="flex items-center gap-4 opacity-60">
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-xs font-semibold">Media 1</span>
                </div>
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-xs font-semibold">Media 2</span>
                </div>
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-xs font-semibold">Media 3</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/163166/mobile-phone-android-apps-phone-163166.jpeg"
                alt="Electronics pickup service"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <p className="text-sm font-semibold text-green-600">Free Pickup</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">No charges</p>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
              className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <p className="text-sm font-semibold text-blue-600">Instant Payment</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">On the spot</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}