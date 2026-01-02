import { FoodRecognitionResult, MealSuggestion, NutritionTip } from './types';

export const FOOD_DATABASE: Record<string, Omit<FoodRecognitionResult, 'name' | 'confidence'>> = {
  'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g' },
  'salmon': { calories: 208, protein: 20, carbs: 0, fat: 13, serving: '100g' },
  'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, serving: '100g' },
  'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: '100g' },
  'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: '1 medium' },
  'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, serving: '1 medium' },
  'egg': { calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: '2 large' },
  'avocado': { calories: 160, protein: 2, carbs: 8.5, fat: 15, serving: '100g' },
  'oatmeal': { calories: 389, protein: 17, carbs: 66, fat: 7, serving: '100g' },
  'greek yogurt': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, serving: '100g' },
  'sweet potato': { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: '100g' },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: '100g' },
  'almonds': { calories: 579, protein: 21, carbs: 22, fat: 50, serving: '100g' },
  'pasta': { calories: 131, protein: 5, carbs: 25, fat: 1.1, serving: '100g cooked' },
  'ground beef': { calories: 250, protein: 26, carbs: 0, fat: 15, serving: '100g' },
  'tuna': { calories: 116, protein: 26, carbs: 0, fat: 0.8, serving: '100g' },
  'pizza': { calories: 266, protein: 11, carbs: 33, fat: 10, serving: '1 slice' },
  'burger': { calories: 295, protein: 17, carbs: 24, fat: 14, serving: '1 burger' },
  'salad': { calories: 50, protein: 3, carbs: 8, fat: 1.5, serving: '1 bowl' },
  'smoothie': { calories: 150, protein: 6, carbs: 28, fat: 2, serving: '1 cup' },
};

export const MEAL_SUGGESTIONS: MealSuggestion[] = [
  {
    name: 'Grilled Chicken & Vegetables',
    calories: 450,
    protein: 45,
    carbs: 35,
    fat: 12,
    description: 'Lean protein with colorful roasted vegetables',
    ingredients: ['Chicken breast', 'Broccoli', 'Bell peppers', 'Olive oil', 'Spices']
  },
  {
    name: 'Salmon Bowl',
    calories: 520,
    protein: 38,
    carbs: 48,
    fat: 18,
    description: 'Omega-3 rich salmon with quinoa and greens',
    ingredients: ['Salmon fillet', 'Quinoa', 'Spinach', 'Avocado', 'Lemon']
  },
  {
    name: 'Greek Yogurt Parfait',
    calories: 320,
    protein: 25,
    carbs: 42,
    fat: 6,
    description: 'High-protein breakfast with berries and granola',
    ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey', 'Almonds']
  },
  {
    name: 'Protein Smoothie Bowl',
    calories: 380,
    protein: 28,
    carbs: 45,
    fat: 10,
    description: 'Refreshing smoothie bowl with toppings',
    ingredients: ['Protein powder', 'Banana', 'Berries', 'Almond milk', 'Chia seeds']
  },
  {
    name: 'Turkey & Avocado Wrap',
    calories: 420,
    protein: 32,
    carbs: 38,
    fat: 16,
    description: 'Balanced wrap with lean turkey and healthy fats',
    ingredients: ['Turkey breast', 'Whole wheat wrap', 'Avocado', 'Lettuce', 'Tomato']
  },
  {
    name: 'Egg White Omelette',
    calories: 285,
    protein: 30,
    carbs: 18,
    fat: 8,
    description: 'Low-calorie, high-protein breakfast',
    ingredients: ['Egg whites', 'Spinach', 'Mushrooms', 'Feta cheese', 'Toast']
  }
];

export const NUTRITION_TIPS: NutritionTip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily. Proper hydration supports metabolism and helps control appetite.',
    category: 'hydration',
    icon: '💧'
  },
  {
    id: '2',
    title: 'Protein Power',
    description: 'Aim for 0.8-1g of protein per pound of body weight to support muscle maintenance and satiety.',
    category: 'macros',
    icon: '💪'
  },
  {
    id: '3',
    title: 'Time Your Carbs',
    description: 'Consume most carbs around workouts for optimal energy and recovery.',
    category: 'timing',
    icon: '⏰'
  },
  {
    id: '4',
    title: 'Fiber is Your Friend',
    description: 'Aim for 25-30g of fiber daily to support digestion and maintain steady energy levels.',
    category: 'general',
    icon: '🥗'
  },
  {
    id: '5',
    title: 'Meal Frequency',
    description: 'Eating 4-6 smaller meals can help maintain steady blood sugar and energy throughout the day.',
    category: 'timing',
    icon: '🍽️'
  },
  {
    id: '6',
    title: 'Healthy Fats Matter',
    description: 'Include omega-3 rich foods like fish, nuts, and avocados for heart and brain health.',
    category: 'macros',
    icon: '🥑'
  }
];

