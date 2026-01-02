'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Calculator, TrendingUp, Flame, X, Check } from 'lucide-react';
import { foodDatabase, calculateNutrients, searchFoods, getCategories, FoodItem } from '@/lib/foodDatabase';

interface TrackedFood {
  id: string;
  food: FoodItem;
  grams: number;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
}

export default function MealPlans() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedGrams, setSelectedGrams] = useState(100);
  const [trackedFoods, setTrackedFoods] = useState<TrackedFood[]>([]);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  // Load tracked foods from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('meal-plan-tracked-foods');
    if (saved) {
      try {
        setTrackedFoods(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading tracked foods:', e);
      }
    }
  }, []);

  // Save tracked foods to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('meal-plan-tracked-foods', JSON.stringify(trackedFoods));
  }, [trackedFoods]);

  const categories = ['All', ...getCategories()];
  
  // Filter foods based on search and category
  const filteredFoods = searchQuery
    ? searchFoods(searchQuery)
    : selectedCategory === 'All'
    ? foodDatabase
    : foodDatabase.filter(f => f.category === selectedCategory);

  // Calculate total nutrients
  const totals = trackedFoods.reduce(
    (acc, item) => ({
      calories: acc.calories + item.nutrients.calories,
      protein: acc.protein + item.nutrients.protein,
      carbs: acc.carbs + item.nutrients.carbs,
      fats: acc.fats + item.nutrients.fats,
      fiber: acc.fiber + item.nutrients.fiber,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
  );

  const handleAddFood = () => {
    if (!selectedFood) return;

    const nutrients = calculateNutrients(selectedFood, selectedGrams);
    const newFood: TrackedFood = {
      id: `${selectedFood.id}-${Date.now()}`,
      food: selectedFood,
      grams: selectedGrams,
      nutrients,
    };

    setTrackedFoods([...trackedFoods, newFood]);
    setSelectedFood(null);
    setSelectedGrams(100);
  };

  const handleRemoveFood = (id: string) => {
    setTrackedFoods(trackedFoods.filter(f => f.id !== id));
  };

  const handleAddToTodaysMeals = () => {
    if (trackedFoods.length === 0) return;

    // Get existing dashboard meals
    const existingMeals = JSON.parse(localStorage.getItem('food-entries') || '[]');
    
    // Convert tracked foods to dashboard format
    const newMeals = trackedFoods.map(item => ({
      id: `meal-${Date.now()}-${Math.random()}`,
      name: item.food.name,
      calories: item.nutrients.calories,
      protein: item.nutrients.protein,
      carbs: item.nutrients.carbs,
      fats: item.nutrients.fats,
      fiber: item.nutrients.fiber,
      grams: item.grams,
      timestamp: new Date().toISOString(),
    }));

    // Combine and save
    const allMeals = [...existingMeals, ...newMeals];
    localStorage.setItem('food-entries', JSON.stringify(allMeals));

    // Clear tracked foods and show success message
    setTrackedFoods([]);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);

    // Dispatch event so Dashboard can update
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-600 dark:to-amber-700 rounded-3xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Nutrition Calculator</h2>
            <p className="text-yellow-100">Search foods and calculate your daily nutrition</p>
          </div>
          <Calculator className="w-12 h-12 opacity-80" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Food Search & Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-200 dark:border-gray-700">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for foods... (e.g., chicken, rice, banana)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:text-gray-100"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Food List */}
            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredFoods.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No foods found. Try a different search term.</p>
                </div>
              ) : (
                filteredFoods.map((food) => (
                  <motion.button
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedFood?.id === food.id
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500'
                        : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-yellow-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">{food.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{food.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{food.calories} cal</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">per 100g</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-3 text-xs">
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{food.protein}g</p>
                        <p className="text-gray-500 dark:text-gray-400">Protein</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{food.carbs}g</p>
                        <p className="text-gray-500 dark:text-gray-400">Carbs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{food.fats}g</p>
                        <p className="text-gray-500 dark:text-gray-400">Fats</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{food.fiber}g</p>
                        <p className="text-gray-500 dark:text-gray-400">Fiber</p>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </div>

          {/* Serving Size Selection */}
          {selectedFood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-yellow-500"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Select Serving Size</h3>
                <button
                  onClick={() => setSelectedFood(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedFood.name}</p>

              {/* Quick Serving Sizes */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {selectedFood.servingSizes.map((serving) => (
                  <button
                    key={serving.name}
                    onClick={() => setSelectedGrams(serving.grams)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedGrams === serving.grams
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-yellow-400'
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{serving.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{serving.grams}g</p>
                  </button>
                ))}
              </div>

              {/* Custom Grams */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Custom Amount (grams)
                </label>
                <input
                  type="number"
                  value={selectedGrams}
                  onChange={(e) => setSelectedGrams(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:text-gray-100"
                  min="1"
                />
              </div>

              {/* Calculated Nutrients */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-4 mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Nutrients for {selectedGrams}g:
                </p>
                <div className="grid grid-cols-5 gap-3">
                  {Object.entries(calculateNutrients(selectedFood, selectedGrams)).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{value}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                        {key === 'calories' ? 'cal' : 'g ' + key}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddFood}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-amber-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add to Meal Tracker
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Column - Tracked Foods & Totals */}
        <div className="space-y-6">
          {/* Daily Totals */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6" />
              <h3 className="text-xl font-bold">Daily Totals</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-green-100">Calories</span>
                <span className="text-2xl font-bold">{totals.calories}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">Protein</span>
                <span className="text-xl font-bold">{totals.protein.toFixed(1)}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">Carbs</span>
                <span className="text-xl font-bold">{totals.carbs.toFixed(1)}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">Fats</span>
                <span className="text-xl font-bold">{totals.fats.toFixed(1)}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">Fiber</span>
                <span className="text-xl font-bold">{totals.fiber.toFixed(1)}g</span>
              </div>
            </div>
          </div>

          {/* Add to Today's Meals Button */}
          {trackedFoods.length > 0 && (
            <motion.button
              onClick={handleAddToTodaysMeals}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl font-bold hover:from-yellow-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              Add to Today&apos;s Meals
            </motion.button>
          )}

          {/* Success Message */}
          <AnimatePresence>
            {showAddedMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-500 text-white rounded-xl p-4 flex items-center gap-3 shadow-lg"
              >
                <Check className="w-5 h-5" />
                <div>
                  <p className="font-bold">Added to Dashboard!</p>
                  <p className="text-sm text-green-100">Your meals are now tracked in Today&apos;s Meals</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tracked Foods List */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Tracked Foods ({trackedFoods.length})
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {trackedFoods.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No foods tracked yet.</p>
                    <p className="text-xs mt-1">Search and add foods to start tracking!</p>
                  </div>
                ) : (
                  trackedFoods.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                            {item.food.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.grams}g</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFood(item.id)}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-5 gap-1 text-xs">
                        <div className="text-center">
                          <p className="font-bold text-gray-900 dark:text-gray-100">{item.nutrients.calories}</p>
                          <p className="text-gray-500 dark:text-gray-400">cal</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-gray-900 dark:text-gray-100">{item.nutrients.protein}g</p>
                          <p className="text-gray-500 dark:text-gray-400">P</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-gray-900 dark:text-gray-100">{item.nutrients.carbs}g</p>
                          <p className="text-gray-500 dark:text-gray-400">C</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-gray-900 dark:text-gray-100">{item.nutrients.fats}g</p>
                          <p className="text-gray-500 dark:text-gray-400">F</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-gray-900 dark:text-gray-100">{item.nutrients.fiber}g</p>
                          <p className="text-gray-500 dark:text-gray-400">Fb</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
