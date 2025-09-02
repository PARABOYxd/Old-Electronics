'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    content: 'Excellent service! They picked up my old laptop within 2 hours and paid me ₹8,500 on the spot. Very professional and trustworthy.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Delhi, India',
    rating: 5,
    content: 'I was amazed by how quick and easy the process was. Sold 3 old phones and got ₹12,000. Highly recommend EZElectronicsPickup!',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
  },
  {
    id: 3,
    name: 'Amit Patel',
    location: 'Bangalore, Karnataka',
    rating: 5,
    content: 'Great environmental initiative! Happy to contribute to e-waste recycling while earning money. The team is very knowledgeable.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=150',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    location: 'Hyderabad, Telangana',
    rating: 4,
    content: 'Smooth pickup process and fair pricing. The only suggestion is to improve the tracking system, but overall very satisfied.',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=150',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    location: 'Pune, Maharashtra',
    rating: 5,
    content: 'Outstanding customer service. They helped me understand the value of my devices and provided accurate quotes. Will definitely use again!',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?w=150',
  },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what thousands of satisfied customers have to say about our service.
          </p>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {testimonials.slice(currentIndex, currentIndex + 3).concat(
                  testimonials.slice(0, Math.max(0, currentIndex + 3 - testimonials.length))
                ).slice(0, 3).map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 mr-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-green-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}