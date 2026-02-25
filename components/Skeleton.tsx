'use client';

import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 mb-6">
      <div className="h-6 w-32 bg-white/10 rounded-lg mb-4 animate-pulse" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass rounded-xl p-4">
          <div className="h-12 w-12 bg-white/10 rounded-lg mb-3 mx-auto animate-pulse" />
          <div className="h-4 w-20 bg-white/10 rounded mx-auto mb-2 animate-pulse" />
          <div className="h-3 w-16 bg-white/10 rounded mx-auto animate-pulse" />
        </div>
      ))}
    </div>
  );
}
