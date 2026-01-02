'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Upload, Sparkles, Plus, X } from 'lucide-react';
import { simulateFoodRecognition } from '@/lib/utils';
import { FoodRecognitionResult } from '@/lib/types';

interface FoodRecognitionProps {
  onAddFood: (food: { name: string; calories: number; protein: number; carbs: number; fat: number; serving: string; imageUrl?: string }) => void;
}

export default function FoodRecognition({ onAddFood }: FoodRecognitionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FoodRecognitionResult | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        analyzeImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Image: string) => {
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // Call Claude API for real food recognition with detailed nutrition analysis
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: base64Image.split(';')[0].split(':')[1],
                    data: base64Image.split(',')[1]
                  }
                },
                {
                  type: "text",
                  text: `You are a professional nutritionist and food recognition expert. Analyze this image carefully.

CRITICAL RULES:
1. ONLY identify this as food if it clearly shows edible food items
2. If the image shows a person, animal, object, landscape, or anything other than food, respond with "NOT_FOOD"
3. Common non-food items to REJECT: phones, cars, people, pets, furniture, nature, buildings, body parts, screenshots, logos

If this IS FOOD, provide ACCURATE nutritional information:
- Use USDA FoodData Central standards
- Estimate portion size carefully from visual cues (plate size, utensils, etc.)
- For prepared/cooked foods, account for cooking methods
- For mixed dishes, break down components
- Be conservative with estimates - it's better to underestimate than overestimate

Respond in this EXACT JSON format:
{
  "isFood": true/false,
  "name": "specific food name (e.g., 'Grilled Chicken Breast' not just 'chicken')",
  "calories": number (total for visible portion),
  "protein": number (grams),
  "carbs": number (grams),
  "fat": number (grams),
  "serving": "specific serving size (e.g., '150g', '1 medium apple', '1 cup')",
  "confidence": 0.0-1.0 (how confident you are in identification),
  "reasoning": "brief explanation of portion size estimate"
}

EXAMPLES:
- Grilled chicken breast (150g): {"isFood": true, "name": "Grilled Chicken Breast", "calories": 248, "protein": 47, "carbs": 0, "fat": 6, "serving": "150g", "confidence": 0.92}
- Medium apple: {"isFood": true, "name": "Medium Apple", "calories": 95, "protein": 0, "carbs": 25, "fat": 0, "serving": "1 medium (182g)", "confidence": 0.95}
- Person's face: {"isFood": false}
- Phone on table: {"isFood": false}

Be STRICT about food detection. When in doubt, mark as NOT_FOOD.`
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      
      // Parse AI response
      const text = data.content.find((item: any) => item.type === "text")?.text || "";
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const foodData = JSON.parse(jsonMatch[0]);
        
        if (!foodData.isFood || foodData.isFood === false) {
          setResult({
            name: "Not a food item",
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            serving: "N/A",
            confidence: 0,
            isFood: false
          } as any);
        } else {
          // Validate the nutrition data makes sense
          const totalCaloriesFromMacros = (foodData.protein * 4) + (foodData.carbs * 4) + (foodData.fat * 9);
          const caloriesDifference = Math.abs(foodData.calories - totalCaloriesFromMacros);
          
          // If calories don't match macros within 10%, adjust
          if (caloriesDifference > foodData.calories * 0.1) {
            foodData.calories = Math.round(totalCaloriesFromMacros);
          }
          
          setResult({
            ...foodData,
            isFood: true,
            // Round values for cleaner display
            calories: Math.round(foodData.calories),
            protein: Math.round(foodData.protein),
            carbs: Math.round(foodData.carbs),
            fat: Math.round(foodData.fat)
          } as any);
        }
      } else {
        throw new Error("Failed to parse AI response");
      }
      
    } catch (error) {
      console.error("Food recognition error:", error);
      
      // Enhanced fallback with better error messaging
      setResult({
        name: "Analysis Error",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        serving: "N/A",
        confidence: 0,
        isFood: false,
        error: true
      } as any);
    }
    
    setIsAnalyzing(false);
  };

  const handleAddToLog = () => {
    if (result) {
      onAddFood({
        name: result.name,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fat: result.fat,
        serving: result.serving,
        imageUrl: selectedImage || undefined
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedImage(null);
        setResult(null);
      }, 2000);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        className="glass-effect-strong rounded-3xl p-8 border border-primary-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Camera className="w-8 h-8 text-primary-500" />
          <h2 className="text-3xl font-display font-bold">AI Food Recognition</h2>
        </div>
        <p className="text-gray-400">Upload a photo of your meal for instant nutrition analysis</p>
      </motion.div>

      {/* Upload Section */}
      {!selectedImage && (
        <motion.div
          className="glass-effect rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <div className="border-2 border-dashed border-gray-600 rounded-2xl p-12 text-center hover:border-primary-500 transition-all hover:bg-primary-500/5">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2">Upload Food Image</h3>
              <p className="text-gray-400 mb-4">Drop your image here or click to browse</p>
              
              <div className="flex justify-center gap-2 text-sm text-gray-500">
                <span>Supports:</span>
                <span className="text-primary-500">JPG, PNG, JPEG</span>
              </div>
            </div>
          </label>
        </motion.div>
      )}

      {/* Analysis Section */}
      <AnimatePresence mode="wait">
        {selectedImage && (
          <motion.div
            className="glass-effect rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Preview */}
              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden bg-dark-800">
                  {selectedImage.startsWith('data:') ? (
                    <Image 
                      src={selectedImage} 
                      alt="Uploaded food" 
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {selectedImage.includes('Chicken') && '🍗'}
                      {selectedImage.includes('Salad') && '🥗'}
                      {selectedImage.includes('Pasta') && '🍝'}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 p-2 bg-dark-900/90 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <X className="w-5 h-5 text-red-400" />
                </button>
              </div>

              {/* Analysis Results */}
              <div className="flex flex-col justify-center">
                {isAnalyzing ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="inline-block mb-4"
                    >
                      <Sparkles className="w-12 h-12 text-primary-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Analyzing Image...</h3>
                    <p className="text-gray-400">AI is processing your food</p>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {/* Check if it's not a food item */}
                    {result.isFood === false ? (
                      <div className="text-center py-12">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', bounce: 0.5 }}
                        >
                          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="w-10 h-10 text-red-400" />
                          </div>
                        </motion.div>
                        <h3 className="text-2xl font-display font-bold mb-2 text-red-400">
                          Not a Food Item
                        </h3>
                        <p className="text-gray-400 mb-6">
                          This image does not appear to contain food. Please upload a clear photo of your meal.
                        </p>
                        <button
                          onClick={handleReset}
                          className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl font-medium hover:shadow-lg transition-all"
                        >
                          Try Another Image
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-primary-500" />
                          <span className="text-sm text-primary-500 font-medium">
                            {Math.round(result.confidence * 100)}% Confidence
                          </span>
                        </div>

                        <h3 className="text-2xl font-display font-bold capitalize mb-4">
                          {result.name}
                        </h3>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="glass-effect rounded-xl p-4">
                            <p className="text-sm text-gray-400 mb-1">Calories</p>
                            <p className="text-2xl font-bold text-orange-400">{result.calories}</p>
                          </div>
                          <div className="glass-effect rounded-xl p-4">
                            <p className="text-sm text-gray-400 mb-1">Protein</p>
                            <p className="text-2xl font-bold text-red-400">{result.protein}g</p>
                          </div>
                          <div className="glass-effect rounded-xl p-4">
                            <p className="text-sm text-gray-400 mb-1">Carbs</p>
                            <p className="text-2xl font-bold text-yellow-400">{result.carbs}g</p>
                          </div>
                          <div className="glass-effect rounded-xl p-4">
                            <p className="text-sm text-gray-400 mb-1">Fat</p>
                            <p className="text-2xl font-bold text-blue-400">{result.fat}g</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-400 mb-6">Serving size: {result.serving}</p>

                        <motion.button
                          onClick={handleAddToLog}
                          className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-orange-500 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Plus className="w-5 h-5" />
                          Add to Daily Log
                        </motion.button>
                      </>
                    )}
                  </motion.div>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-effect-strong rounded-2xl p-8 text-center max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Added Successfully!</h3>
              <p className="text-gray-400">Meal logged to your daily nutrition</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
