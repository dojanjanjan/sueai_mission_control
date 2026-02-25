'use client';

import { motion } from 'framer-motion';
import { mockLocationContext } from '@/lib/mockData';
import { MapPin, CloudSun } from 'lucide-react';

export default function LocationContext() {
  const { location, weather, temperature, weatherIcon } = mockLocationContext;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Location Context</span>
      </h2>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl glass flex items-center justify-center">
            <CloudSun className="w-8 h-8 text-electric-blue" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">{location}</h3>
            <p className="text-sm text-white/60">{weather}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gradient">{temperature}°C</div>
          <p className="text-xs text-white/60">Current</p>
        </div>
      </div>
    </motion.div>
  );
}
