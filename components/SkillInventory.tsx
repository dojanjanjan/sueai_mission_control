'use client';

import { motion } from 'framer-motion';
import { mockSkills } from '@/lib/mockData';
import { Heart, Search, Newspaper, BarChart3, CheckSquare, Cloud, Puzzle } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  heart: Heart,
  search: Search,
  newspaper: Newspaper,
  'bar-chart': BarChart3,
  'check-square': CheckSquare,
  cloud: Cloud,
};

export default function SkillInventory() {
  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Puzzle;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        <span className="text-gradient">Skill Inventory</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mockSkills.map((skill, index) => {
          const IconComponent = getIcon(skill.icon);
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-xl p-4 relative cursor-pointer glass-hover"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="w-12 h-12 rounded-lg glass flex items-center justify-center mb-2">
                    <IconComponent className="w-6 h-6 text-electric-blue" />
                  </div>
                  {skill.status === 'ready' && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-green rounded-full border-2 border-black"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
                <h3 className="text-sm font-semibold mb-1">{skill.name}</h3>
                <p className="text-xs text-white/60">{skill.lastActive}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
