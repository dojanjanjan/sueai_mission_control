'use client';

import { motion } from 'framer-motion';
import { Home, Cpu, Briefcase, User } from 'lucide-react';
import { TabType } from './Navigation';

const navItems = [
  { id: 'overview' as TabType, label: 'Overview', icon: Home },
  { id: 'system' as TabType, label: 'System', icon: Cpu },
  { id: 'business' as TabType, label: 'Business', icon: Briefcase },
  { id: 'private' as TabType, label: 'Privat', icon: User },
];

interface MobileNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function MobileNav({ activeTab, onTabChange }: MobileNavProps) {

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
              onClick={() => onTabChange(item.id)}
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
