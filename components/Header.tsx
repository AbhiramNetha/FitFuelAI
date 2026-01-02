'use client';

import { motion } from 'framer-motion';
import { Flame, LayoutDashboard, Target, UtensilsCrossed, Heart, Dumbbell, Activity, Calendar } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'workouts', label: 'Workouts', icon: Activity },
  { id: 'meals', label: 'Meal Plans', icon: UtensilsCrossed },
  { id: 'history', label: 'History', icon: Calendar },
  { id: 'tips', label: 'Health Tips', icon: Heart },
];

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">FF</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400">
                FitFuel AI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Intelligence</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    isActive 
                      ? 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/30' 
                      : 'text-gray-600 hover:text-yellow-600 hover:bg-amber-50 dark:text-gray-400 dark:hover:text-yellow-400 dark:hover:bg-gray-800'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-700"
                      layoutId="activeTab"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="text-sm font-medium relative z-10">{item.label}</span>
                </motion.button>
              );
            })}
            
            {/* Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-3 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    isActive 
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-amber-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
