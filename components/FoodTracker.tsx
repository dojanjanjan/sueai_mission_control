'use client';

import { motion } from 'framer-motion';
import { mockFoodTracker } from '@/lib/mockData';
import { Utensils, Apple, Fish, Coffee } from 'lucide-react';

const mealIcons = {
  breakfast: Apple,
  lunch: Utensils,
  dinner: Fish,
  snack: Coffee,
};

const mealColors = {
  breakfast: 'text-gold',
  lunch: 'text-electric-blue',
  dinner: 'text-deep-purple',
  snack: 'text-emerald-green',
};

export default function FoodTracker() {
  const { today, entries, weeklyCalories } = mockFoodTracker;
  const maxCalories = Math.max(...weeklyCalories.map(d => d.calories));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Utensils className="w-5 h-5 text-gradient" />
        <span className="text-gradient">Food Tracker</span>
      </h2>
      
      {/* Today's Macros */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="glass rounded-xl p-3">
          <div className="text-xs text-white/60 mb-1">Calories</div>
          <div className="text-lg font-bold">{today.calories}</div>
          <div className="text-xs text-white/60">/ {today.caloriesGoal}</div>
          <div className="h-1 glass rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(today.calories / today.caloriesGoal) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-electric-blue to-cyan-400 rounded-full"
            />
          </div>
        </div>
        <div className="glass rounded-xl p-3">
          <div className="text-xs text-white/60 mb-1">Protein</div>
          <div className="text-lg font-bold">{today.protein}g</div>
          <div className="text-xs text-white/60">/ {today.proteinGoal}g</div>
          <div className="h-1 glass rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(today.protein / today.proteinGoal) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-full bg-gradient-to-r from-emerald-green to-green-400 rounded-full"
            />
          </div>
        </div>
        <div className="glass rounded-xl p-3">
          <div className="text-xs text-white/60 mb-1">Carbs</div>
          <div className="text-lg font-bold">{today.carbs}g</div>
          <div className="text-xs text-white/60">/ {today.carbsGoal}g</div>
          <div className="h-1 glass rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(today.carbs / today.carbsGoal) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full"
            />
          </div>
        </div>
        <div className="glass rounded-xl p-3">
          <div className="text-xs text-white/60 mb-1">Fats</div>
          <div className="text-lg font-bold">{today.fats}g</div>
          <div className="text-xs text-white/60">/ {today.fatsGoal}g</div>
          <div className="h-1 glass rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(today.fats / today.fatsGoal) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-full bg-gradient-to-r from-deep-purple to-pink-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Today's Entries */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-white/80">Heute</h3>
        <div className="space-y-2">
          {entries.map((entry, index) => {
            const IconComponent = mealIcons[entry.mealType];
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                className="glass rounded-xl p-3 glass-hover"
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-5 h-5 ${mealColors[entry.mealType]}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{entry.name}</h3>
                      <span className="text-sm font-bold text-gradient">{entry.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <span>P: {entry.protein}g</span>
                      <span>C: {entry.carbs}g</span>
                      <span>F: {entry.fats}g</span>
                      <span className="ml-auto">{entry.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Weekly Chart */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-white/80">7-Tage Kalorien</h3>
        <div className="h-24 glass rounded-lg p-4 flex items-end gap-2">
          {weeklyCalories.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ height: 0 }}
              animate={{ height: `${(day.calories / maxCalories) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
              className="flex-1 bg-gradient-to-t from-electric-blue to-cyan-400 rounded-t"
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/60">
          {weeklyCalories.map((day) => (
            <span key={day.date}>
              {new Date(day.date).toLocaleDateString('de-DE', { day: 'numeric' })}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
