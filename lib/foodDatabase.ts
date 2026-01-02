// Food Database - Nutritional Information per 100g
export interface FoodItem {
  id: string;
  name: string;
  category: string;
  // Nutrients per 100g
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  // Common serving sizes
  servingSizes: {
    name: string;
    grams: number;
  }[];
}

export const foodDatabase: FoodItem[] = [
  // PROTEINS
  {
    id: "chicken_breast",
    name: "Chicken Breast (Grilled)",
    category: "Protein",
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    fiber: 0,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },
  {
    id: "salmon",
    name: "Salmon (Cooked)",
    category: "Protein",
    calories: 206,
    protein: 22,
    carbs: 0,
    fats: 13,
    fiber: 0,
    servingSizes: [
      { name: "Small fillet (100g)", grams: 100 },
      { name: "Medium fillet (150g)", grams: 150 },
      { name: "Large fillet (200g)", grams: 200 },
    ]
  },
  {
    id: "eggs",
    name: "Eggs (Whole)",
    category: "Protein",
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fats: 11,
    fiber: 0,
    servingSizes: [
      { name: "1 egg (50g)", grams: 50 },
      { name: "2 eggs (100g)", grams: 100 },
      { name: "3 eggs (150g)", grams: 150 },
    ]
  },
  {
    id: "ground_beef",
    name: "Ground Beef (Lean)",
    category: "Protein",
    calories: 250,
    protein: 26,
    carbs: 0,
    fats: 15,
    fiber: 0,
    servingSizes: [
      { name: "Small patty (100g)", grams: 100 },
      { name: "Medium patty (150g)", grams: 150 },
      { name: "Large patty (200g)", grams: 200 },
    ]
  },
  {
    id: "tuna",
    name: "Tuna (Canned in Water)",
    category: "Protein",
    calories: 116,
    protein: 26,
    carbs: 0,
    fats: 0.8,
    fiber: 0,
    servingSizes: [
      { name: "Small can (100g)", grams: 100 },
      { name: "Large can (150g)", grams: 150 },
    ]
  },
  {
    id: "greek_yogurt",
    name: "Greek Yogurt (Plain)",
    category: "Protein",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fats: 0.4,
    fiber: 0,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },
  {
    id: "tofu",
    name: "Tofu (Firm)",
    category: "Protein",
    calories: 76,
    protein: 8,
    carbs: 1.9,
    fats: 4.8,
    fiber: 0.3,
    servingSizes: [
      { name: "Small block (100g)", grams: 100 },
      { name: "Medium block (150g)", grams: 150 },
      { name: "Large block (200g)", grams: 200 },
    ]
  },

  // CARBS - GRAINS
  {
    id: "white_rice",
    name: "White Rice (Cooked)",
    category: "Carbs",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    fiber: 0.4,
    servingSizes: [
      { name: "Small bowl (100g)", grams: 100 },
      { name: "Medium bowl (150g)", grams: 150 },
      { name: "Large bowl (200g)", grams: 200 },
    ]
  },
  {
    id: "brown_rice",
    name: "Brown Rice (Cooked)",
    category: "Carbs",
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fats: 0.9,
    fiber: 1.8,
    servingSizes: [
      { name: "Small bowl (100g)", grams: 100 },
      { name: "Medium bowl (150g)", grams: 150 },
      { name: "Large bowl (200g)", grams: 200 },
    ]
  },
  {
    id: "quinoa",
    name: "Quinoa (Cooked)",
    category: "Carbs",
    calories: 120,
    protein: 4.4,
    carbs: 21,
    fats: 1.9,
    fiber: 2.8,
    servingSizes: [
      { name: "Small bowl (100g)", grams: 100 },
      { name: "Medium bowl (150g)", grams: 150 },
      { name: "Large bowl (200g)", grams: 200 },
    ]
  },
  {
    id: "pasta",
    name: "Pasta (Cooked)",
    category: "Carbs",
    calories: 131,
    protein: 5,
    carbs: 25,
    fats: 1.1,
    fiber: 1.8,
    servingSizes: [
      { name: "Small serving (100g)", grams: 100 },
      { name: "Medium serving (150g)", grams: 150 },
      { name: "Large serving (200g)", grams: 200 },
    ]
  },
  {
    id: "oats",
    name: "Oats (Dry)",
    category: "Carbs",
    calories: 389,
    protein: 16.9,
    carbs: 66,
    fats: 6.9,
    fiber: 10.6,
    servingSizes: [
      { name: "Small (40g)", grams: 40 },
      { name: "Medium (60g)", grams: 60 },
      { name: "Large (80g)", grams: 80 },
    ]
  },
  {
    id: "sweet_potato",
    name: "Sweet Potato (Baked)",
    category: "Carbs",
    calories: 90,
    protein: 2,
    carbs: 21,
    fats: 0.2,
    fiber: 3.3,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },
  {
    id: "whole_wheat_bread",
    name: "Whole Wheat Bread",
    category: "Carbs",
    calories: 247,
    protein: 13,
    carbs: 41,
    fats: 3.4,
    fiber: 7,
    servingSizes: [
      { name: "1 slice (30g)", grams: 30 },
      { name: "2 slices (60g)", grams: 60 },
      { name: "3 slices (90g)", grams: 90 },
    ]
  },

  // VEGETABLES
  {
    id: "broccoli",
    name: "Broccoli (Cooked)",
    category: "Vegetables",
    calories: 35,
    protein: 2.4,
    carbs: 7,
    fats: 0.4,
    fiber: 3.3,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },
  {
    id: "spinach",
    name: "Spinach (Cooked)",
    category: "Vegetables",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.3,
    fiber: 2.4,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },
  {
    id: "carrots",
    name: "Carrots (Raw)",
    category: "Vegetables",
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fats: 0.2,
    fiber: 2.8,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },
  {
    id: "bell_peppers",
    name: "Bell Peppers (Raw)",
    category: "Vegetables",
    calories: 31,
    protein: 1,
    carbs: 6,
    fats: 0.3,
    fiber: 2.1,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },
  {
    id: "tomatoes",
    name: "Tomatoes (Raw)",
    category: "Vegetables",
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fats: 0.2,
    fiber: 1.2,
    servingSizes: [
      { name: "Small tomato (100g)", grams: 100 },
      { name: "Medium tomato (150g)", grams: 150 },
      { name: "Large tomato (200g)", grams: 200 },
    ]
  },

  // FRUITS
  {
    id: "banana",
    name: "Banana",
    category: "Fruits",
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fats: 0.3,
    fiber: 2.6,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (120g)", grams: 120 },
      { name: "Large (150g)", grams: 150 },
    ]
  },
  {
    id: "apple",
    name: "Apple",
    category: "Fruits",
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fats: 0.2,
    fiber: 2.4,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },
  {
    id: "strawberries",
    name: "Strawberries",
    category: "Fruits",
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fats: 0.3,
    fiber: 2,
    servingSizes: [
      { name: "Small serving (100g)", grams: 100 },
      { name: "Medium serving (150g)", grams: 150 },
      { name: "Large serving (200g)", grams: 200 },
    ]
  },
  {
    id: "blueberries",
    name: "Blueberries",
    category: "Fruits",
    calories: 57,
    protein: 0.7,
    carbs: 14,
    fats: 0.3,
    fiber: 2.4,
    servingSizes: [
      { name: "Small serving (100g)", grams: 100 },
      { name: "Medium serving (150g)", grams: 150 },
      { name: "Large serving (200g)", grams: 200 },
    ]
  },
  {
    id: "orange",
    name: "Orange",
    category: "Fruits",
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fats: 0.1,
    fiber: 2.4,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },

  // HEALTHY FATS
  {
    id: "avocado",
    name: "Avocado",
    category: "Fats",
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fats: 15,
    fiber: 6.7,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Whole (200g)", grams: 200 },
    ]
  },
  {
    id: "almonds",
    name: "Almonds",
    category: "Fats",
    calories: 579,
    protein: 21,
    carbs: 22,
    fats: 50,
    fiber: 12.5,
    servingSizes: [
      { name: "Small handful (20g)", grams: 20 },
      { name: "Medium handful (30g)", grams: 30 },
      { name: "Large handful (40g)", grams: 40 },
    ]
  },
  {
    id: "peanut_butter",
    name: "Peanut Butter",
    category: "Fats",
    calories: 588,
    protein: 25,
    carbs: 20,
    fats: 50,
    fiber: 6,
    servingSizes: [
      { name: "1 tbsp (15g)", grams: 15 },
      { name: "2 tbsp (30g)", grams: 30 },
      { name: "3 tbsp (45g)", grams: 45 },
    ]
  },
  {
    id: "olive_oil",
    name: "Olive Oil",
    category: "Fats",
    calories: 884,
    protein: 0,
    carbs: 0,
    fats: 100,
    fiber: 0,
    servingSizes: [
      { name: "1 tsp (5g)", grams: 5 },
      { name: "1 tbsp (15g)", grams: 15 },
      { name: "2 tbsp (30g)", grams: 30 },
    ]
  },
  {
    id: "walnuts",
    name: "Walnuts",
    category: "Fats",
    calories: 654,
    protein: 15,
    carbs: 14,
    fats: 65,
    fiber: 6.7,
    servingSizes: [
      { name: "Small handful (20g)", grams: 20 },
      { name: "Medium handful (30g)", grams: 30 },
      { name: "Large handful (40g)", grams: 40 },
    ]
  },

  // DAIRY
  {
    id: "milk",
    name: "Milk (Whole)",
    category: "Dairy",
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fats: 3.3,
    fiber: 0,
    servingSizes: [
      { name: "Small glass (200ml)", grams: 200 },
      { name: "Medium glass (250ml)", grams: 250 },
      { name: "Large glass (300ml)", grams: 300 },
    ]
  },
  {
    id: "cheese",
    name: "Cheddar Cheese",
    category: "Dairy",
    calories: 403,
    protein: 25,
    carbs: 1.3,
    fats: 33,
    fiber: 0,
    servingSizes: [
      { name: "Small slice (20g)", grams: 20 },
      { name: "Medium slice (30g)", grams: 30 },
      { name: "Large slice (40g)", grams: 40 },
    ]
  },
  {
    id: "cottage_cheese",
    name: "Cottage Cheese",
    category: "Dairy",
    calories: 98,
    protein: 11,
    carbs: 3.4,
    fats: 4.3,
    fiber: 0,
    servingSizes: [
      { name: "Small (100g)", grams: 100 },
      { name: "Medium (150g)", grams: 150 },
      { name: "Large (200g)", grams: 200 },
    ]
  },
];

// Calculate nutrients for a specific quantity
export function calculateNutrients(food: FoodItem, grams: number) {
  const multiplier = grams / 100;
  return {
    calories: Math.round(food.calories * multiplier),
    protein: Math.round(food.protein * multiplier * 10) / 10,
    carbs: Math.round(food.carbs * multiplier * 10) / 10,
    fats: Math.round(food.fats * multiplier * 10) / 10,
    fiber: Math.round(food.fiber * multiplier * 10) / 10,
  };
}

// Search foods by name or category
export function searchFoods(query: string): FoodItem[] {
  const lowerQuery = query.toLowerCase();
  return foodDatabase.filter(
    food =>
      food.name.toLowerCase().includes(lowerQuery) ||
      food.category.toLowerCase().includes(lowerQuery)
  );
}

// Get foods by category
export function getFoodsByCategory(category: string): FoodItem[] {
  return foodDatabase.filter(food => food.category === category);
}

// Get all categories
export function getCategories(): string[] {
  return Array.from(new Set(foodDatabase.map(food => food.category)));
}
