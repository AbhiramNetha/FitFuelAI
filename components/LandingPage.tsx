'use client';

import { motion } from 'framer-motion';
import { Dumbbell, TrendingUp, Target, Zap, User, Users, Play, Lock, CheckCircle, Calendar, Award } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-yellow-200 dark:border-gray-700">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400">
              FitFuel AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={onGetStarted}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl"
            >
              Start Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-6">
              <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Personalized Training Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              Your Complete
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400">
                Fitness Journey
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Personalized workout splits, nutrition tracking, and fitness metrics—all tailored to your experience level and goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-amber-700 transition-all hover:shadow-xl hover:shadow-yellow-500/30 flex items-center justify-center gap-2"
              >
                <Dumbbell className="w-5 h-5" />
                Start Training Free
              </button>
              <button className="px-8 py-4 border-2 border-yellow-600 dark:border-yellow-500 text-yellow-700 dark:text-yellow-400 rounded-xl font-bold text-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/30 transition-colors">
                See How It Works
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">27+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Workout Videos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">6</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Training Levels</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Personalized</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card - Workout Selection */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-amber-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Choose Your Path</h3>
                <p className="text-yellow-100 text-sm">Personalized for your level</p>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Gender Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 border-2 border-blue-500 rounded-xl bg-blue-50 dark:bg-blue-900/20 cursor-pointer">
                    <div className="text-center mb-2">
                      <User className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <div className="font-bold text-gray-900 dark:text-gray-100">Men</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">15 Videos</div>
                    </div>
                  </div>
                  <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-pink-500 cursor-pointer">
                    <div className="text-center mb-2">
                      <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="font-bold text-gray-900 dark:text-gray-100">Women</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">12 Videos</div>
                    </div>
                  </div>
                </div>

                {/* Level Display */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-500">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🟢</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Beginner</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🟡</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Intermediate</span>
                    </div>
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🔴</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Advanced</span>
                    </div>
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Video Preview */}
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" fill="white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 dark:text-gray-100 text-sm">Beginner Full Body</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">4 videos available</div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-yellow-500 text-white rounded-lg font-semibold text-sm hover:bg-yellow-600 transition-colors">
                    Start Your Foundation
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-amber-200 dark:border-gray-700"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Daily Goal</div>
                  <div className="font-bold text-gray-900 dark:text-gray-100">2,150 / 2,500 cal</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Built for real results, powered by smart technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-200 dark:border-gray-700 hover:shadow-xl transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Gender-Based Training
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Different workout programs for men and women with specialized content for optimal results.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-200 dark:border-gray-700 hover:shadow-xl transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Progressive Levels
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              From beginner to advanced—unlock content as you progress and never feel overwhelmed.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-200 dark:border-gray-700 hover:shadow-xl transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-white" fill="white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              27+ Expert Videos
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Curated workout splits from top fitness creators—watch directly in your browser.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-200 dark:border-gray-700 hover:shadow-xl transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Nutrition Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track calories, macros, and water intake with smart meal planning and portion control.
            </p>
          </motion.div>

          {/* Feature 5 */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-200 dark:border-gray-700 hover:shadow-xl transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Fitness Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your progress with BMI calculator, weight tracking, and personalized goals.
            </p>
          </motion.div>

          {/* Feature 6 */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-200 dark:border-gray-700 hover:shadow-xl transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Meal Plans & Tips
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pre-made meal suggestions and health tips to support your fitness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-12 border border-amber-200 dark:border-gray-700">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Start Training in 3 Simple Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Choose Your Gender
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select Men or Women for tailored workout content
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Set Your Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pick your training level: Beginner, Intermediate, or Advanced
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Watch & Train
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your personalized workout videos and start training
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-600 dark:to-amber-700 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands getting results with personalized workout plans and smart nutrition tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-10 py-5 bg-white text-yellow-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Dumbbell className="w-5 h-5" />
              Start Free Today
            </button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            No credit card required • 100% Free • Personalized for you
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 md:px-8 py-8 border-t border-yellow-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>© 2026 FitFuel AI. Built for your fitness journey.</p>
        </div>
      </footer>
    </div>
  );
}
