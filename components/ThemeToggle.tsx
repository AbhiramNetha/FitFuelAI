'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative p-2.5 w-[42px] h-[42px] rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <div className="w-5 h-5" />
      </div>
    );
  }

  return <ThemeToggleInner />;
}

function ThemeToggleInner() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
          : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="w-5 h-5 text-blue-400" fill="currentColor" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="w-5 h-5 text-orange-500" fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Ripple effect on click */}
      <motion.div
        className={`absolute inset-0 rounded-xl ${
          isDark ? 'bg-blue-400' : 'bg-orange-400'
        }`}
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
}
