'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Lock, Settings, Play, X, ExternalLink } from 'lucide-react';
import TrainingOnboarding from './TrainingOnboarding';
import { UserLevel, UserGender, trainingData, levelInfo, genderInfo, Video } from '@/lib/trainingLevels';

export default function WorkoutLibrary() {
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [userGender, setUserGender] = useState<UserGender | null>(null);
  const [trainingMonths, setTrainingMonths] = useState<number>(0);
  const [showLevelChange, setShowLevelChange] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedLevel = localStorage.getItem('user-training-level') as UserLevel | null;
    const savedGender = localStorage.getItem('user-gender') as UserGender | null;
    const savedMonths = localStorage.getItem('user-training-months');
    
    if (savedLevel && savedGender && savedMonths) {
      setUserLevel(savedLevel);
      setUserGender(savedGender);
      setTrainingMonths(parseInt(savedMonths));
    }
  }, []);

  const handleOnboardingComplete = (level: UserLevel, months: number, gender: UserGender) => {
    setUserLevel(level);
    setUserGender(gender);
    setTrainingMonths(months);
    localStorage.setItem('user-training-level', level);
    localStorage.setItem('user-gender', gender);
    localStorage.setItem('user-training-months', months.toString());
  };

  const handleLevelChange = () => {
    setShowLevelChange(true);
  };

  const handleLevelChangeComplete = (level: UserLevel, months: number, gender: UserGender) => {
    setUserLevel(level);
    setUserGender(gender);
    setTrainingMonths(months);
    setShowLevelChange(false);
    localStorage.setItem('user-training-level', level);
    localStorage.setItem('user-gender', gender);
    localStorage.setItem('user-training-months', months.toString());
  };

  const handleVideoClick = (video: Video) => {
    // If video is not embeddable, open YouTube directly
    if (video.embeddable === false) {
      window.open(video.url, '_blank');
    } else {
      // Otherwise, open in modal
      setSelectedVideo(video);
    }
  };

  // Show onboarding if no level/gender selected
  if (!userLevel || !userGender || showLevelChange) {
    return (
      <div className="space-y-6">
        {showLevelChange && (
          <button
            onClick={() => setShowLevelChange(false)}
            className="text-yellow-600 dark:text-yellow-400 hover:underline mb-4"
          >
            ← Back to Workouts
          </button>
        )}
        <TrainingOnboarding 
          onComplete={showLevelChange ? handleLevelChangeComplete : handleOnboardingComplete} 
        />
      </div>
    );
  }

  const currentContent = trainingData[userGender][userLevel];
  const currentLevelInfo = levelInfo[userLevel];
  const currentGenderInfo = genderInfo[userGender];

  return (
    <div className="space-y-6">
      {/* Video Modal - Only for embeddable videos */}
      <AnimatePresence>
        {selectedVideo && selectedVideo.embeddable !== false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="glass-effect-strong rounded-3xl p-8 border border-yellow-200 dark:border-yellow-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100">
                Your Personalized Workouts
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Curated training videos for your level and goals
              </p>
            </div>
          </div>

          <button
            onClick={handleLevelChange}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Change Settings</span>
          </button>
        </div>

        {/* User Info Badges */}
        <div className="flex flex-wrap gap-3">
          {/* Gender Badge */}
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${currentGenderInfo.color} text-white`}>
            <span className="text-xl">{currentGenderInfo.icon}</span>
            <span className="font-bold">{currentGenderInfo.label}</span>
          </div>

          {/* Level Badge */}
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${currentLevelInfo.color} text-white`}>
            <span className="text-xl">{currentLevelInfo.icon}</span>
            <div>
              <p className="font-bold capitalize">{userLevel}</p>
              <p className="text-xs opacity-90">{trainingMonths} months</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${userGender}-${userLevel}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Section Header */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {currentContent.heading}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentContent.videos.map((video, index) => {
              const isEmbeddable = video.embeddable !== false;
              
              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-amber-200 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-600 transition-all hover:shadow-xl group"
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to standard quality if maxres fails
                        e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    
                    {/* Play/External Button */}
                    <button
                      onClick={() => handleVideoClick(video)}
                      className="absolute inset-0 flex items-center justify-center group/play"
                    >
                      <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center group-hover/play:bg-yellow-400 group-hover/play:scale-110 transition-all shadow-2xl">
                        {isEmbeddable ? (
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        ) : (
                          <ExternalLink className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </button>

                    {/* Badge for non-embeddable videos */}
                    {!isEmbeddable && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Opens in YouTube
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {video.description}
                    </p>
                    
                    {/* CTA Button */}
                    <button
                      onClick={() => handleVideoClick(video)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-amber-700 transition-all group/btn"
                    >
                      {isEmbeddable ? (
                        <>
                          <Play className="w-4 h-4" fill="white" />
                          <span>{video.cta}</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4" />
                          <span>{video.cta}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Locked Levels */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5 text-gray-500" />
          <h4 className="font-bold text-gray-900 dark:text-gray-100">
            Unlock More Content
          </h4>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          As you progress, you&apos;ll gain access to more advanced training content. Focus on mastering your current level first!
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(levelInfo).map(([level, info]) => (
            <div
              key={level}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                level === userLevel
                  ? `bg-gradient-to-r ${info.color} text-white`
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
              }`}
            >
              <span>{info.icon}</span>
              <span className="text-sm font-medium capitalize">{level}</span>
              {level !== userLevel && <Lock className="w-3 h-3" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
