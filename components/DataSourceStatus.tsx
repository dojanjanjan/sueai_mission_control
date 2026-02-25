'use client';

import { motion } from 'framer-motion';
import { dataSourceStatus } from '@/lib/forecastData';
import { Database, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const statusIcons = {
  active: CheckCircle2,
  inactive: XCircle,
  error: AlertCircle,
};

const statusColors = {
  active: 'text-emerald-green',
  inactive: 'text-white/40',
  error: 'text-red-400',
};

export default function DataSourceStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass rounded-2xl p-4 mb-6"
    >
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Database className="w-4 h-4 text-gradient" />
        <span className="text-gradient">Data Sources</span>
      </h3>
      
      <div className="space-y-2">
        {dataSourceStatus.map((source, index) => {
          const IconComponent = statusIcons[source.status];
          return (
            <motion.div
              key={source.source}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <IconComponent className={`w-3 h-3 ${statusColors[source.status]}`} />
                <span className="text-white/80">{source.source}</span>
              </div>
              <span className="text-white/60">{source.lastScan}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
