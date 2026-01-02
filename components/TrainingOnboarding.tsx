'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { UserLevel, UserGender, getUserLevel, levelInfo, genderInfo } from '@/lib/trainingLevels';
import { CheckCircle2 } from 'lucide-react';

interface OnboardingProps {
  onComplete: (level: UserLevel, months: number, gender: UserGender) => void;
}

export default function TrainingOnboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<'gender' | 'experience'>('gender');
  const [gender, setGender] = useState<UserGender | null>(null);
  const [months, setMonths] = useState<number>(0);
  const [selectedRange, setSelectedRange] = useState<string>('');

  const ranges = [
    { label: 'Just Starting (0-2 months)', value: 1, description: 'New to consistent training' },
    { label: 'Building Foundation (3-5 months)', value: 4, description: 'Learning the basics' },
    { label: 'Getting Stronger (6-11 months)', value: 8, description: 'Comfortable with exercises' },
    { label: 'Experienced (12-17 months)', value: 14, description: 'Following a structured program' },
    { label: 'Advanced (18-23 months)', value: 20, description: 'Tracking progressive overload' },
    { label: 'Expert (24+ months)', value: 30, description: 'Optimizing for specific goals' },
  ];

  const handleGenderSelect = (selectedGender: UserGender) => {
    setGender(selectedGender);
    setStep('experience');
  };

  const handleExperienceSelect = (value: number, label: string) => {
    setMonths(value);
    setSelectedRange(label);
  };

  const handleContinue = () => {
    if (gender && months > 0) {
      const level = getUserLevel(months);
      onComplete(level, months, gender);
    }
  };

  return (
    <div className="min-h-[600px] flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-3xl">
              {step === 'gender' ? '🎯' : '💪'}
            </span>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {step === 'gender' ? 'Personalize Your Training' : 'Your Training Experience'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {step === 'gender' 
              ? 'Select your gender for tailored workout content' 
              : 'How long have you been training consistently?'}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className={`px-4 py-2 rounded-lg ${step === 'gender' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'}`}>
            <span className="text-sm font-semibold">Step 1: Gender</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-700" />
          <div className={`px-4 py-2 rounded-lg ${step === 'experience' ? 'bg-yellow-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
            <span className="text-sm font-semibold">Step 2: Experience</span>
          </div>
        </div>

        {/* Gender Selection */}
        {step === 'gender' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {(Object.keys(genderInfo) as UserGender[]).map((genderKey) => {
              const info = genderInfo[genderKey];
              return (
                <motion.button
                  key={genderKey}
                  onClick={() => handleGenderSelect(genderKey)}
                  className="p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-600 bg-white dark:bg-gray-900 transition-all hover:shadow-lg group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-6xl mb-4">{info.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {info.label}
                  </h3>
                  <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${info.color} text-white text-sm font-semibold`}>
                    Tailored Content
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Experience Selection */}
        {step === 'experience' && (
          <>
            {gender && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{genderInfo[gender].icon}</span>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Selected Gender</p>
                      <p className="font-bold text-gray-900 dark:text-gray-100">{genderInfo[gender].label}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('gender')}
                    className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline"
                  >
                    Change
                  </button>
                </div>
              </motion.div>
            )}

            <div className="space-y-3 mb-8">
              {ranges.map((range, index) => (
                <motion.button
                  key={range.label}
                  onClick={() => handleExperienceSelect(range.value, range.label)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                    selectedRange === range.label
                      ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 bg-white dark:bg-gray-900'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">
                          {range.label}
                        </h3>
                        {selectedRange === range.label && (
                          <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {range.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Preview Level */}
            {months > 0 && (
              <motion.div
                className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{levelInfo[getUserLevel(months)].icon}</span>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your Training Level</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100 capitalize">
                      {getUserLevel(months)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Continue Button */}
            <motion.button
              onClick={handleContinue}
              disabled={months === 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                months > 0
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
              whileHover={months > 0 ? { scale: 1.02 } : {}}
              whileTap={months > 0 ? { scale: 0.98 } : {}}
            >
              {months > 0 ? 'Continue to Workouts' : 'Select Your Experience Level'}
            </motion.button>

            {/* Info Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Don&apos;t worry—you can change this later in settings
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
