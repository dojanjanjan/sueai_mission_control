'use client';

import { motion } from 'framer-motion';
import { mockNeuralActivity } from '@/lib/mockData';
import { Terminal } from 'lucide-react';

const typeColors = {
  search: 'text-electric-blue',
  update: 'text-emerald-green',
  execute: 'text-gold',
  analyze: 'text-deep-purple',
};

const typeIcons = {
  search: '🔍',
  update: '🔄',
  execute: '⚡',
  analyze: '📊',
};

export default function NeuralActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Terminal className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Recent Neural Activity</span>
      </h2>
      
      <div className="glass rounded-lg p-4 font-mono text-sm space-y-3">
        {mockNeuralActivity.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            className="flex items-start gap-3"
          >
            <span className="text-white/40 text-xs mt-1">{activity.timestamp}</span>
            <span className="text-lg">{typeIcons[activity.type]}</span>
            <span className={`flex-1 ${typeColors[activity.type]}`}>
              {activity.action}
            </span>
            <motion.span
              className="text-electric-blue"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ▋
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
