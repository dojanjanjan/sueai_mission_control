'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation, { TabType } from '@/components/Navigation';
import HealthStatus from '@/components/HealthStatus';
import SystemHealth from '@/components/SystemHealth';
import AIPulse from '@/components/AIPulse';
import SkillInventory from '@/components/SkillInventory';
import NeuralActivity from '@/components/NeuralActivity';
import Local from '@/components/LocationContext';
import MissionBoard from '@/components/MissionBoard';
import SmartControls from '@/components/SmartControls';
import BusinessData from '@/components/BusinessData';
import Appointments from '@/components/Appointments';
import Tasks from '@/components/Tasks';
import FileHub from '@/components/FileHub';
import Sleep from '@/components/Sleep';
import FoodTracker from '@/components/FoodTracker';
import PredictionHero from '@/components/PredictionHero';
import BIInsights from '@/components/BIInsights';
import NeuralActivityBI from '@/components/NeuralActivityBI';
import DataSourceStatus from '@/components/DataSourceStatus';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <PredictionHero />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Business Focus */}
              <div className="lg:col-span-2 space-y-6">
                <BusinessData />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Appointments />
                  <Tasks />
                </div>
                <FileHub />
                <MissionBoard />
              </div>
              
              {/* Right Column - Context & Quick Info */}
              <div className="space-y-6">
                <Local />
                <AIPulse />
                <SystemHealth />
              </div>
            </div>
          </div>
        );
      
      case 'system':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIPulse />
            <SystemHealth />
            <SkillInventory />
            <NeuralActivity />
            <SmartControls />
            <MissionBoard />
          </div>
        );
      
      case 'business':
        return (
          <div className="space-y-6">
            <PredictionHero />
            <BIInsights />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <BusinessData />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Appointments />
                  <Tasks />
                </div>
                <FileHub />
                <NeuralActivityBI />
              </div>
              <div className="space-y-6">
                <DataSourceStatus />
                <MissionBoard />
              </div>
            </div>
          </div>
        );
      
      case 'private':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthStatus />
            <Sleep />
            <FoodTracker />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-black pb-20 md:pb-6">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </div>
      
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
