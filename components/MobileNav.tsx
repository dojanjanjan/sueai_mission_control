'use client';

import { motion } from 'framer-motion';
import { Home, Puzzle, Settings } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'skills', label: 'Skills', icon: Puzzle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 md:hidden z-50"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/5 rounded-t-2xl"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <IconComponent
                className={`w-5 h-5 relative z-10 transition-colors ${
                  isActive ? 'text-electric-blue' : 'text-white/60'
                }`}
              />
              <span
                className={`text-xs relative z-10 transition-colors ${
                  isActive ? 'text-electric-blue font-semibold' : 'text-white/60'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
