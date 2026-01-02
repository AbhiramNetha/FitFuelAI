'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Calculator, Scale, Droplet, Flame, Dumbbell, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserProfile, DailyGoals, WeightEntry } from '@/lib/types';
import { calculateByWeightGoal, calculateByManualGoal } from '@/lib/utils';

interface GoalsProps {
  profile: UserProfile;
  goals: DailyGoals;
  weightHistory: WeightEntry[];
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  onUpdateGoals: (goals: Partial<DailyGoals>) => void;
  onAddWeight: (weight: number) => void;
}

export default function Goals({ profile, goals, weightHistory, onUpdateProfile, onUpdateGoals, onAddWeight }: GoalsProps) {
  const [calculatorMode, setCalculatorMode] = useState<'auto' | 'manual'>('auto');
  const [activeTab, setActiveTab] = useState<'calculator' | 'progress'>('calculator');
  const [newWeight, setNewWeight] = useState(profile.weight.toString());
  const [manualGoal, setManualGoal] = useState<'cut' | 'maintain' | 'bulk'>('maintain');
  
  // Convert activity level to simplified format
  const getSimplifiedActivity = (): 'low' | 'moderate' | 'high' => {
    if (profile.activityLevel === 'sedentary') return 'low';
    if (profile.activityLevel === 'light' || profile.activityLevel === 'moderate') return 'moderate';
    return 'high';
  };

  const handleCalculate = () => {
    const gender = profile.gender as 'male' | 'female';
    const activity = getSimplifiedActivity();
    
    let result;
    if (calculatorMode === 'auto') {
      // System 1: Auto-detect goal from weights
      result = calculateByWeightGoal(gender, profile.weight, profile.targetWeight, activity);
    } else {
      // System 2: Manual goal selection
      result = calculateByManualGoal(gender, profile.weight, activity, manualGoal);
    }

    // Update goals with calculated values
    onUpdateGoals({
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fat: result.fat,
    });
  };

  const handleAddWeight = () => {
    const weight = parseFloat(newWeight);
    if (!isNaN(weight) && weight > 0) {
      onAddWeight(weight);
    }
  };

  const weightData = weightHistory.slice(-30).map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: entry.weight
  }));

  // Get current calculation for display
  const gender = profile.gender as 'male' | 'female';
  const activity = getSimplifiedActivity();
  const currentCalc = calculatorMode === 'auto'
    ? calculateByWeightGoal(gender, profile.weight, profile.targetWeight, activity)
    : calculateByManualGoal(gender, profile.weight, activity, manualGoal);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-3xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Smart Goal Calculator</h2>
            <p className="text-blue-100">Production-ready nutrition recommendations</p>
          </div>
          <Target className="w-12 h-12 opacity-80" />
        </div>
      </div>

      {/* Calculator Mode Toggle */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Choose Your Calculation Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setCalculatorMode('auto')}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              calculatorMode === 'auto'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
            }`}
          >
            <div className="flex items-start gap-4">
              <Calculator className={`w-8 h-8 ${calculatorMode === 'auto' ? 'text-blue-500' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Auto-Detect Goal</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enter current & goal weight - system calculates automatically
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">✓ Recommended for beginners</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCalculatorMode('manual')}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              calculatorMode === 'manual'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-400'
            }`}
          >
            <div className="flex items-start gap-4">
              <Dumbbell className={`w-8 h-8 ${calculatorMode === 'manual' ? 'text-purple-500' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Manual Selection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose Cut/Maintain/Bulk buttons directly
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">✓ For experienced users</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            activeTab === 'calculator'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Calculator className="w-5 h-5" />
            Goal Calculator
          </div>
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            activeTab === 'progress'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Progress Tracking
          </div>
        </button>
      </div>

      {activeTab === 'calculator' && (
        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => onUpdateProfile({ gender: 'male' })}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                      profile.gender === 'male'
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => onUpdateProfile({ gender: 'female' })}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                      profile.gender === 'female'
                        ? 'bg-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Current Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  value={profile.weight}
                  onChange={(e) => onUpdateProfile({ weight: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
                  min="30"
                  max="200"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Activity Level
                </label>
                <select
                  value={profile.activityLevel}
                  onChange={(e) => onUpdateProfile({ activityLevel: e.target.value as any })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
                >
                  <option value="sedentary">Low (Sedentary)</option>
                  <option value="light">Moderate (Light activity)</option>
                  <option value="moderate">Moderate (Moderate activity)</option>
                  <option value="active">High (Very active)</option>
                  <option value="veryActive">High (Extremely active)</option>
                </select>
              </div>

              {/* Goal Weight - Only for auto mode */}
              {calculatorMode === 'auto' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Goal Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={profile.targetWeight}
                    onChange={(e) => onUpdateProfile({ targetWeight: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
                    min="30"
                    max="200"
                  />
                </div>
              )}
            </div>

            {/* Manual Goal Selection - Only for manual mode */}
            {calculatorMode === 'manual' && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select Your Goal
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => setManualGoal('cut')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      manualGoal === 'cut'
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-red-400'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <TrendingUp className={`w-8 h-8 mb-2 rotate-180 ${manualGoal === 'cut' ? 'text-red-500' : 'text-gray-400'}`} />
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">CUT</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lose fat</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">-400 cal</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setManualGoal('maintain')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      manualGoal === 'maintain'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Activity className={`w-8 h-8 mb-2 ${manualGoal === 'maintain' ? 'text-blue-500' : 'text-gray-400'}`} />
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">MAINTAIN</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Stay stable</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">+0 cal</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setManualGoal('bulk')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      manualGoal === 'bulk'
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-yellow-400'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Dumbbell className={`w-8 h-8 mb-2 ${manualGoal === 'bulk' ? 'text-yellow-500' : 'text-gray-400'}`} />
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">BULK</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Build muscle</p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">+350 cal</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Calculated Results */}
          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 dark:from-yellow-600 dark:to-yellow-700 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Your Perfect Daily Nutrition</h3>
                <p className="text-yellow-100 mt-1">
                  {calculatorMode === 'auto' 
                    ? `Goal detected: ${currentCalc.goal.toUpperCase()} (${profile.weight}kg → ${profile.targetWeight}kg)`
                    : `Goal selected: ${currentCalc.goal.toUpperCase()}`
                  }
                </p>
              </div>
              <button
                onClick={handleCalculate}
                className="px-6 py-3 bg-white text-yellow-600 rounded-lg font-bold hover:bg-green-50 transition-colors shadow-lg"
              >
                Apply to Dashboard
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5" />
                  <p className="text-green-100 text-sm">Calories</p>
                </div>
                <p className="text-4xl font-bold">{currentCalc.calories}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-green-100 text-sm mb-2">Protein</p>
                <p className="text-4xl font-bold">{currentCalc.protein}g</p>
                <p className="text-xs text-green-100 mt-1">
                  {(profile.weight > 0 ? (currentCalc.protein / profile.weight).toFixed(1) : '0')}g/kg
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-green-100 text-sm mb-2">Carbs</p>
                <p className="text-4xl font-bold">{currentCalc.carbs}g</p>
                <p className="text-xs text-green-100 mt-1">
                  {((currentCalc.carbs * 4 / currentCalc.calories) * 100).toFixed(0)}% cals
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-green-100 text-sm mb-2">Fats</p>
                <p className="text-4xl font-bold">{currentCalc.fat}g</p>
                <p className="text-xs text-green-100 mt-1">
                  {((currentCalc.fat * 9 / currentCalc.calories) * 100).toFixed(0)}% cals
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-semibold mb-3">Calculation Breakdown:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-green-100">Base Calories</p>
                  <p className="font-bold">{gender === 'male' ? profile.weight * 34 : profile.weight * 32} cal</p>
                </div>
                <div>
                  <p className="text-green-100">Activity ({getSimplifiedActivity()})</p>
                  <p className="font-bold">×{getSimplifiedActivity() === 'low' ? '1.0' : getSimplifiedActivity() === 'moderate' ? '1.1' : '1.2'}</p>
                </div>
                <div>
                  <p className="text-green-100">Maintenance</p>
                  <p className="font-bold">{currentCalc.maintenanceCalories} cal</p>
                </div>
                <div>
                  <p className="text-green-100">Adjustment</p>
                  <p className="font-bold">
                    {currentCalc.goal === 'cut' ? '-400' : currentCalc.goal === 'bulk' ? '+350' : '0'} cal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-6">
          {/* Add Weight Entry */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Track Your Weight</h3>
            <div className="flex gap-3">
              <input
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Enter weight (kg)"
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              />
              <button
                onClick={handleAddWeight}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Add Entry
              </button>
            </div>
          </div>

          {/* Weight Chart */}
          {weightData.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Weight Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    stroke="#9ca3af"
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Progress Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-6 h-6" />
                <h4 className="text-sm text-blue-100">Current Weight</h4>
              </div>
              <p className="text-3xl font-bold">{profile.weight} kg</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-6 h-6" />
                <h4 className="text-sm text-purple-100">Target Weight</h4>
              </div>
              <p className="text-3xl font-bold">{profile.targetWeight} kg</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-300 to-amber-400 dark:from-yellow-600 dark:to-yellow-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6" />
                <h4 className="text-sm text-yellow-100">To Go</h4>
              </div>
              <p className="text-3xl font-bold">{Math.abs(profile.weight - profile.targetWeight)} kg</p>
              <p className="text-xs text-yellow-100 mt-1">
                {profile.weight > profile.targetWeight ? 'to lose' : profile.weight < profile.targetWeight ? 'to gain' : 'at goal!'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
