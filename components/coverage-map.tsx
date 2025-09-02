'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';

const cities = [
  { name: 'Mumbai', state: 'Maharashtra', isActive: true },
  { name: 'Delhi', state: 'Delhi', isActive: true },
  { name: 'Bangalore', state: 'Karnataka', isActive: true },
  { name: 'Hyderabad', state: 'Telangana', isActive: true },
  { name: 'Chennai', state: 'Tamil Nadu', isActive: true },
  { name: 'Pune', state: 'Maharashtra', isActive: true },
  { name: 'Kolkata', state: 'West Bengal', isActive: true },
  { name: 'Ahmedabad', state: 'Gujarat', isActive: true },
  { name: 'Jaipur', state: 'Rajasthan', isComingSoon: true },
  { name: 'Lucknow', state: 'Uttar Pradesh', isComingSoon: true },
  { name: 'Indore', state: 'Madhya Pradesh', isComingSoon: true },
  { name: 'Bhopal', state: 'Madhya Pradesh', isComingSoon: true },
];

export function CoverageMap() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Service Coverage & Expansion
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're currently serving major cities across India and rapidly expanding 
            to bring our services closer to you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Cities We Serve
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cities.filter(city => city.isActive).map((city, index) => (
                    <motion.div
                      key={city.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    >
                      <MapPin className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {city.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {city.state}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Coming Soon
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cities.filter(city => city.isComingSoon).map((city, index) => (
                    <motion.div
                      key={city.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                    >
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {city.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {city.state}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-8 rounded-2xl">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Expansion Plans 2024-2025
              </h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                  50+ cities by end of 2024
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  Tier-2 and Tier-3 city coverage
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  Same-day pickup guarantee
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3" />
                  24/7 customer support
                </li>
              </ul>

              <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Don't see your city? Request coverage:
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Enter your city name"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700"
                  />
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors">
                    Request
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}