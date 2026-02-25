'use client';

import { getTimeGreeting, getCurrentDate } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function Header() {
  const greeting = getTimeGreeting();
  const currentDate = getCurrentDate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {greeting}, <span className="text-gradient">Tung</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base">{currentDate}</p>
        </div>
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full glass flex items-center justify-center">
          <span className="text-xl md:text-2xl">👤</span>
        </div>
      </div>
    </motion.header>
  );
}
