'use client';

import { motion } from 'framer-motion';
import { mockSleepData } from '@/lib/mockData';
import { Moon, Clock } from 'lucide-react';

const qualityColors = {
  excellent: 'from-emerald-green to-electric-blue',
  good: 'from-electric-blue to-deep-purple',
  fair: 'from-deep-purple to-gold',
  poor: 'from-red-500 to-orange-500',
};

export default function Sleep() {
  const { duration, quality, bedtime, wakeTime, deepSleep, remSleep, lightSleep, weeklyData } = mockSleepData;

  const maxDuration = Math.max(...weeklyData.map(d => d.duration));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Moon className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Sleep</span>
      </h2>
      
      {/* Today's Sleep */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold mb-1">{duration}h</div>
            <p className="text-sm text-white/60 capitalize">{quality} Sleep</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/80 mb-1">Bedtime</div>
            <div className="text-lg font-semibold">{bedtime}</div>
            <div className="text-sm text-white/80 mt-2 mb-1">Wake Time</div>
            <div className="text-lg font-semibold">{wakeTime}</div>
          </div>
        </div>

        {/* Sleep Stages */}
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold mb-3 text-white/80">Sleep Stages</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-white/60">Deep Sleep</span>
                <span className="text-xs font-semibold">{deepSleep}h</span>
              </div>
              <div className="h-2 glass rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(deepSleep / duration) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-deep-purple to-electric-blue rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-white/60">REM Sleep</span>
                <span className="text-xs font-semibold">{remSleep}h</span>
              </div>
              <div className="h-2 glass rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(remSleep / duration) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-electric-blue to-cyan-400 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-white/60">Light Sleep</span>
                <span className="text-xs font-semibold">{lightSleep}h</span>
              </div>
              <div className="h-2 glass rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(lightSleep / duration) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-green rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-white/80">7-Tage Übersicht</h3>
        <div className="h-32 glass rounded-lg p-4 flex items-end gap-2">
          {weeklyData.map((day, index) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.duration / maxDuration) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                className={`w-full bg-gradient-to-t ${qualityColors[day.quality]} rounded-t`}
              />
              <span className="text-xs text-white/60 mt-1">
                {new Date(day.date).toLocaleDateString('de-DE', { day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
