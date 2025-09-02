'use client';

import { motion } from 'framer-motion';
import { Counter } from '@/components/ui/counter';
import { Smartphone, Zap, TreePine, Recycle } from 'lucide-react';

const stats = [
  {
    icon: Smartphone,
    value: 15420,
    label: 'Devices Collected',
    suffix: '+',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    icon: Zap,
    value: 98.7,
    label: 'Energy Saved (MWh)',
    decimals: 1,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
  },
  {
    icon: TreePine,
    value: 2847,
    label: 'Trees Preserved',
    suffix: '+',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    icon: Recycle,
    value: 125.6,
    label: 'E-waste Recycled (Tons)',
    decimals: 1,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
];

export function StatsSection() {
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
            Our Environmental Impact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Together, we're making a difference in reducing electronic waste and 
            promoting sustainable practices for a cleaner future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex p-4 rounded-full ${stat.bgColor} mb-4`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              
              <div className={`${stat.color} mb-2`}>
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2.5}
                />
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Sustainability Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Every device you recycle with us contributes to a cleaner environment. 
              We ensure responsible disposal, refurbishment, and recycling of electronic devices.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                ♻️ Certified E-waste Recycling
              </span>
              <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                🌱 Carbon Neutral Operations
              </span>
              <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                🔋 Battery Safe Disposal
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}