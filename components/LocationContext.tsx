'use client';

import { motion } from 'framer-motion';
import { mockLocationContext } from '@/lib/mockData';
import { MapPin, CloudSun, Wind, ArrowUp } from 'lucide-react';

const weatherIconMap: Record<string, string> = {
  'sun': '☀️',
  'cloud-sun': '⛅',
  'cloud': '☁️',
  'cloud-rain': '🌧️',
  'cloud-snow': '❄️',
};

export default function Local() {
  const { location, weather, temperature, windSpeed, windDirection, forecast } = mockLocationContext;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Local</span>
      </h2>
      
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl glass flex items-center justify-center text-3xl">
            {weatherIconMap[mockLocationContext.weatherIcon] || '🌤️'}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">{location}</h3>
            <p className="text-sm text-white/60">{weather}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gradient">{temperature}°C</div>
          <p className="text-xs text-white/60">Current</p>
        </div>
      </div>

      {/* Wind Info */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-electric-blue" />
          <span className="text-sm text-white/80">Wind</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{windSpeed} km/h</span>
          <div className="flex items-center gap-1">
            <ArrowUp 
              className="w-3 h-3 text-white/60" 
              style={{ transform: `rotate(${getWindDirectionAngle(windDirection)}deg)` }}
            />
            <span className="text-xs text-white/60">{windDirection}</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-white/80">7-Tage Vorschau</h3>
        <div className="space-y-2">
          {forecast.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              className="flex items-center justify-between glass rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{weatherIconMap[day.weatherIcon] || '🌤️'}</span>
                <div>
                  <p className="text-sm font-semibold">
                    {new Date(day.date).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </p>
                  <p className="text-xs text-white/60">{day.weather}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gradient">{day.temperature}°C</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function getWindDirectionAngle(direction: string): number {
  const directions: Record<string, number> = {
    'N': 0,
    'NE': 45,
    'E': 90,
    'SE': 135,
    'S': 180,
    'SW': 225,
    'W': 270,
    'NW': 315,
  };
  return directions[direction] || 0;
}
