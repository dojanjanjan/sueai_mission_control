'use client';

import { motion } from 'framer-motion';
import { mockAIPulse } from '@/lib/mockData';
import { Brain } from 'lucide-react';

export default function AIPulse() {
  const { status, activityLevel } = mockAIPulse;

  const statusConfig = {
    standby: {
      color: 'from-electric-blue to-cyan-400',
      pulseSpeed: 'pulse-slow',
      label: 'Standby',
    },
    thinking: {
      color: 'from-gold to-yellow-400',
      pulseSpeed: 'pulse-medium',
      label: 'Thinking',
    },
    executing: {
      color: 'from-emerald-green to-green-400',
      pulseSpeed: 'pulse-fast',
      label: 'Executing',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-gradient" />
        <span className="text-gradient">The AI Pulse</span>
      </h2>
      
      <div className="flex flex-col items-center justify-center py-8">
        {/* Pulsing Orb */}
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          {/* Outer pulse rings */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.color} opacity-30`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.color} opacity-20`}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
              ease: 'easeInOut',
            }}
          />
          
          {/* Main orb */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.color} shadow-2xl`}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
          
          {/* Activity level indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              {activityLevel}%
            </span>
          </div>
        </div>

        {/* Status label */}
        <motion.div
          className="mt-6 text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={`inline-block px-4 py-2 rounded-full glass border-2 ${
            status === 'standby' ? 'border-electric-blue/50' :
            status === 'thinking' ? 'border-gold/50' :
            'border-emerald-green/50'
          }`}>
            <span className="text-sm font-semibold">{config.label}</span>
          </div>
        </motion.div>

        {/* Waveform visualization */}
        <div className="mt-6 w-full max-w-xs">
          <div className="flex items-end justify-center gap-1 h-12">
            {Array.from({ length: 20 }).map((_, i) => {
              const height = Math.sin((i / 20) * Math.PI * 2 + Date.now() / 500) * 0.5 + 0.5;
              return (
                <motion.div
                  key={i}
                  className="w-1.5 rounded-t bg-gradient-to-t from-electric-blue to-cyan-400"
                  animate={{
                    height: `${height * 100}%`,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