export function simulateFoodRecognition(imageName: string): FoodRecognitionResult {
  const foods = Object.keys(FOOD_DATABASE);
  const randomFood = foods[Math.floor(Math.random() * foods.length)];
  const foodData = FOOD_DATABASE[randomFood];
  
  return {
    name: randomFood,
    confidence: 0.85 + Math.random() * 0.12,
    ...foodData
  };
}

export function calculateBMR(weight: number, height: number, age: number, gender: string): number {
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  return bmr * (activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2);
}

export function calculateMacros(calories: number, goal: string) {
  let proteinRatio = 0.3;
  let carbRatio = 0.4;
  let fatRatio = 0.3;
  
  if (goal === 'lose') {
    proteinRatio = 0.35;
    carbRatio = 0.35;
    fatRatio = 0.3;
  } else if (goal === 'gain') {
    proteinRatio = 0.3;
    carbRatio = 0.45;
    fatRatio = 0.25;
  }
  
  return {
    protein: Math.round((calories * proteinRatio) / 4),
    carbs: Math.round((calories * carbRatio) / 4),
    fat: Math.round((calories * fatRatio) / 9)
  };
}

export function getRandomTip(): NutritionTip {
  return NUTRITION_TIPS[Math.floor(Math.random() * NUTRITION_TIPS.length)];
}

export function getSuggestedMeals(remainingCalories: number): MealSuggestion[] {
  return MEAL_SUGGESTIONS.filter(meal => meal.calories <= remainingCalories + 100)
    .sort((a, b) => Math.abs(a.calories - remainingCalories / 2) - Math.abs(b.calories - remainingCalories / 2))
    .slice(0, 3);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// NEW GOAL-BASED CALCULATION SYSTEM

type GoalType = 'cut' | 'maintain' | 'bulk';
type Gender = 'male' | 'female';
type ActivityLevel = 'low' | 'moderate' | 'high';

// System 1: Automatic goal detection based on current vs goal weight
export function calculateByWeightGoal(
  gender: Gender,
  currentWeight: number,
  goalWeight: number,
  activityLevel: ActivityLevel
) {
  // 1. Determine goal automatically
  let goal: GoalType;
  if (goalWeight > currentWeight) {
    goal = 'bulk';
  } else if (goalWeight < currentWeight) {
    goal = 'cut';
  } else {
    goal = 'maintain';
  }

  // 2. Base calories
  const baseCalories = gender === 'male' 
    ? currentWeight * 34 
    : currentWeight * 32;

  // 3. Activity multiplier
  let activityMultiplier = 1.0;
  if (activityLevel === 'moderate') activityMultiplier = 1.1;
  if (activityLevel === 'high') activityMultiplier = 1.2;

  const maintenanceCalories = baseCalories * activityMultiplier;

  // 4. Goal adjustment
  let calorieAdjustment = 0;
  if (goal === 'cut') calorieAdjustment = -400;
  if (goal === 'bulk') calorieAdjustment = 350;

  const totalCalories = maintenanceCalories + calorieAdjustment;

  // 5. Protein (goal-based)
  const proteinMultiplier = 
    goal === 'cut' ? 2.2 :
    goal === 'bulk' ? 2.0 :
    1.8;

  const protein = currentWeight * proteinMultiplier;

  // 6. Fat (gender-aware)
  const fat = gender === 'male' 
    ? currentWeight * 0.9 
    : currentWeight * 1.0;

  // 7. Carbs (calculated last)
  const carbs = (totalCalories - (protein * 4) - (fat * 9)) / 4;

  return {
    goal,
    calories: Math.round(totalCalories),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs),
    maintenanceCalories: Math.round(maintenanceCalories)
  };
}

// System 2: Manual goal selection (Cut/Maintain/Bulk buttons)
export function calculateByManualGoal(
  gender: Gender,
  weight: number,
  activityLevel: ActivityLevel,
  goal: GoalType
) {
  // Base calories
  const baseCalories = gender === 'male' 
    ? weight * 34 
    : weight * 32;

  // Activity multiplier
  let multiplier = 1.0;
  if (activityLevel === 'moderate') multiplier = 1.1;
  if (activityLevel === 'high') multiplier = 1.2;

  const maintenance = baseCalories * multiplier;

  // Goal-based calorie adjustment
  let calorieAdjustment = 0;
  if (goal === 'cut') calorieAdjustment = -400;
  if (goal === 'bulk') calorieAdjustment = 350;

  const calories = maintenance + calorieAdjustment;

  // Protein
  const proteinMultiplier = 
    goal === 'cut' ? 2.2 :
    goal === 'bulk' ? 2.0 :
    1.8;

  const protein = weight * proteinMultiplier;

  // Fat
  const fat = gender === 'male' 
    ? weight * 0.9 
    : weight * 1.0;

  // Carbs
  const carbs = (calories - protein * 4 - fat * 9) / 4;

  return {
    goal,
    calories: Math.round(calories),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs),
    maintenanceCalories: Math.round(maintenance)
  };
}
