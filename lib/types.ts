export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  serving?: string;
  time?: Date;
  timestamp?: string;
  imageUrl?: string;
}

export interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

export interface UserProfile {
  name: string;
  weight: number;
  targetWeight: number;
  height: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  goal: 'lose' | 'maintain' | 'gain';
}

export interface WeightEntry {
  date: Date;
  weight: number;
}

export interface MealSuggestion {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  ingredients: string[];
}

export interface NutritionTip {
  id: string;
  title: string;
  description: string;
  category: 'hydration' | 'macros' | 'timing' | 'general';
  icon: string;
}

export interface FoodRecognitionResult {
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  isFood?: boolean;
}
