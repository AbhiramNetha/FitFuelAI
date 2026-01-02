'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';
import Goals from '@/components/Goals';
import MealPlans from '@/components/MealPlans';
import HealthTips from '@/components/HealthTips';
import WorkoutLibrary from '@/components/WorkoutLibrary';
import NutritionHistory from '@/components/NutritionHistory';
import { FoodEntry, DailyGoals, UserProfile, WeightEntry } from '@/lib/types';
import { calculateBMR, calculateTDEE, calculateMacros, generateId } from '@/lib/utils';
import { getTodayDate, saveDailyNutrition, checkNewDay } from '@/lib/dailyNutrition';

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'User',
    weight: 70,
    targetWeight: 65,
    height: 170,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'lose'
  });

  const [dailyGoals, setDailyGoals] = useState<DailyGoals>(() => {
    const bmr = calculateBMR(
      userProfile.weight,
      userProfile.height,
      userProfile.age,
      userProfile.gender
    );
    const tdee = calculateTDEE(bmr, userProfile.activityLevel);
    const targetCalories = userProfile.goal === 'lose' ? tdee - 500 : 
                          userProfile.goal === 'gain' ? tdee + 500 : tdee;
    const macros = calculateMacros(targetCalories, userProfile.goal);
    
    return {
      calories: Math.round(targetCalories),
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      water: 8
    };
  });

  // Calculate totals from food entries
  const totals = foodEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + (entry.fats || 0)
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  // Load data from localStorage
  useEffect(() => {
    // Check if it's a new day
    const isNewDay = checkNewDay();
    if (isNewDay) {
      // New day detected - reset daily data
      console.log('New day detected - resetting daily data');
      setFoodEntries([]);
      setWaterIntake(0);
    }

    const savedEntries = localStorage.getItem('food-entries');
    const savedWater = localStorage.getItem('waterIntake');
    const savedProfile = localStorage.getItem('userProfile');
    const savedWeight = localStorage.getItem('weightHistory');
    const savedGoals = localStorage.getItem('dailyGoals');

    if (savedEntries && !isNewDay) {
      try {
        const entries = JSON.parse(savedEntries);
        // Migrate old data: ensure all entries have 'fats' field
        const migratedEntries = entries.map((entry: any) => ({
          ...entry,
          fats: entry.fats ?? entry.fat ?? 0, // Use fats, fall back to fat, or 0
          fiber: entry.fiber ?? 0,
        }));
        setFoodEntries(migratedEntries);
      } catch (e) {
        console.error('Error loading food entries:', e);
        setFoodEntries([]);
      }
    }
    if (savedWater && !isNewDay) setWaterIntake(JSON.parse(savedWater));
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedWeight) setWeightHistory(JSON.parse(savedWeight));
    if (savedGoals) setDailyGoals(JSON.parse(savedGoals));

    // Listen for storage changes from MealPlans
    const handleStorageChange = () => {
      const updatedEntries = localStorage.getItem('food-entries');
      if (updatedEntries) {
        try {
          const entries = JSON.parse(updatedEntries);
          // Migrate data here too
          const migratedEntries = entries.map((entry: any) => ({
            ...entry,
            fats: entry.fats ?? entry.fat ?? 0,
            fiber: entry.fiber ?? 0,
          }));
          setFoodEntries(migratedEntries);
        } catch (e) {
          console.error('Error loading updated entries:', e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('food-entries', JSON.stringify(foodEntries));
  }, [foodEntries]);

  useEffect(() => {
    localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
  }, [weightHistory]);

  useEffect(() => {
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
  }, [dailyGoals]);

  // Save daily nutrition history
  useEffect(() => {
    if (foodEntries.length > 0 || waterIntake > 0) {
      const today = getTodayDate();
      const dailyData = {
        date: today,
        calories: totals.calories,
        protein: totals.protein,
        carbs: totals.carbs,
        fats: totals.fat,
        fiber: foodEntries.reduce((sum, entry) => sum + (entry.fiber || 0), 0),
        water: waterIntake,
        meals: foodEntries.map(entry => ({
          id: entry.id,
          name: entry.name,
          calories: entry.calories,
          protein: entry.protein,
          carbs: entry.carbs,
          fats: entry.fats,
          fiber: entry.fiber || 0,
          timestamp: entry.timestamp || new Date().toISOString(),
        })),
      };
      saveDailyNutrition(dailyData);
    }
  }, [foodEntries, waterIntake, totals]);

  const addFoodEntry = (entry: Omit<FoodEntry, 'id' | 'time'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: generateId(),
      time: new Date()
    };
    setFoodEntries([...foodEntries, newEntry]);
  };

  const removeFoodEntry = (id: string) => {
    setFoodEntries(foodEntries.filter(entry => entry.id !== id));
  };

  const addWater = (amount: number) => {
    setWaterIntake(prev => prev + amount);
  };

  const updateGoals = (goals: Partial<DailyGoals>) => {
    setDailyGoals(prev => ({ ...prev, ...goals }));
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    const newProfile = { ...userProfile, ...profile };
    setUserProfile(newProfile);
    
    // Recalculate goals when profile changes
    const bmr = calculateBMR(
      newProfile.weight,
      newProfile.height,
      newProfile.age,
      newProfile.gender
    );
    const tdee = calculateTDEE(bmr, newProfile.activityLevel);
    const targetCalories = newProfile.goal === 'lose' ? tdee - 500 : 
                          newProfile.goal === 'gain' ? tdee + 500 : tdee;
    const macros = calculateMacros(targetCalories, newProfile.goal);
    
    setDailyGoals({
      calories: Math.round(targetCalories),
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      water: 8
    });
  };

  const addWeightEntry = (weight: number) => {
    const newEntry: WeightEntry = {
      date: new Date(),
      weight
    };
    setWeightHistory([...weightHistory, newEntry]);
    updateProfile({ weight });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            totals={totals}
            goals={dailyGoals}
            foodEntries={foodEntries}
            waterIntake={waterIntake}
            onAddWater={addWater}
            onRemoveEntry={removeFoodEntry}
          />
        );
      case 'goals':
        return (
          <Goals
            profile={userProfile}
            goals={dailyGoals}
            weightHistory={weightHistory}
            onUpdateProfile={updateProfile}
            onUpdateGoals={updateGoals}
            onAddWeight={addWeightEntry}
          />
        );
      case 'workouts':
        return <WorkoutLibrary />;
      case 'meals':
        return (
          <MealPlans
            remainingCalories={dailyGoals.calories - totals.calories}
            onAddMeal={addFoodEntry}
          />
        );
      case 'tips':
        return <HealthTips totals={totals} goals={dailyGoals} />;
      case 'history':
        return <NutritionHistory />;
      default:
        return null;
    }
  };

  return (
    <>
      {showLanding ? (
        <LandingPage onGetStarted={() => setShowLanding(false)} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <Header activeTab={activeTab} onTabChange={setActiveTab} />
          
          <main className="container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      )}
    </>
  );
}
