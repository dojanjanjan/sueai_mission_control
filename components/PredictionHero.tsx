'use client';

import { motion } from 'framer-motion';
import { forecastData } from '@/lib/forecastData';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const statusColors = {
  optimal: 'bg-emerald-green/20 text-emerald-green border-emerald-green/50',
  warning: 'bg-red-500/20 text-red-400 border-red-500/50',
  'on-call': 'bg-gold/20 text-gold border-gold/50',
};

export default function PredictionHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          <span className="text-gradient">Next 72h Forecast</span>
        </h2>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <TrendingUp className="w-4 h-4 text-electric-blue" />
          <span>AI-Powered Predictions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecastData.map((day, index) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString('de-DE', { weekday: 'short' });
          const dayNumber = date.getDate();
          const month = date.toLocaleDateString('de-DE', { month: 'short' });

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className={`glass rounded-xl p-5 relative overflow-hidden ${
                day.hasWarning ? 'border-2 border-red-500/50' : 'border border-white/10'
              }`}
            >
              {day.hasWarning && (
                <motion.div
                  className="absolute inset-0 border-2 border-red-500/50 rounded-xl"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(239, 68, 68, 0)',
                      '0 0 20px rgba(239, 68, 68, 0.5)',
                      '0 0 0px rgba(239, 68, 68, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Date Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-white/60">{dayName}</div>
                  <div className="text-lg font-bold">
                    {dayNumber}. {month}
                  </div>
                </div>
                <div className="text-3xl">{day.weatherIcon}</div>
              </div>

              {/* Revenue Badge */}
              <div className="mb-4">
                <div className="text-xs text-white/60 mb-1">Projizierter Umsatz</div>
                <div className="text-2xl font-bold text-gradient">
                  €{(day.projectedRevenue / 1000).toFixed(1)}k
                </div>
              </div>

              {/* Staffing Recommendation */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusColors[day.staffingRecommendation.status]}`}
                >
                  {day.staffingRecommendation.label}
                </span>
                {day.hasWarning && (
                  <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
