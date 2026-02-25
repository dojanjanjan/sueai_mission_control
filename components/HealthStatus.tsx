'use client';

import { motion } from 'framer-motion';
import { mockHealthData } from '@/lib/mockData';
import { Droplet, Moon } from 'lucide-react';

export default function HealthStatus() {
  const { waterIntake, waterGoal, sleepDuration, sleepQuality } = mockHealthData;
  const waterPercentage = (waterIntake / waterGoal) * 100;
  const sleepPercentage = (sleepDuration / 8) * 100; // Assuming 8 hours is ideal

  const qualityColors = {
    excellent: 'from-emerald-green to-electric-blue',
    good: 'from-electric-blue to-deep-purple',
    fair: 'from-deep-purple to-gold',
    poor: 'from-red-500 to-orange-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-gradient">Health Status</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Water Intake */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-electric-blue" />
              <span className="text-sm text-white/80">Water Intake</span>
            </div>
            <span className="text-lg font-bold">
              {waterIntake}ml / {waterGoal}ml
            </span>
          </div>
          
          {/* 3D Glass Effect Water Container */}
          <div className="relative h-32 rounded-lg overflow-hidden glass border-2 border-white/20">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${waterPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-electric-blue/80 to-cyan-400/60"
              style={{
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse-slow"></div>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white/90 drop-shadow-lg">
                {Math.round(waterPercentage)}%
              </span>
            </div>
          </div>
        </div>

        {/* Sleep Statistics */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-deep-purple" />
              <span className="text-sm text-white/80">Sleep Quality</span>
            </div>
            <span className="text-lg font-bold">{sleepDuration}h</span>
          </div>
          
          {/* Circular Sleep Ring */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-white/10"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#sleepGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - sleepPercentage / 100) }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <defs>
                <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#00D9FF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{sleepDuration}h</span>
              <span className="text-xs text-white/60 capitalize">{sleepQuality}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
