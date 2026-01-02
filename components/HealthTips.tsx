'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lightbulb, TrendingUp, Award, RefreshCw } from 'lucide-react';
import { getRandomTip, NUTRITION_TIPS } from '@/lib/utils';
import { DailyGoals } from '@/lib/types';

interface HealthTipsProps {
  totals: { calories: number; protein: number; carbs: number; fat: number };
  goals: DailyGoals;
}

export default function HealthTips({ totals, goals }: HealthTipsProps) {
  const [currentTip, setCurrentTip] = useState(getRandomTip());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshTip = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentTip(getRandomTip());
      setIsRefreshing(false);
    }, 500);
  };

  const proteinPercentage = (totals.protein / goals.protein) * 100;
  const carbsPercentage = (totals.carbs / goals.carbs) * 100;
  const fatPercentage = (totals.fat / goals.fat) * 100;

  const getInsights = () => {
    const insights = [];

    if (proteinPercentage < 50) {
      insights.push({
        type: 'warning',
        message: 'Your protein intake is low. Add lean meats, fish, or plant-based proteins.',
        icon: '⚠️'
      });
    } else if (proteinPercentage > 100) {
      insights.push({
        type: 'info',
        message: 'Great protein intake! This supports muscle maintenance and recovery.',
        icon: '💪'
      });
    }

    if (totals.calories < goals.calories * 0.7) {
      insights.push({
        type: 'warning',
        message: 'You might be under-eating. Ensure you meet your calorie goals for energy.',
        icon: '🔋'
      });
    }

    if (carbsPercentage < 30 && totals.calories > 500) {
      insights.push({
        type: 'info',
        message: 'Low carb intake detected. Perfect for ketogenic or low-carb diets.',
        icon: '🥑'
      });
    }

    if (totals.calories === 0) {
      insights.push({
        type: 'info',
        message: 'Start your day right! Log your breakfast to track your nutrition.',
        icon: '🌅'
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        className="glass-effect-strong rounded-3xl p-8 border border-primary-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-primary-500" />
          <h2 className="text-3xl font-display font-bold">Health Tips & Insights</h2>
        </div>
        <p className="text-gray-400">Personalized advice to optimize your nutrition</p>
      </motion.div>

      {/* Daily Tip */}
      <motion.div
        className="glass-effect rounded-2xl p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{currentTip.icon}</div>
              <div>
                <p className="text-sm text-primary-500 font-medium uppercase tracking-wide">
                  Tip of the Day
                </p>
                <h3 className="text-2xl font-display font-bold mt-1">{currentTip.title}</h3>
              </div>
            </div>
            
            <motion.button
              onClick={refreshTip}
              className="p-3 glass-effect rounded-xl hover:bg-primary-500/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed">{currentTip.description}</p>
        </div>
      </motion.div>

      {/* Personal Insights */}
      {insights.length > 0 && (
        <motion.div
          className="glass-effect rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary-500" />
            <h3 className="text-xl font-display font-bold">Your Insights</h3>
          </div>
          
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-xl p-4 flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                <p className="text-gray-300">{insight.message}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Macro Analysis */}
      <motion.div
        className="glass-effect rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          <h3 className="text-xl font-display font-bold">Macro Balance Analysis</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-effect rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Protein</span>
              <span className="font-bold text-red-400">{Math.round(proteinPercentage)}%</span>
            </div>
            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(proteinPercentage, 100)}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {totals.protein}g / {goals.protein}g
            </p>
          </div>

          <div className="glass-effect rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Carbs</span>
              <span className="font-bold text-yellow-400">{Math.round(carbsPercentage)}%</span>
            </div>
            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(carbsPercentage, 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {totals.carbs}g / {goals.carbs}g
            </p>
          </div>

          <div className="glass-effect rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Fat</span>
              <span className="font-bold text-blue-400">{Math.round(fatPercentage)}%</span>
            </div>
            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(fatPercentage, 100)}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {totals.fat}g / {goals.fat}g
            </p>
          </div>
        </div>
      </motion.div>

      {/* All Tips */}
      <motion.div
        className="glass-effect rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-primary-500" />
          <h3 className="text-xl font-display font-bold">Nutrition Library</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NUTRITION_TIPS.map((tip, index) => (
            <motion.div
              key={tip.id}
              className="glass-effect rounded-xl p-4 hover-lift"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <h4 className="font-bold mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-400">{tip.description}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-primary-500/20 text-primary-500 text-xs rounded-full">
                    {tip.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
