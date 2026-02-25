'use client';

import { motion } from 'framer-motion';
import { mockAppointments } from '@/lib/mockData';
import { Calendar, MapPin, Phone, Clock, AlertCircle } from 'lucide-react';

const typeIcons = {
  meeting: Calendar,
  call: Phone,
  event: AlertCircle,
  deadline: Clock,
};

const typeColors = {
  meeting: 'text-electric-blue',
  call: 'text-emerald-green',
  event: 'text-gold',
  deadline: 'text-red-500',
};

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/50',
  medium: 'bg-gold/20 text-gold border-gold/50',
  low: 'bg-white/10 text-white/60 border-white/20',
};

export default function Appointments() {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = mockAppointments.filter(apt => apt.date === today);
  const upcomingAppointments = mockAppointments.filter(apt => apt.date > today).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Termine</span>
      </h2>
      
      {/* Today's Appointments */}
      {todayAppointments.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-white/80">Heute</h3>
          <div className="space-y-3">
            {todayAppointments.map((appointment, index) => {
              const IconComponent = typeIcons[appointment.type];
              return (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="glass rounded-xl p-4 glass-hover"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <IconComponent className={`w-5 h-5 mt-1 ${typeColors[appointment.type]}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{appointment.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.time}
                          </span>
                          {appointment.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {appointment.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${priorityColors[appointment.priority]}`}>
                      {appointment.priority}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3 text-white/80">Kommende Termine</h3>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment, index) => {
              const IconComponent = typeIcons[appointment.type];
              return (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="glass rounded-xl p-4 glass-hover"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <IconComponent className={`w-5 h-5 mt-1 ${typeColors[appointment.type]}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{appointment.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>
                            {new Date(appointment.date).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })}
                          </span>
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${priorityColors[appointment.priority]}`}>
                      {appointment.priority}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
