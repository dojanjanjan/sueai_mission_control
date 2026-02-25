'use client';

import { motion } from 'framer-motion';
import { mockMissions } from '@/lib/mockData';
import { Target } from 'lucide-react';

const statusColors = {
  'In Progress': 'bg-electric-blue/20 text-electric-blue border-electric-blue/50',
  'Testing': 'bg-gold/20 text-gold border-gold/50',
  'Deployed': 'bg-emerald-green/20 text-emerald-green border-emerald-green/50',
  'Pending': 'bg-white/10 text-white/60 border-white/20',
};

export default function MissionBoard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Mission Board</span>
      </h2>
      
      <div className="space-y-4">
        {mockMissions.map((mission, index) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
            className="glass rounded-xl p-4 glass-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{mission.title}</h3>
                <p className="text-sm text-white/60">{mission.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[mission.status]}`}>
                {mission.status}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-2 glass rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${mission.progress}%` }}
                transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric-blue via-deep-purple to-emerald-green rounded-full"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-white/60">Progress</span>
              <span className="text-xs font-semibold">{mission.progress}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
