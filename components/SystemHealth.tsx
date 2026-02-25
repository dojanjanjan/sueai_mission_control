'use client';

import { motion } from 'framer-motion';
import { mockSystemHealth } from '@/lib/mockData';
import { Activity, Server, HardDrive } from 'lucide-react';

export default function SystemHealth() {
  const { cpuUsage, serverUptime, memoryUsage } = mockSystemHealth;

  const generateDataPoints = (value: number, count: number = 20) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      points.push(Math.random() * value * 0.3 + value * 0.7);
    }
    return points;
  };

  const cpuData = generateDataPoints(cpuUsage);
  const memoryData = generateDataPoints(memoryUsage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        <span className="text-gradient">System Health</span>
      </h2>
      
      <div className="space-y-4">
        {/* CPU Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-electric-blue" />
              <span className="text-sm text-white/80">CPU Usage</span>
            </div>
            <span className="text-sm font-semibold">{cpuUsage}%</span>
          </div>
          <div className="h-20 glass rounded-lg p-2 flex items-end gap-1">
            {cpuData.map((value, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ duration: 0.5, delay: index * 0.02 }}
                className="flex-1 bg-gradient-to-t from-electric-blue to-cyan-400 rounded-t"
              />
            ))}
          </div>
        </div>

        {/* Memory Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-deep-purple" />
              <span className="text-sm text-white/80">Memory Usage</span>
            </div>
            <span className="text-sm font-semibold">{memoryUsage}%</span>
          </div>
          <div className="h-20 glass rounded-lg p-2 flex items-end gap-1">
            {memoryData.map((value, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ duration: 0.5, delay: index * 0.02 }}
                className="flex-1 bg-gradient-to-t from-deep-purple to-pink-500 rounded-t"
              />
            ))}
          </div>
        </div>

        {/* Server Uptime */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-green" />
            <span className="text-sm text-white/80">Server Uptime</span>
          </div>
          <span className="text-sm font-semibold text-emerald-green">
            {serverUptime} days
          </span>
        </div>
      </div>
    </motion.div>
  );
}
