'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, TrendingUp, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getChartData, formatDate, getTodayDate, getDailyNutrition, getWeeklyAverage } from '@/lib/dailyNutrition';

export default function NutritionHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState<7 | 14 | 30>(7);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    loadChartData();
  }, [selectedPeriod]);

  const loadChartData = () => {
    const data = getChartData(selectedPeriod);
    
    const formatted = data.dates.map((date, index) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date,
      Calories: data.calories[index],
      Protein: data.protein[index],
      Carbs: data.carbs[index],
      Fats: data.fats[index],
      Fiber: data.fiber[index],
    }));
    
    setChartData(formatted);
  };

  const selectedDayData = getDailyNutrition(selectedDate);
  const weeklyAvg = getWeeklyAverage();

  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const goToNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    const today = getTodayDate();
    const newDate = date.toISOString().split('T')[0];
    if (newDate <= today) {
      setSelectedDate(newDate);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-3xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Nutrition History</h2>
            <p className="text-purple-100">Track your daily nutrient intake over time</p>
          </div>
          <BarChart3 className="w-12 h-12 opacity-80" />
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-purple-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Trend Analysis</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPeriod(7)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === 7
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setSelectedPeriod(14)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === 14
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700'
              }`}
            >
              14 Days
            </button>
            <button
              onClick={() => setSelectedPeriod(30)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === 30
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        {/* Calories Trend */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Calorie Intake</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                stroke="#9ca3af"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Calories" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Protein Intake Trend */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Protein Intake</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                stroke="#9ca3af"
                label={{ value: 'Grams', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Protein" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Macros Trend */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Macronutrients</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                stroke="#9ca3af"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar dataKey="Protein" fill="#ef4444" />
              <Bar dataKey="Carbs" fill="#3b82f6" />
              <Bar dataKey="Fats" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Average */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6" />
          <h3 className="text-xl font-bold">7-Day Average</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-green-100 text-sm mb-1">Calories</p>
            <p className="text-2xl font-bold">{weeklyAvg.calories}</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">Protein</p>
            <p className="text-2xl font-bold">{weeklyAvg.protein}g</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">Carbs</p>
            <p className="text-2xl font-bold">{weeklyAvg.carbs}g</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">Fats</p>
            <p className="text-2xl font-bold">{weeklyAvg.fats}g</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">Fiber</p>
            <p className="text-2xl font-bold">{weeklyAvg.fiber}g</p>
          </div>
        </div>
      </div>

      {/* Daily View */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-purple-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Daily Details</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={goToPreviousDay}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setSelectedDate(getTodayDate())}
              className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
            >
              Today
            </button>
            <button
              onClick={goToNextDay}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              disabled={selectedDate === getTodayDate()}
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 mb-6">
          <p className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
            {formatDate(selectedDate)}
          </p>
        </div>

        {selectedDayData ? (
          <div>
            {/* Daily Totals */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Calories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedDayData.calories}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Protein</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedDayData.protein}g</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Carbs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedDayData.carbs}g</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fats</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedDayData.fats}g</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fiber</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedDayData.fiber}g</p>
              </div>
            </div>

            {/* Meals List */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Meals ({selectedDayData.meals.length})
              </h4>
              <div className="space-y-2">
                {selectedDayData.meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100">{meal.name}</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(meal.timestamp).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-gray-900 dark:text-gray-100">{meal.calories}</p>
                        <p className="text-gray-500 dark:text-gray-400">cal</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900 dark:text-gray-100">{meal.protein}g</p>
                        <p className="text-gray-500 dark:text-gray-400">protein</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900 dark:text-gray-100">{meal.carbs}g</p>
                        <p className="text-gray-500 dark:text-gray-400">carbs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900 dark:text-gray-100">{meal.fats}g</p>
                        <p className="text-gray-500 dark:text-gray-400">fats</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900 dark:text-gray-100">{meal.fiber}g</p>
                        <p className="text-gray-500 dark:text-gray-400">fiber</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No data for this day</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {selectedDate === getTodayDate() 
                ? "Start tracking your meals to see data here" 
                : "No meals were logged on this day"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
