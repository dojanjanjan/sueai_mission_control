'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Cpu, Briefcase, User } from 'lucide-react';

export type TabType = 'overview' | 'system' | 'business' | 'private';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'overview' as TabType, label: 'Overview', icon: null },
  { id: 'system' as TabType, label: 'System', icon: Cpu },
  { id: 'business' as TabType, label: 'Business', icon: Briefcase },
  { id: 'private' as TabType, label: 'Privat', icon: User },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-2 mb-6"
    >
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 relative ${
                isActive
                  ? 'bg-gradient-to-r from-electric-blue/20 to-deep-purple/20 text-electric-blue'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <span className="font-semibold text-sm md:text-base">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-xl border border-electric-blue/50"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
