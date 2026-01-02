'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Activity, Zap, Scale, Ruler, Target, Dumbbell } from 'lucide-react';

interface FitnessMetricsProps {
  userProfile: {
    weight: number;
    height: number;
    age: number;
    gender: 'male' | 'female' | 'other';
    activityLevel: string;
  };
  onUpdateProfile: (profile: any) => void;
}

export default function FitnessMetrics({ userProfile, onUpdateProfile }: FitnessMetricsProps) {
  const [weight, setWeight] = useState(userProfile.weight || 70);
  const [height, setHeight] = useState(userProfile.height || 170);
  const [age, setAge] = useState(userProfile.age || 25);
  const [gender, setGender] = useState<'male' | 'female'>(userProfile.gender === 'other' ? 'male' : userProfile.gender || 'male');
  const [bodyFat, setBodyFat] = useState(15);
  const [workoutDays, setWorkoutDays] = useState(4);
  const [fitnessGoal, setFitnessGoal] = useState<'bulk' | 'cut' | 'maintain' | 'recomp'>('maintain');

  // Calculate BMI
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  // Get BMI Category
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    return { label: 'Obese', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  // Calculate BMR (Basal Metabolic Rate) - Mifflin-St Jeor Equation
  const calculateBMR = () => {
    if (gender === 'male') {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers: { [key: number]: number } = {
      0: 1.2,   // Sedentary
      1: 1.375, // Light (1-3 days/week)
      2: 1.55,  // Moderate (3-5 days/week)
      3: 1.55,  // Moderate (3-5 days/week)
      4: 1.725, // Active (6-7 days/week)
      5: 1.725, // Active (6-7 days/week)
      6: 1.9,   // Very Active (2x per day)
      7: 1.9    // Very Active (2x per day)
    };
    return bmr * (activityMultipliers[workoutDays] || 1.55);
  };

  // Calculate Lean Body Mass
  const calculateLBM = () => {
    return weight * (1 - bodyFat / 100);
  };

  // Calculate Body Fat Mass
  const calculateFatMass = () => {
    return weight - calculateLBM();
  };

  // Calculate Ideal Calories for Goal
  const calculateCaloriesForGoal = () => {
    const tdee = calculateTDEE();
    switch (fitnessGoal) {
      case 'bulk':
        return tdee + 300; // Lean bulk
      case 'cut':
        return tdee - 500; // Fat loss
      case 'recomp':
        return tdee; // Body recomposition
      default:
        return tdee; // Maintenance
    }
  };

  // Calculate Macro Split for Lifters
  const calculateMacros = () => {
    const calories = calculateCaloriesForGoal();
    const lbm = calculateLBM();
    
    let protein, carbs, fat;

    switch (fitnessGoal) {
      case 'bulk':
        protein = lbm * 2.2; // 2.2g per kg LBM
        fat = weight * 1.0; // 1g per kg bodyweight
        carbs = (calories - (protein * 4) - (fat * 9)) / 4;
        break;
      case 'cut':
        protein = lbm * 2.4; // Higher protein during cut
        fat = weight * 0.8; // Lower fat
        carbs = (calories - (protein * 4) - (fat * 9)) / 4;
        break;
      case 'recomp':
        protein = lbm * 2.3;
        fat = weight * 0.9;
        carbs = (calories - (protein * 4) - (fat * 9)) / 4;
        break;
      default: // maintain
        protein = lbm * 2.0;
        fat = weight * 1.0;
        carbs = (calories - (protein * 4) - (fat * 9)) / 4;
    }

    return {
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      calories: Math.round(calories)
    };
  };

  // Calculate One Rep Max (1RM) estimates
  const calculate1RM = (weight: number, reps: number) => {
    // Epley Formula
    return weight * (1 + reps / 30);
  };

  // Calculate Ideal Body Weight (for reference)
  const calculateIdealWeight = () => {
    const heightInCm = height;
    if (gender === 'male') {
      return 50 + 0.91 * (heightInCm - 152.4);
    } else {
      return 45.5 + 0.91 * (heightInCm - 152.4);
    }
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR();
  const tdee = calculateTDEE();
  const lbm = calculateLBM();
  const fatMass = calculateFatMass();
  const macros = calculateMacros();
  const idealWeight = calculateIdealWeight();

  const MetricCard = ({ icon: Icon, label, value, unit, color }: any) => (
    <motion.div
      className="glass-effect rounded-xl p-4"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-sm text-gray-400">{label}</p>
      </div>
      <p className="text-2xl font-bold">
        {value}
        <span className="text-sm text-gray-400 ml-1">{unit}</span>
      </p>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="glass-effect-strong rounded-3xl p-8 border border-primary-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Dumbbell className="w-8 h-8 text-primary-500" />
          <h2 className="text-3xl font-display font-bold">Fitness Metrics</h2>
        </div>
        <p className="text-gray-400">Advanced body composition and nutrition calculator for lifters</p>
      </motion.div>

      {/* Input Section */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4">Your Stats</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Weight */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-4 py-2 bg-dark-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full px-4 py-2 bg-dark-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-2 bg-dark-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full px-4 py-2 bg-dark-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Body Fat % */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Body Fat (%)</label>
            <input
              type="number"
              value={bodyFat}
              onChange={(e) => setBodyFat(Number(e.target.value))}
              className="w-full px-4 py-2 bg-dark-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Workout Days */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Workout Days/Week</label>
            <input
              type="number"
              min="0"
              max="7"
              value={workoutDays}
              onChange={(e) => setWorkoutDays(Number(e.target.value))}
              className="w-full px-4 py-2 bg-dark-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Fitness Goal */}
        <div className="mt-6">
          <label className="block text-sm text-gray-400 mb-3">Fitness Goal</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: 'bulk', label: 'Bulk', icon: '💪', desc: '+300 cal' },
              { value: 'cut', label: 'Cut', icon: '🔥', desc: '-500 cal' },
              { value: 'maintain', label: 'Maintain', icon: '⚖️', desc: 'TDEE' },
              { value: 'recomp', label: 'Recomp', icon: '🎯', desc: 'TDEE' }
            ].map((goal) => (
              <button
                key={goal.value}
                onClick={() => setFitnessGoal(goal.value as any)}
                className={`p-4 rounded-xl transition-all ${
                  fitnessGoal === goal.value
                    ? 'bg-gradient-to-br from-primary-500 to-orange-500 text-white'
                    : 'glass-effect hover:border-primary-500/30 border border-transparent'
                }`}
              >
                <div className="text-2xl mb-1">{goal.icon}</div>
                <div className="font-bold">{goal.label}</div>
                <div className="text-xs opacity-80">{goal.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BMI Section */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4">Body Mass Index (BMI)</h3>
        
        <div className="flex items-center gap-6 mb-6">
          <div className="flex-1">
            <div className="text-6xl font-bold text-gradient mb-2">
              {bmi.toFixed(1)}
            </div>
            <div className={`inline-block px-4 py-2 rounded-lg ${bmiCategory.bg}`}>
              <span className={`font-bold ${bmiCategory.color}`}>{bmiCategory.label}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="h-4 bg-dark-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500"
                style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>15</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass-effect rounded-lg p-3">
            <p className="text-xs text-gray-400">Underweight</p>
            <p className="text-sm font-bold text-blue-400">&lt; 18.5</p>
          </div>
          <div className="glass-effect rounded-lg p-3">
            <p className="text-xs text-gray-400">Normal</p>
            <p className="text-sm font-bold text-green-400">18.5 - 24.9</p>
          </div>
          <div className="glass-effect rounded-lg p-3">
            <p className="text-xs text-gray-400">Overweight</p>
            <p className="text-sm font-bold text-yellow-400">25 - 29.9</p>
          </div>
          <div className="glass-effect rounded-lg p-3">
            <p className="text-xs text-gray-400">Obese</p>
            <p className="text-sm font-bold text-red-400">&gt; 30</p>
          </div>
        </div>
      </div>

      {/* Body Composition */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4">Body Composition</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            icon={Scale}
            label="Lean Body Mass"
            value={lbm.toFixed(1)}
            unit="kg"
            color="from-green-500 to-emerald-500"
          />
          <MetricCard
            icon={Activity}
            label="Fat Mass"
            value={fatMass.toFixed(1)}
            unit="kg"
            color="from-yellow-500 to-orange-500"
          />
          <MetricCard
            icon={Target}
            label="Body Fat %"
            value={bodyFat.toFixed(1)}
            unit="%"
            color="from-blue-500 to-cyan-500"
          />
          <MetricCard
            icon={Ruler}
            label="Ideal Weight"
            value={idealWeight.toFixed(1)}
            unit="kg"
            color="from-purple-500 to-pink-500"
          />
        </div>
      </div>

      {/* Calorie & Energy */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4">Energy Expenditure</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            icon={Zap}
            label="BMR (Basal Metabolic Rate)"
            value={bmr.toFixed(0)}
            unit="kcal/day"
            color="from-red-500 to-orange-500"
          />
          <MetricCard
            icon={TrendingUp}
            label="TDEE (Total Daily Energy)"
            value={tdee.toFixed(0)}
            unit="kcal/day"
            color="from-orange-500 to-yellow-500"
          />
          <MetricCard
            icon={Calculator}
            label={`Target (${fitnessGoal})`}
            value={macros.calories}
            unit="kcal/day"
            color="from-primary-500 to-orange-500"
          />
        </div>
      </div>

      {/* Macros for Lifters */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4">
          Macro Split for {fitnessGoal === 'bulk' ? 'Bulking' : fitnessGoal === 'cut' ? 'Cutting' : fitnessGoal === 'recomp' ? 'Recomposition' : 'Maintenance'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-effect-strong rounded-xl p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400">Protein</span>
              <span className="text-sm text-red-400 font-bold">
                {((macros.protein * 4 / macros.calories) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="text-4xl font-bold text-red-400 mb-2">
              {macros.protein}g
            </div>
            <p className="text-sm text-gray-500">{(macros.protein * 4)} kcal</p>
            <p className="text-xs text-gray-600 mt-2">
              {(macros.protein / weight).toFixed(1)}g per kg bodyweight
            </p>
          </div>

          <div className="glass-effect-strong rounded-xl p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400">Carbs</span>
              <span className="text-sm text-yellow-400 font-bold">
                {((macros.carbs * 4 / macros.calories) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {macros.carbs}g
            </div>
            <p className="text-sm text-gray-500">{(macros.carbs * 4)} kcal</p>
            <p className="text-xs text-gray-600 mt-2">
              {(macros.carbs / weight).toFixed(1)}g per kg bodyweight
            </p>
          </div>

          <div className="glass-effect-strong rounded-xl p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400">Fat</span>
              <span className="text-sm text-blue-400 font-bold">
                {((macros.fat * 9 / macros.calories) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {macros.fat}g
            </div>
            <p className="text-sm text-gray-500">{(macros.fat * 9)} kcal</p>
            <p className="text-xs text-gray-600 mt-2">
              {(macros.fat / weight).toFixed(1)}g per kg bodyweight
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-effect rounded-lg p-4">
          <h4 className="font-bold mb-2 text-primary-500">💡 Recommendations for {fitnessGoal === 'bulk' ? 'Bulking' : fitnessGoal === 'cut' ? 'Cutting' : 'Recomposition'}</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {fitnessGoal === 'bulk' && (
              <>
                <li>✓ Focus on 300-500 cal surplus for lean gains</li>
                <li>✓ Aim for 2.0-2.2g protein per kg LBM</li>
                <li>✓ Keep carbs high around workouts</li>
                <li>✓ Track weight weekly, adjust if gaining too fast</li>
              </>
            )}
            {fitnessGoal === 'cut' && (
              <>
                <li>✓ Aim for 500 cal deficit for fat loss</li>
                <li>✓ Increase protein to 2.3-2.4g per kg LBM</li>
                <li>✓ Keep training intensity high</li>
                <li>✓ Consider refeeds every 7-10 days</li>
              </>
            )}
            {fitnessGoal === 'recomp' && (
              <>
                <li>✓ Eat at maintenance calories</li>
                <li>✓ High protein (2.2-2.3g per kg LBM)</li>
                <li>✓ Progressive overload in training</li>
                <li>✓ Be patient - recomp takes time</li>
              </>
            )}
            {fitnessGoal === 'maintain' && (
              <>
                <li>✓ Eat at TDEE for maintenance</li>
                <li>✓ Maintain 2.0g protein per kg LBM</li>
                <li>✓ Focus on performance goals</li>
                <li>✓ Adjust based on activity changes</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Quick Reference Guide */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold mb-4">Quick Reference Guide</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-effect rounded-lg p-4">
            <h4 className="font-bold mb-3 text-green-400">Body Fat Ranges</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Essential Fat (Men)</span>
                <span className="text-white">2-5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Athletes (Men)</span>
                <span className="text-white">6-13%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fitness (Men)</span>
                <span className="text-white">14-17%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average (Men)</span>
                <span className="text-white">18-24%</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <h4 className="font-bold mb-3 text-blue-400">Protein Timing</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Pre-Workout</span>
                <span className="text-white">20-40g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Post-Workout</span>
                <span className="text-white">20-40g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Before Bed</span>
                <span className="text-white">20-30g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Per Meal</span>
                <span className="text-white">30-50g</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        onClick={() => {
          onUpdateProfile({
            weight,
            height,
            age,
            gender,
          });
          alert('Profile updated! Your daily goals have been recalculated.');
        }}
        className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-orange-500 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/20 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Calculator className="w-5 h-5" />
        Update Profile & Recalculate Goals
      </motion.button>
    </div>
  );
}
