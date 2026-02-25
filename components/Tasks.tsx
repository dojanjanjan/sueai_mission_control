'use client';

import { motion } from 'framer-motion';
import { mockTasks } from '@/lib/mockData';
import { CheckSquare, Circle, Clock } from 'lucide-react';

const statusIcons = {
  todo: Circle,
  'in-progress': Clock,
  done: CheckSquare,
};

const statusColors = {
  todo: 'text-white/40',
  'in-progress': 'text-electric-blue',
  done: 'text-emerald-green',
};

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/50',
  medium: 'bg-gold/20 text-gold border-gold/50',
  low: 'bg-white/10 text-white/60 border-white/20',
};

export default function Tasks() {
  const groupedTasks = {
    todo: mockTasks.filter(t => t.status === 'todo'),
    'in-progress': mockTasks.filter(t => t.status === 'in-progress'),
    done: mockTasks.filter(t => t.status === 'done'),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CheckSquare className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Tasks</span>
      </h2>
      
      <div className="space-y-4">
        {/* To Do */}
        {groupedTasks.todo.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2 text-white/80">To Do</h3>
            <div className="space-y-2">
              {groupedTasks.todo.map((task, index) => {
                const IconComponent = statusIcons[task.status];
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="glass rounded-xl p-3 glass-hover"
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent className={`w-4 h-4 mt-1 ${statusColors[task.status]}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-white/60 mb-2">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/60">{task.category}</span>
                          <span className="text-xs text-white/60">•</span>
                          <span className="text-xs text-white/60">
                            {new Date(task.dueDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}
                          </span>
                          <span className={`ml-auto px-2 py-0.5 rounded text-xs font-semibold border ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* In Progress */}
        {groupedTasks['in-progress'].length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2 text-white/80">In Progress</h3>
            <div className="space-y-2">
              {groupedTasks['in-progress'].map((task, index) => {
                const IconComponent = statusIcons[task.status];
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="glass rounded-xl p-3 glass-hover"
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent className={`w-4 h-4 mt-1 ${statusColors[task.status]}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-white/60 mb-2">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/60">{task.category}</span>
                          <span className="text-xs text-white/60">•</span>
                          <span className="text-xs text-white/60">
                            {new Date(task.dueDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}
                          </span>
                          <span className={`ml-auto px-2 py-0.5 rounded text-xs font-semibold border ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Done */}
        {groupedTasks.done.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2 text-white/80">Done</h3>
            <div className="space-y-2">
              {groupedTasks.done.map((task, index) => {
                const IconComponent = statusIcons[task.status];
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    className="glass rounded-xl p-3 opacity-60 glass-hover"
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent className={`w-4 h-4 mt-1 ${statusColors[task.status]}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1 line-through">{task.title}</h3>
                        <p className="text-xs text-white/60 mb-2">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/60">{task.category}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
