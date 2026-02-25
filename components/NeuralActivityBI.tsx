'use client';

import { motion } from 'framer-motion';
import { neuralActivityBI } from '@/lib/forecastData';
import { Terminal, Brain, AlertCircle, TrendingUp } from 'lucide-react';

const typeIcons = {
  prediction: Brain,
  analysis: TrendingUp,
  alert: AlertCircle,
};

const typeColors = {
  prediction: 'text-electric-blue',
  analysis: 'text-emerald-green',
  alert: 'text-red-400',
};

export default function NeuralActivityBI() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Terminal className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Recent Neural Activity (BI)</span>
      </h2>
      
      <div className="glass rounded-lg p-4 font-mono text-sm space-y-3">
        {neuralActivityBI.map((activity, index) => {
          const IconComponent = typeIcons[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="text-white/40 text-xs mt-1">{activity.timestamp}</span>
              <IconComponent className={`w-4 h-4 mt-1 ${typeColors[activity.type]}`} />
              <span className={`flex-1 ${typeColors[activity.type]}`}>
                [{activity.type === 'prediction' ? 'Neural' : activity.type === 'analysis' ? 'Analysis' : 'Alert'}] {activity.action}
                {activity.confidence && (
                  <span className="text-white/60 ml-2">(Confidence {activity.confidence}%)</span>
                )}
              </span>
              <motion.span
                className="text-electric-blue"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ▋
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
