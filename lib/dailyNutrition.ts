// Daily Nutrition History Management

export interface DailyNutrition {
  date: string; // YYYY-MM-DD format
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  water: number;
  meals: Array<{
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    timestamp: string;
  }>;
}

// Get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}

// Get date range for charts (last N days)
export function getDateRange(days: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
}

// Get all stored daily nutrition data
export function getAllDailyNutrition(): DailyNutrition[] {
  const stored = localStorage.getItem('daily-nutrition-history');
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error loading nutrition history:', e);
    return [];
  }
}

// Get nutrition for a specific date
export function getDailyNutrition(date: string): DailyNutrition | null {
  const history = getAllDailyNutrition();
  return history.find(entry => entry.date === date) || null;
}

// Save daily nutrition data
export function saveDailyNutrition(data: DailyNutrition): void {
  const history = getAllDailyNutrition();
  const existingIndex = history.findIndex(entry => entry.date === data.date);
  
  if (existingIndex >= 0) {
    history[existingIndex] = data;
  } else {
    history.push(data);
  }
  
  // Keep only last 90 days
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 90);
  const cutoff = cutoffDate.toISOString().split('T')[0];
  
  const filtered = history.filter(entry => entry.date >= cutoff);
  
  localStorage.setItem('daily-nutrition-history', JSON.stringify(filtered));
}

// Get nutrition data for chart (last N days)
export function getChartData(days: number = 7): {
  dates: string[];
  calories: number[];
  protein: number[];
  carbs: number[];
  fats: number[];
  fiber: number[];
} {
  const dates = getDateRange(days);
  const history = getAllDailyNutrition();
  
  const calories: number[] = [];
  const protein: number[] = [];
  const carbs: number[] = [];
  const fats: number[] = [];
  const fiber: number[] = [];
  
  dates.forEach(date => {
    const dayData = history.find(entry => entry.date === date);
    calories.push(dayData?.calories || 0);
    protein.push(dayData?.protein || 0);
    carbs.push(dayData?.carbs || 0);
    fats.push(dayData?.fats || 0);
    fiber.push(dayData?.fiber || 0);
  });
  
  return { dates, calories, protein, carbs, fats, fiber };
}

// Check if it's a new day and reset if needed
export function checkNewDay(): boolean {
  const lastDate = localStorage.getItem('last-active-date');
  const today = getTodayDate();
  
  if (lastDate !== today) {
    localStorage.setItem('last-active-date', today);
    return true; // It's a new day
  }
  
  return false; // Same day
}

// Get weekly average
export function getWeeklyAverage(): {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
} {
  const data = getChartData(7);
  
  const avgCalories = data.calories.reduce((a, b) => a + b, 0) / 7;
  const avgProtein = data.protein.reduce((a, b) => a + b, 0) / 7;
  const avgCarbs = data.carbs.reduce((a, b) => a + b, 0) / 7;
  const avgFats = data.fats.reduce((a, b) => a + b, 0) / 7;
  const avgFiber = data.fiber.reduce((a, b) => a + b, 0) / 7;
  
  return {
    calories: Math.round(avgCalories),
    protein: Math.round(avgProtein * 10) / 10,
    carbs: Math.round(avgCarbs * 10) / 10,
    fats: Math.round(avgFats * 10) / 10,
    fiber: Math.round(avgFiber * 10) / 10,
  };
}

// Clear today's data (for testing or reset)
export function clearTodayData(): void {
  const today = getTodayDate();
  const history = getAllDailyNutrition();
  const filtered = history.filter(entry => entry.date !== today);
  localStorage.setItem('daily-nutrition-history', JSON.stringify(filtered));
  
  // Also clear current day's entries
  localStorage.setItem('food-entries', '[]');
  localStorage.setItem('waterIntake', '0');
}
