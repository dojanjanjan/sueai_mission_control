'use client';

import { motion } from 'framer-motion';
import { mockBusinessData } from '@/lib/mockData';
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign } from 'lucide-react';

export default function BusinessData() {
  const { revenue, revenueChange, customers, customersChange, orders, ordersChange, chartData } = mockBusinessData;

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Business Data</span>
      </h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Revenue</span>
            <div className={`flex items-center gap-1 ${revenueChange >= 0 ? 'text-emerald-green' : 'text-red-500'}`}>
              {revenueChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-xs font-semibold">{Math.abs(revenueChange)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold">€{(revenue / 1000).toFixed(0)}k</div>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Customers</span>
            <div className={`flex items-center gap-1 ${customersChange >= 0 ? 'text-emerald-green' : 'text-red-500'}`}>
              {customersChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-xs font-semibold">{Math.abs(customersChange)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-electric-blue" />
            {customers}
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Orders</span>
            <div className={`flex items-center gap-1 ${ordersChange >= 0 ? 'text-emerald-green' : 'text-red-500'}`}>
              {ordersChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-xs font-semibold">{Math.abs(ordersChange)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-deep-purple" />
            {orders}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-white/80">Revenue Trend (7 Tage)</h3>
        <div className="h-32 glass rounded-lg p-4 flex items-end gap-2">
          {chartData.map((data, index) => (
            <motion.div
              key={data.date}
              initial={{ height: 0 }}
              animate={{ height: `${(data.value / maxValue) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              className="flex-1 bg-gradient-to-t from-electric-blue to-cyan-400 rounded-t"
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/60">
          {chartData.map((data) => (
            <span key={data.date}>
              {new Date(data.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
