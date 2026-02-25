'use client';

import { motion } from 'framer-motion';
import { Play, Plus, AlertTriangle } from 'lucide-react';

const controls = [
  {
    id: 'healthcheck',
    label: 'Start Healthcheck',
    icon: Play,
    color: 'from-electric-blue to-cyan-400',
  },
  {
    id: 'new-skill',
    label: 'New Skill',
    icon: Plus,
    color: 'from-deep-purple to-pink-500',
  },
  {
    id: 'emergency',
    label: 'Emergency Stop',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-500',
  },
];

export default function SmartControls() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        <span className="text-gradient">Smart Controls</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {controls.map((control, index) => {
          const IconComponent = control.icon;
          return (
            <motion.button
              key={control.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`glass rounded-xl p-6 text-left glass-hover relative overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${control.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg glass flex items-center justify-center mb-3 bg-gradient-to-br ${control.color} opacity-80`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="text-base font-semibold block">{control.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
