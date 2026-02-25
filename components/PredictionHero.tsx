'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { forecastData72h, forecastData1Week, forecastData1Month } from '@/lib/forecastData';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const statusColors = {
  optimal: 'bg-emerald-green/20 text-emerald-green border-emerald-green/50',
  warning: 'bg-red-500/20 text-red-400 border-red-500/50',
  'on-call': 'bg-gold/20 text-gold border-gold/50',
};

type ForecastTab = '72h' | '1week' | '1month';

export default function PredictionHero() {
  const [activeTab, setActiveTab] = useState<ForecastTab>('72h');

  const getForecastData = () => {
    switch (activeTab) {
      case '72h':
        return forecastData72h;
      case '1week':
        return forecastData1Week;
      case '1month':
        return forecastData1Month;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case '72h':
        return 'Next 72h Forecast';
      case '1week':
        return '1 Week Forecast';
      case '1month':
        return '1 Month Forecast';
    }
  };

  const forecastData = getForecastData();
  const isCompactView = activeTab !== '72h';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          <span className="text-gradient">{getTitle()}</span>
        </h2>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <TrendingUp className="w-4 h-4 text-electric-blue" />
          <span>AI-Powered Predictions</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['72h', '1week', '1month'] as ForecastTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-electric-blue/20 to-deep-purple/20 text-electric-blue border border-electric-blue/50'
                : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab === '72h' ? '72h' : tab === '1week' ? '1 Week' : '1 Month'}
          </button>
        ))}
      </div>

      {/* Forecast Grid */}
      <div className={`grid gap-4 ${isCompactView ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7' : 'grid-cols-1 md:grid-cols-3'}`}>
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
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className={`glass rounded-xl relative overflow-hidden ${
                day.hasWarning ? 'border-2 border-red-500/50' : 'border border-white/10'
              } ${isCompactView ? 'p-3' : 'p-5'}`}
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
              <div className={`flex items-center justify-between ${isCompactView ? 'mb-2' : 'mb-4'}`}>
                <div>
                  <div className={`${isCompactView ? 'text-xs' : 'text-sm'} text-white/60`}>{dayName}</div>
                  <div className={`${isCompactView ? 'text-sm' : 'text-lg'} font-bold`}>
                    {dayNumber}. {month}
                  </div>
                </div>
                <div className={isCompactView ? 'text-xl' : 'text-3xl'}>{day.weatherIcon}</div>
              </div>

              {/* Revenue Badge */}
              <div className={isCompactView ? 'mb-2' : 'mb-4'}>
                <div className={`${isCompactView ? 'text-[10px]' : 'text-xs'} text-white/60 mb-1`}>Umsatz</div>
                <div className={`${isCompactView ? 'text-lg' : 'text-2xl'} font-bold text-gradient`}>
                  €{(day.projectedRevenue / 1000).toFixed(1)}k
                </div>
              </div>

              {/* Staffing Recommendation */}
              <div className={`flex items-center ${isCompactView ? 'flex-col gap-1' : 'justify-between'}`}>
                <span
                  className={`${isCompactView ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'} rounded-lg font-semibold border ${statusColors[day.staffingRecommendation.status]} text-center`}
                >
                  {isCompactView ? `${day.staffingRecommendation.count} MA` : day.staffingRecommendation.label}
                </span>
                {day.hasWarning && !isCompactView && (
                  <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                )}
                {day.hasWarning && isCompactView && (
                  <AlertTriangle className="w-3 h-3 text-red-400 animate-pulse" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
