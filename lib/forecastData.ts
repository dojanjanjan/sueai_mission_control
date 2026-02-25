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

// Helper function to generate forecast data
function generateForecastDays(startDate: string, days: number): ForecastDay[] {
  const weathers: Array<'sunny' | 'rainy' | 'stormy' | 'cloudy'> = ['sunny', 'rainy', 'cloudy', 'stormy'];
  const weatherIcons = ['☀️', '🌧️', '☁️', '⛈️'];
  const daysArray: ForecastDay[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const weatherIndex = Math.floor(Math.random() * weathers.length);
    const weather = weathers[weatherIndex];
    const weatherIcon = weatherIcons[weatherIndex];
    
    // Revenue varies by weather
    let baseRevenue = 12000;
    if (weather === 'sunny') baseRevenue = 14000 + Math.random() * 2000;
    else if (weather === 'rainy') baseRevenue = 8000 + Math.random() * 3000;
    else if (weather === 'stormy') baseRevenue = 6000 + Math.random() * 2000;
    else baseRevenue = 10000 + Math.random() * 3000;
    
    // Staffing recommendation based on revenue
    let staffingCount = 4;
    let status: 'optimal' | 'warning' | 'on-call' = 'optimal';
    if (baseRevenue > 13000) {
      staffingCount = 5;
      status = 'optimal';
    } else if (baseRevenue < 9000) {
      staffingCount = 6;
      status = 'warning';
    } else if (baseRevenue < 11000) {
      staffingCount = 3;
      status = 'on-call';
    }
    
    daysArray.push({
      date: date.toISOString().split('T')[0],
      weather,
      weatherIcon,
      projectedRevenue: Math.round(baseRevenue),
      staffingRecommendation: {
        count: staffingCount,
        status,
        label: `${staffingCount} MA - ${status === 'optimal' ? 'Optimal' : status === 'warning' ? 'WARNING' : 'On Call'}`,
      },
      hasWarning: status === 'warning' || baseRevenue < 8000,
    });
  }
  
  return daysArray;
}

export const forecastData72h = forecastData;

export const forecastData1Week = generateForecastDays('2026-02-25', 7);

export const forecastData1Month = generateForecastDays('2026-02-25', 30);

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
