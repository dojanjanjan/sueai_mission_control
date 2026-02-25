'use client';

import Header from '@/components/Header';
import HealthStatus from '@/components/HealthStatus';
import SystemHealth from '@/components/SystemHealth';
import AIPulse from '@/components/AIPulse';
import SkillInventory from '@/components/SkillInventory';
import NeuralActivity from '@/components/NeuralActivity';
import LocationContext from '@/components/LocationContext';
import MissionBoard from '@/components/MissionBoard';
import SmartControls from '@/components/SmartControls';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  return (
    <main className="min-h-screen bg-black pb-20 md:pb-6">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AIPulse />
            <HealthStatus />
            <SystemHealth />
            <MissionBoard />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <LocationContext />
            <SkillInventory />
            <NeuralActivity />
            <SmartControls />
          </div>
        </div>
      </div>
      
      <MobileNav />
    </main>
  );
}
