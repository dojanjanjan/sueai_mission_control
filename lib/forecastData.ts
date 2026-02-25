export interface ForecastDay {
  date: string;
  weather: 'sunny' | 'rainy' | 'stormy' | 'cloudy';
  weatherIcon: string;
  projectedRevenue: number;
  staffingRecommendation: {
    count: number;
    status: 'optimal' | 'warning' | 'on-call';
    label: string;
  };
  hasWarning: boolean;
}

export interface WeatherImpact {
  weather: 'sunny' | 'rainy' | 'stormy';
  averageRevenue: number;
  count: number;
  percentage: number;
}

export interface EfficiencyMetric {
  currentRevenuePerEmployee: number;
  status: 'good' | 'warning' | 'critical';
  targetRange: {
    min: number;
    max: number;
  };
}

export interface NeuralActivityBI {
  id: string;
  action: string;
  timestamp: string;
  type: 'prediction' | 'analysis' | 'alert';
  confidence?: number;
}

export interface DataSourceStatus {
  source: string;
  status: 'active' | 'inactive' | 'error';
  lastScan: string;
}

export const forecastData: ForecastDay[] = [
  {
    date: '2026-02-25',
    weather: 'sunny',
    weatherIcon: '☀️',
    projectedRevenue: 14500,
    staffingRecommendation: {
      count: 4,
      status: 'optimal',
      label: '4 MA - Optimal',
    },
    hasWarning: false,
  },
  {
    date: '2026-02-26',
    weather: 'rainy',
    weatherIcon: '🌧️',
    projectedRevenue: 9800,
    staffingRecommendation: {
      count: 6,
      status: 'warning',
      label: '6 MA - WARNING',
    },
    hasWarning: true,
  },
  {
    date: '2026-02-27',
    weather: 'cloudy',
    weatherIcon: '☁️',
    projectedRevenue: 11200,
    staffingRecommendation: {
      count: 3,
      status: 'on-call',
      label: '3 MA - On Call',
    },
    hasWarning: false,
  },
];

export const weatherImpactData: WeatherImpact[] = [
  {
    weather: 'sunny',
    averageRevenue: 14200,
    count: 45,
    percentage: 35,
  },
  {
    weather: 'rainy',
    averageRevenue: 9200,
    count: 28,
    percentage: 22,
  },
  {
    weather: 'stormy',
    averageRevenue: 6800,
    count: 12,
    percentage: 9,
  },
];

export const efficiencyMetric: EfficiencyMetric = {
  currentRevenuePerEmployee: 950,
  status: 'warning',
  targetRange: {
    min: 800,
    max: 1100,
  },
};

export const neuralActivityBI: NeuralActivityBI[] = [
  {
    id: '1',
    action: 'Prediction Engine calibrated',
    timestamp: '14:25:12',
    type: 'prediction',
    confidence: 94,
  },
  {
    id: '2',
    action: 'High correlation detected: Sun + Weekend + Event',
    timestamp: '14:22:45',
    type: 'analysis',
  },
  {
    id: '3',
    action: 'Critical understaffing predicted for Saturday!',
    timestamp: '14:20:33',
    type: 'alert',
  },
];

export const dataSourceStatus: DataSourceStatus[] = [
  {
    source: 'Google Drive Sync',
    status: 'active',
    lastScan: '2 mins ago',
  },
  {
    source: 'Weather API',
    status: 'active',
    lastScan: '5 mins ago',
  },
  {
    source: 'Sales Database',
    status: 'active',
    lastScan: '1 min ago',
  },
];
