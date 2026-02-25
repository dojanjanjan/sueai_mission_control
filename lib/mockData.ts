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
  windSpeed: number; // km/h
  windDirection: string; // e.g., "NW"
  forecast: {
    date: string;
    temperature: number;
    weather: string;
    weatherIcon: string;
  }[];
}

export interface BusinessData {
  revenue: number;
  revenueChange: number; // percentage
  customers: number;
  customersChange: number; // percentage
  orders: number;
  ordersChange: number; // percentage
  chartData: { date: string; value: number }[];
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  type: 'meeting' | 'call' | 'event' | 'deadline';
  priority: 'high' | 'medium' | 'low';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done';
  category: string;
}

export interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  category: 'document' | 'image' | 'video' | 'other';
}

export interface SleepData {
  duration: number; // hours
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  bedtime: string;
  wakeTime: string;
  deepSleep: number; // hours
  remSleep: number; // hours
  lightSleep: number; // hours
  weeklyData: {
    date: string;
    duration: number;
    quality: 'excellent' | 'good' | 'fair' | 'poor';
  }[];
}

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
  time: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface FoodTracker {
  today: {
    calories: number;
    caloriesGoal: number;
    protein: number;
    proteinGoal: number;
    carbs: number;
    carbsGoal: number;
    fats: number;
    fatsGoal: number;
  };
  entries: FoodEntry[];
  weeklyCalories: { date: string; calories: number }[];
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
  windSpeed: 15,
  windDirection: 'NW',
  forecast: [
    { date: '2026-02-25', temperature: 8, weather: 'Partly Cloudy', weatherIcon: 'cloud-sun' },
    { date: '2026-02-26', temperature: 10, weather: 'Sunny', weatherIcon: 'sun' },
    { date: '2026-02-27', temperature: 7, weather: 'Rainy', weatherIcon: 'cloud-rain' },
    { date: '2026-02-28', temperature: 9, weather: 'Cloudy', weatherIcon: 'cloud' },
    { date: '2026-03-01', temperature: 11, weather: 'Sunny', weatherIcon: 'sun' },
    { date: '2026-03-02', temperature: 9, weather: 'Partly Cloudy', weatherIcon: 'cloud-sun' },
    { date: '2026-03-03', temperature: 8, weather: 'Rainy', weatherIcon: 'cloud-rain' },
  ],
};

export const mockBusinessData: BusinessData = {
  revenue: 125000,
  revenueChange: 12.5,
  customers: 342,
  customersChange: 8.3,
  orders: 156,
  ordersChange: -2.1,
  chartData: [
    { date: '2026-02-19', value: 98000 },
    { date: '2026-02-20', value: 105000 },
    { date: '2026-02-21', value: 112000 },
    { date: '2026-02-22', value: 118000 },
    { date: '2026-02-23', value: 122000 },
    { date: '2026-02-24', value: 125000 },
    { date: '2026-02-25', value: 128000 },
  ],
};

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2026-02-25',
    time: '10:00',
    location: 'Conference Room A',
    type: 'meeting',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Client Call - Acme Corp',
    date: '2026-02-25',
    time: '14:30',
    type: 'call',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Product Launch Event',
    date: '2026-02-26',
    time: '18:00',
    location: 'Event Center',
    type: 'event',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Project Deadline',
    date: '2026-02-27',
    time: '17:00',
    type: 'deadline',
    priority: 'high',
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Q1 Report erstellen',
    description: 'Quartalsbericht für Q1 2026 vorbereiten',
    dueDate: '2026-02-28',
    priority: 'high',
    status: 'in-progress',
    category: 'Business',
  },
  {
    id: '2',
    title: 'Website Redesign Review',
    description: 'Design-Vorschläge durchgehen und Feedback geben',
    dueDate: '2026-02-26',
    priority: 'medium',
    status: 'todo',
    category: 'Design',
  },
  {
    id: '3',
    title: 'Budget Planung 2026',
    description: 'Jahresbudget für alle Abteilungen planen',
    dueDate: '2026-03-05',
    priority: 'high',
    status: 'todo',
    category: 'Finance',
  },
  {
    id: '4',
    title: 'Team Offsite Planung',
    description: 'Details für Team-Event im März klären',
    dueDate: '2026-03-01',
    priority: 'low',
    status: 'done',
    category: 'HR',
  },
];

export const mockFiles: File[] = [
  {
    id: '1',
    name: 'Q1_Report_2026.pdf',
    type: 'pdf',
    size: '2.4 MB',
    modified: '2026-02-24',
    category: 'document',
  },
  {
    id: '2',
    name: 'Product_Launch_Presentation.pptx',
    type: 'pptx',
    size: '15.8 MB',
    modified: '2026-02-23',
    category: 'document',
  },
  {
    id: '3',
    name: 'Team_Photo.jpg',
    type: 'jpg',
    size: '3.2 MB',
    modified: '2026-02-20',
    category: 'image',
  },
  {
    id: '4',
    name: 'Marketing_Video.mp4',
    type: 'mp4',
    size: '125.6 MB',
    modified: '2026-02-18',
    category: 'video',
  },
  {
    id: '5',
    name: 'Contract_Template.docx',
    type: 'docx',
    size: '0.8 MB',
    modified: '2026-02-22',
    category: 'document',
  },
];

export const mockSleepData: SleepData = {
  duration: 7.5,
  quality: 'good',
  bedtime: '23:00',
  wakeTime: '06:30',
  deepSleep: 2.0,
  remSleep: 1.8,
  lightSleep: 3.7,
  weeklyData: [
    { date: '2026-02-19', duration: 7.2, quality: 'good' },
    { date: '2026-02-20', duration: 8.0, quality: 'excellent' },
    { date: '2026-02-21', duration: 6.5, quality: 'fair' },
    { date: '2026-02-22', duration: 7.8, quality: 'good' },
    { date: '2026-02-23', duration: 7.0, quality: 'good' },
    { date: '2026-02-24', duration: 7.5, quality: 'good' },
    { date: '2026-02-25', duration: 7.5, quality: 'good' },
  ],
};

export const mockFoodTracker: FoodTracker = {
  today: {
    calories: 1850,
    caloriesGoal: 2200,
    protein: 120,
    proteinGoal: 150,
    carbs: 210,
    carbsGoal: 275,
    fats: 65,
    fatsGoal: 73,
  },
  entries: [
    {
      id: '1',
      name: 'Haferflocken mit Beeren',
      calories: 350,
      protein: 12,
      carbs: 55,
      fats: 8,
      time: '08:00',
      mealType: 'breakfast',
    },
    {
      id: '2',
      name: 'Gegrilltes Hähnchen mit Reis',
      calories: 650,
      protein: 55,
      carbs: 75,
      fats: 15,
      time: '13:00',
      mealType: 'lunch',
    },
    {
      id: '3',
      name: 'Lachs mit Gemüse',
      calories: 550,
      protein: 45,
      carbs: 30,
      fats: 28,
      time: '19:00',
      mealType: 'dinner',
    },
    {
      id: '4',
      name: 'Griechischer Joghurt',
      calories: 300,
      protein: 8,
      carbs: 50,
      fats: 14,
      time: '15:30',
      mealType: 'snack',
    },
  ],
  weeklyCalories: [
    { date: '2026-02-19', calories: 2100 },
    { date: '2026-02-20', calories: 1950 },
    { date: '2026-02-21', calories: 2250 },
    { date: '2026-02-22', calories: 2050 },
    { date: '2026-02-23', calories: 2150 },
    { date: '2026-02-24', calories: 1900 },
    { date: '2026-02-25', calories: 1850 },
  ],
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
