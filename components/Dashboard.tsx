'use client';

import { Flame, Beef, Wheat, Droplet, Droplets, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { FoodEntry, DailyGoals } from '@/lib/types';

interface DashboardProps {
  totals: { calories: number; protein: number; carbs: number; fat: number };
  goals: DailyGoals;
  foodEntries: FoodEntry[];
  waterIntake: number; // in ml
  onAddWater: (amount: number) => void; // now accepts ml amount
  onRemoveEntry: (id: string) => void;
}

const COLORS = ['#f59338', '#f7a356', '#fbca9c'];

export default function Dashboard({
  totals,
  goals,
  foodEntries,
  waterIntake,
  onAddWater,
  onRemoveEntry
}: DashboardProps) {
  const caloriePercentage = Math.min((totals.calories / goals.calories) * 100, 100);
  const proteinPercentage = Math.min((totals.protein / goals.protein) * 100, 100);
  const carbsPercentage = Math.min((totals.carbs / goals.carbs) * 100, 100);
  const fatPercentage = Math.min((totals.fat / goals.fat) * 100, 100);

  const macroData = [
    { name: 'Protein', value: totals.protein, goal: goals.protein },
    { name: 'Carbs', value: totals.carbs, goal: goals.carbs },
    { name: 'Fat', value: totals.fat, goal: goals.fat },
  ];

  const pieData = [
    { name: 'Protein', value: totals.protein * 4 },
    { name: 'Carbs', value: totals.carbs * 4 },
    { name: 'Fat', value: totals.fat * 9 },
  ];

  const MetricCard = ({ 
    icon: Icon, 
    label, 
    current, 
    goal, 
    unit, 
    color 
  }: { 
    icon: any; 
    label: string; 
    current: number; 
    goal: number; 
    unit: string; 
    color: string;
  }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Math.round(current)}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/ {goal}{unit}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
          {Math.round(percentage)}% of daily goal
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-green-200 dark:border-green-700 shadow-sm transition-all duration-300">
        <h2 className="text-3xl font-display font-bold mb-2 text-gray-900 dark:text-gray-100">Today&apos;s Nutrition</h2>
        <p className="text-gray-600 dark:text-gray-400">Track your daily intake and stay on target</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Flame}
          label="Calories"
          current={totals.calories}
          goal={goals.calories}
          unit=" kcal"
          color="from-orange-500 to-red-500"
        />
        <MetricCard
          icon={Beef}
          label="Protein"
          current={totals.protein}
          goal={goals.protein}
          unit="g"
          color="from-red-500 to-pink-500"
        />
        <MetricCard
          icon={Wheat}
          label="Carbs"
          current={totals.carbs}
          goal={goals.carbs}
          unit="g"
          color="from-yellow-500 to-orange-500"
        />
        <MetricCard
          icon={Droplet}
          label="Fat"
          current={totals.fat}
          goal={goals.fat}
          unit="g"
          color="from-blue-500 to-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h3 className="text-xl font-display font-bold mb-4 text-gray-900 dark:text-gray-100">Macro Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: '#111827'
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
                          <p className="text-gray-900 dark:text-gray-100 font-semibold">{payload[0].name}</p>
                          <p className="text-gray-600 dark:text-gray-400">{payload[0].value} cal</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h3 className="text-xl font-display font-bold mb-4 text-gray-900 dark:text-gray-100">Goal Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={macroData}>
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
                          <p className="text-gray-900 dark:text-gray-100 font-semibold">{payload[0].payload.name}</p>
                          <p className="text-gray-600 dark:text-gray-400">Current: {payload[0].value}g</p>
                          <p className="text-gray-600 dark:text-gray-400">Goal: {payload[1].value}g</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="#f59338" radius={[8, 8, 0, 0]} />
                <Bar dataKey="goal" fill="rgba(245, 147, 56, 0.3)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Droplets className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-gray-100">Water Intake</h3>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Quick Add Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => onAddWater(250)}
              className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
            >
              +250ml
            </button>
            <button
              onClick={() => onAddWater(500)}
              className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
            >
              +500ml
            </button>
            <button
              onClick={() => onAddWater(750)}
              className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
            >
              +750ml
            </button>
            <button
              onClick={() => onAddWater(1000)}
              className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
            >
              +1L
            </button>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Today's Total</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {waterIntake >= 1000 ? `${(waterIntake / 1000).toFixed(1)}L` : `${waterIntake}ml`} / 2.5L
              </span>
            </div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min((waterIntake / 2500) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {Math.round((waterIntake / 2500) * 100)}% of recommended daily intake
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h3 className="text-xl font-display font-bold mb-4 text-gray-900 dark:text-gray-100">Today&apos;s Meals</h3>
        
        {foodEntries.length === 0 ? (
          <div className="text-center py-12">
            <Flame className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No meals logged yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Start tracking by scanning food or adding manually</p>
          </div>
        ) : (
          <div className="space-y-3">
            {foodEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all"
              >
                <div className="flex-1">
                  <h4 className="font-semibold capitalize text-gray-900 dark:text-gray-100">{entry.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{entry.serving || `${entry.calories} cal`}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-500">
                    <span>{entry.calories} cal</span>
                    <span>{entry.protein}g protein</span>
                    <span>{entry.carbs}g carbs</span>
                    <span>{entry.fats}g fat</span>
                  </div>
                </div>
                
                <button
                  onClick={() => onRemoveEntry(entry.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
