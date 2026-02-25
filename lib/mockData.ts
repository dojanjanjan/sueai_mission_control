export interface HealthData {
  waterIntake: number; // ml
  waterGoal: number; // ml
  sleepDuration: number; // hours
  sleepQuality: 'excellent' | 'good' | 'fair' | 'poor';
  lastSleepDate: string;
}

export interface SystemHealth {
  cpuUsage: number; // percentage
  serverUptime: number; // days
  memoryUsage: number; // percentage
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  status: 'In Progress' | 'Testing' | 'Deployed' | 'Pending';
  progress: number; // percentage
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  lastActive: string;
  status: 'ready' | 'active' | 'idle';
}

export interface NeuralActivity {
  id: string;
  action: string;
  timestamp: string;
  type: 'search' | 'update' | 'execute' | 'analyze';
}

export interface LocationContext {
  location: string;
  weather: string;
  temperature: number;
  weatherIcon: string;
}

export interface AIPulse {
  status: 'standby' | 'thinking' | 'executing';
  activityLevel: number; // 0-100
}

export const mockHealthData: HealthData = {
  waterIntake: 1200,
  waterGoal: 2500,
  sleepDuration: 7.5,
  sleepQuality: 'good',
  lastSleepDate: '2026-02-24',
};

export const mockSystemHealth: SystemHealth = {
  cpuUsage: 42,
  serverUptime: 127,
  memoryUsage: 68,
};

export const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Healthcheck Skill Optimization',
    description: 'Verbesserung der Datenverarbeitung',
    status: 'In Progress',
    progress: 65,
  },
  {
    id: '2',
    title: 'SERP Search Integration',
    description: 'Integration neuer Datenquellen',
    status: 'Testing',
    progress: 90,
  },
  {
    id: '3',
    title: 'Neural Network Update',
    description: 'Upgrade auf v2.0',
    status: 'Deployed',
    progress: 100,
  },
  {
    id: '4',
    title: 'Mobile UI Enhancement',
    description: 'Verbesserung der Touch-Interaktionen',
    status: 'Pending',
    progress: 0,
  },
];

export const mockSkills: Skill[] = [
  {
    id: 'healthcheck',
    name: 'Healthcheck',
    icon: 'heart',
    lastActive: '2 min ago',
    status: 'ready',
  },
  {
    id: 'serp-search',
    name: 'SERP Search',
    icon: 'search',
    lastActive: '15 min ago',
    status: 'ready',
  },
  {
    id: 'news-fetcher',
    name: 'News Fetcher',
    icon: 'newspaper',
    lastActive: '1 hour ago',
    status: 'idle',
  },
  {
    id: 'data-analyzer',
    name: 'Data Analyzer',
    icon: 'bar-chart',
    lastActive: '30 min ago',
    status: 'ready',
  },
  {
    id: 'task-manager',
    name: 'Task Manager',
    icon: 'check-square',
    lastActive: '5 min ago',
    status: 'active',
  },
  {
    id: 'weather-monitor',
    name: 'Weather Monitor',
    icon: 'cloud',
    lastActive: '10 min ago',
    status: 'ready',
  },
];

export const mockNeuralActivity: NeuralActivity[] = [
  {
    id: '1',
    action: 'Searching for News Scharbeutz...',
    timestamp: '14:23:45',
    type: 'search',
  },
  {
    id: '2',
    action: 'Updating Health Data...',
    timestamp: '14:20:12',
    type: 'update',
  },
  {
    id: '3',
    action: 'Executing Healthcheck Skill...',
    timestamp: '14:18:33',
    type: 'execute',
  },
];

export const mockLocationContext: LocationContext = {
  location: 'Scharbeutz',
  weather: 'Partly Cloudy',
  temperature: 8,
  weatherIcon: 'cloud-sun',
};

export const mockAIPulse: AIPulse = {
  status: 'thinking',
  activityLevel: 72,
};

// Helper function to get greeting based on time
export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

// Helper function to get current date string
export function getCurrentDate(): string {
  return new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
