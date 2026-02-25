'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { forecastData72h, forecastData1Week, forecastData1Month } from '@/lib/forecastData';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

  // Prepare chart data
  const chartData = forecastData.map((day) => {
    const date = new Date(day.date);
    return {
      date: date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' }),
      revenue: day.projectedRevenue,
      staffing: day.staffingRecommendation.count,
      hasWarning: day.hasWarning,
    };
  });

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
  const minRevenue = Math.min(...chartData.map(d => d.revenue));

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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-xl p-4"
        >
          <h3 className="text-sm font-semibold mb-3 text-white/80">Umsatz-Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D9FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                />
                <YAxis
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  domain={[minRevenue * 0.8, maxRevenue * 1.1]}
                  tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  labelStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  formatter={(value: number) => [`€${(value / 1000).toFixed(1)}k`, 'Umsatz']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00D9FF"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  dot={(props: any) => {
                    const { payload } = props;
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={payload.hasWarning ? 6 : 4}
                        fill={payload.hasWarning ? '#EF4444' : '#00D9FF'}
                        stroke={payload.hasWarning ? '#EF4444' : 'none'}
                        strokeWidth={payload.hasWarning ? 2 : 0}
                      />
                    );
                  }}
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Staffing Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-xl p-4"
        >
          <h3 className="text-sm font-semibold mb-3 text-white/80">Staffing-Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                />
                <YAxis
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  domain={[0, 7]}
                  tickFormatter={(value) => `${value} MA`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  labelStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  formatter={(value: number) => [`${value} MA`, 'Staffing']}
                />
                <Line
                  type="monotone"
                  dataKey="staffing"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { payload } = props;
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={payload.hasWarning ? 6 : 4}
                        fill={payload.hasWarning ? '#EF4444' : '#8B5CF6'}
                        stroke={payload.hasWarning ? '#EF4444' : 'none'}
                        strokeWidth={payload.hasWarning ? 2 : 0}
                      />
                    );
                  }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
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
