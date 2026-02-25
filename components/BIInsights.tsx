'use client';

import { motion } from 'framer-motion';
import { weatherImpactData, efficiencyMetric } from '@/lib/forecastData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users } from 'lucide-react';

const weatherColors = {
  sunny: '#00D9FF',
  rainy: '#8B5CF6',
  stormy: '#F59E0B',
};

export default function BIInsights() {
  const { currentRevenuePerEmployee, status, targetRange } = efficiencyMetric;

  const efficiencyColor =
    status === 'good'
      ? '#10B981'
      : status === 'warning'
      ? '#FBBF24'
      : '#EF4444';

  const efficiencyPercentage = ((currentRevenuePerEmployee - targetRange.min) / (targetRange.max - targetRange.min)) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Weather Impact Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gradient" />
          <span className="text-gradient">Wetter-Impact</span>
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weatherImpactData}>
              <XAxis
                dataKey="weather"
                tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              />
              <YAxis
                tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                grid={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                labelStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
              />
              <Bar dataKey="averageRevenue" radius={[8, 8, 0, 0]}>
                {weatherImpactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={weatherColors[entry.weather]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {weatherImpactData.map((entry) => (
            <div key={entry.weather} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: weatherColors[entry.weather] }}
                />
                <span className="text-white/80 capitalize">{entry.weather}</span>
              </div>
              <span className="font-semibold">€{(entry.averageRevenue / 1000).toFixed(1)}k</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Efficiency Metric */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-gradient" />
          <span className="text-gradient">Efficiency Metric</span>
        </h3>
        <div className="flex flex-col items-center justify-center py-8">
          {/* Pulse Ring */}
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="12"
                fill="none"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke={efficiencyColor}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 70 * (1 - Math.min(efficiencyPercentage / 100, 1)),
                }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold" style={{ color: efficiencyColor }}>
                €{currentRevenuePerEmployee}
              </div>
              <div className="text-xs text-white/60 mt-1">pro Mitarbeiter</div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="text-center">
            <div
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                status === 'good'
                  ? 'bg-emerald-green/20 text-emerald-green border border-emerald-green/50'
                  : status === 'warning'
                  ? 'bg-gold/20 text-gold border border-gold/50'
                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}
            >
              {status === 'good' && 'Optimal'}
              {status === 'warning' && 'Warning'}
              {status === 'critical' && 'Critical'}
            </div>
            <div className="mt-3 text-xs text-white/60">
              Zielbereich: €{targetRange.min} - €{targetRange.max}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
