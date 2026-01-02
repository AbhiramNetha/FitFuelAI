export type UserLevel = "beginner" | "intermediate" | "advanced";
export type UserGender = "men" | "women";

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  url: string;
  description: string;
  cta: string;
  embeddable?: boolean;
}

export interface LevelContent {
  level: string;
  heading: string;
  description: string;
  videos: Video[];
}

export interface TrainingData {
  men: {
    beginner: LevelContent;
    intermediate: LevelContent;
    advanced: LevelContent;
  };
  women: {
    beginner: LevelContent;
    intermediate: LevelContent;
    advanced: LevelContent;
  };
}

export function getUserLevel(months: number): UserLevel {
  if (months < 6) return "beginner";
  if (months < 18) return "intermediate";
  return "advanced";
}

export const trainingData: TrainingData = {
  "men": {
    "beginner": {
      "level": "Beginner (0–6 months)",
      "heading": "Start Strong: Build Your Foundation",
      "description": "Learn proper form, build base strength with simple structure. Full body and basic splits with low-moderate volume designed for beginners.",
      "videos": [
        {
          "id": "men_beginner_1",
          "title": "Beginner Workout Split Routine",
          "youtubeId": "3ryh7PNhz3E",
          "url": "https://www.youtube.com/watch?v=3ryh7PNhz3E",
          "description": "Foundational movements and manageable volume for building your training base.",
          "cta": "Start Your Foundation",
          "embeddable": true
        },
        {
          "id": "men_beginner_2",
          "title": "Full Body Beginner Training",
          "youtubeId": "GNO4OtYoCYk",
          "url": "https://www.youtube.com/watch?v=GNO4OtYoCYk",
          "description": "Complete full-body routine with beginner-friendly execution and proper form focus.",
          "cta": "Build Your Base",
          "embeddable": true
        },
        {
          "id": "men_beginner_3",
          "title": "Basic Strength Split Program",
          "youtubeId": "SgyUoY0IZ7A",
          "url": "https://www.youtube.com/watch?v=SgyUoY0IZ7A",
          "description": "Simple split structure designed to help beginners survive and progress through workouts.",
          "cta": "Learn Movement Basics",
          "embeddable": true
        },
        {
          "id": "men_beginner_4",
          "title": "Beginner Form & Technique Guide",
          "youtubeId": "kIXcoivzGf8",
          "url": "https://www.youtube.com/watch?v=kIXcoivzGf8",
          "description": "Master fundamental exercises with proper technique and safe progression.",
          "cta": "Perfect Your Form",
          "embeddable": true
        }
      ]
    },
    "intermediate": {
      "level": "Intermediate (6–18 months)",
      "heading": "Grow Stronger: Hypertrophy & Conditioning",
      "description": "Build muscle with structured splits like Upper/Lower and Push-Pull. Moderate-high volume with conditioning integration for optimal growth.",
      "videos": [
        {
          "id": "men_intermediate_1",
          "title": "Upper/Lower Split Training",
          "youtubeId": "OpRMRhr0Ycc",
          "url": "https://www.youtube.com/watch?v=OpRMRhr0Ycc",
          "description": "Structured upper/lower split designed for hypertrophy and muscle growth.",
          "cta": "Try Upper/Lower Split",
          "embeddable": true
        },
        {
          "id": "men_intermediate_2",
          "title": "Push-Pull Training Program",
          "youtubeId": "fGm-ef-4PVk",
          "url": "https://www.youtube.com/watch?v=fGm-ef-4PVk",
          "description": "Effective push-pull routine for intermediate lifters building muscle mass.",
          "cta": "Start Push-Pull",
          "embeddable": true
        },
        {
          "id": "men_intermediate_3",
          "title": "Hypertrophy Split Workout",
          "youtubeId": "jLvqKgW-_G8",
          "url": "https://www.youtube.com/watch?v=jLvqKgW-_G8",
          "description": "Moderate-high volume split optimized for muscle hypertrophy.",
          "cta": "Maximize Muscle Growth",
          "embeddable": true
        },
        {
          "id": "men_intermediate_4",
          "title": "Structured Split Program",
          "youtubeId": "didU4ZwAkPI",
          "url": "https://www.youtube.com/watch?v=didU4ZwAkPI",
          "description": "Complete structured split routine for intermediate progression.",
          "cta": "Level Up Your Training",
          "embeddable": true
        },
        {
          "id": "men_intermediate_5",
          "title": "Conditioning & Intensity Training",
          "youtubeId": "Xg9B6pqHUQE",
          "url": "https://www.youtube.com/watch?v=Xg9B6pqHUQE",
          "description": "Conditioning days and intensity techniques for intermediate athletes.",
          "cta": "Add Conditioning Work",
          "embeddable": true
        },
        {
          "id": "men_intermediate_6",
          "title": "Hybrid Hypertrophy & Performance",
          "youtubeId": "tPphF8gepd8",
          "url": "https://www.youtube.com/watch?v=tPphF8gepd8",
          "description": "Hybrid training combining hypertrophy with athletic performance elements.",
          "cta": "Train Like an Athlete",
          "embeddable": true
        }
      ]
    },
    "advanced": {
      "level": "Advanced (18+ months)",
      "heading": "Push Limits: Intensity & Specialization",
      "description": "High volume and density training with advanced execution. Focus on intensity, specialization, and fatigue management for experienced lifters.",
      "videos": [
        {
          "id": "men_advanced_1",
          "title": "Advanced Intensity Training",
          "youtubeId": "nxisr1AalNc",
          "url": "https://www.youtube.com/watch?v=nxisr1AalNc",
          "description": "High-intensity advanced training requiring strong recovery capacity.",
          "cta": "Push Your Limits",
          "embeddable": true
        },
        {
          "id": "men_advanced_2",
          "title": "Advanced Specialization Program",
          "youtubeId": "7USunyFGITk",
          "url": "https://www.youtube.com/watch?v=7USunyFGITk",
          "description": "Specialized training for targeting weak points and maximizing development.",
          "cta": "Specialize Your Training",
          "embeddable": true
        },
        {
          "id": "men_advanced_3",
          "title": "High Volume Advanced Split",
          "youtubeId": "tQ2LSSP_0GQ",
          "url": "https://www.youtube.com/watch?v=tQ2LSSP_0GQ",
          "description": "High-volume training split for advanced lifters with excellent recovery.",
          "cta": "Handle High Volume",
          "embeddable": true
        },
        {
          "id": "men_advanced_4",
          "title": "Fatigue Management & Recovery",
          "youtubeId": "FbWfA_s0XL8",
          "url": "https://www.youtube.com/watch?v=FbWfA_s0XL8",
          "description": "Advanced strategies for managing fatigue and optimizing recovery.",
          "cta": "Master Recovery",
          "embeddable": true
        },
        {
          "id": "men_advanced_5",
          "title": "Elite Conditioning Protocol",
          "youtubeId": "FWDXsqHo14A",
          "url": "https://www.youtube.com/watch?v=FWDXsqHo14A",
          "description": "High-level conditioning requiring strong base, recovery capacity, and technical control.",
          "cta": "Elite Conditioning",
          "embeddable": true
        }
      ]
    }
  },
  "women": {
    "beginner": {
      "level": "Beginner (0–6 months)",
      "heading": "Build Confidence: Get Fit the Smart Way",
      "description": "Safe, effective workout splits to improve fitness, confidence, and movement quality with structured training programs.",
      "videos": [
        {
          "id": "women_beginner_1",
          "title": "WEEK OF WORKOUTS | 4 Day Workout Split",
          "youtubeId": "hsjwYICtWiQ",
          "url": "https://www.youtube.com/watch?v=hsjwYICtWiQ",
          "description": "A typical 4-day workout week split (legs, upper, core, total body), ideal for beginners who want structure.",
          "cta": "Start 4-Day Split",
          "embeddable": true
        },
        {
          "id": "women_beginner_2",
          "title": "4 Day Busy Girl Split | Gym Workouts",
          "youtubeId": "id8p9csb2XA",
          "url": "https://www.youtube.com/watch?v=id8p9csb2XA",
          "description": "A variation of a 4-day split with accessible exercises for beginners or those returning to training.",
          "cta": "Try Busy Girl Split",
          "embeddable": true
        },
        {
          "id": "women_beginner_3",
          "title": "5-Day Workout Split Playlist",
          "youtubeId": "PLpa0d6IJAhbj5rBuRBT5GtNtNNJazIWOa",
          "url": "https://www.youtube.com/playlist?list=PLpa0d6IJAhbj5rBuRBT5GtNtNNJazIWOa",
          "description": "Structured 5-day split at moderate pace, good for beginners aiming to build consistency.",
          "cta": "Follow 5-Day Program",
          "embeddable": false
        },
        {
          "id": "women_beginner_4",
          "title": "3-Day Workout Split Playlist",
          "youtubeId": "PLpa0d6IJAhbgmjxgq1jnUneDDMbPxr50D",
          "url": "https://www.youtube.com/playlist?list=PLpa0d6IJAhbgmjxgq1jnUneDDMbPxr50D",
          "description": "Simple 3-day split focusing on balanced full-body training — ideal for beginners.",
          "cta": "Start 3-Day Split",
          "embeddable": false
        }
      ]
    },
    "intermediate": {
      "level": "Intermediate (6–18 months)",
      "heading": "Shape & Strength: Train With Purpose",
      "description": "Balanced training splits focused on strength, body recomposition, and building endurance with structured programs.",
      "videos": [
        {
          "id": "women_intermediate_1",
          "title": "5-DAY WORKOUT SPLIT (25-Minutes/Day)",
          "youtubeId": "rYaWVn8TiV4",
          "url": "https://www.youtube.com/shorts/rYaWVn8TiV4",
          "description": "Intermediate split with shorter sessions (~25 min) that build endurance and tone while increasing training frequency.",
          "cta": "Try 25-Min Split",
          "embeddable": true
        },
        {
          "id": "women_intermediate_2",
          "title": "Women's Gym Workouts Playlist",
          "youtubeId": "PL5qo1Sl2GW3ch61dHXaiwHp5J_12uZyhJ",
          "url": "https://www.youtube.com/playlist?list=PL5qo1Sl2GW3ch61dHXaiwHp5J_12uZyhJ",
          "description": "Includes arm, full body, chest & back workouts — good for intermediate women to diversify split routines.",
          "cta": "Diversify Your Training",
          "embeddable": false
        },
        {
          "id": "women_intermediate_3",
          "title": "30-Minute Full Body Dumbbell Strength",
          "youtubeId": "tiyU63Pv9lY",
          "url": "https://www.youtube.com/watch?v=tiyU63Pv9lY",
          "description": "Great for intermediate women who have some strength training background and want split days with strength focus.",
          "cta": "Build Strength",
          "embeddable": true
        },
        {
          "id": "women_intermediate_4",
          "title": "35-Minute Full Body Strength + HIIT",
          "youtubeId": "QbffDgGfn4Q",
          "url": "https://www.youtube.com/watch?v=QbffDgGfn4Q",
          "description": "Combines strength and cardio within split days — ideal for intermediate users.",
          "cta": "Add HIIT Training",
          "embeddable": true
        }
      ]
    },
    "advanced": {
      "level": "Advanced (18+ months)",
      "heading": "Refine & Sculpt: Advanced Training",
      "description": "Advanced methods to sculpt physique, target weak areas, and manage fatigue with structured periodization.",
      "videos": [
        {
          "id": "women_advanced_1",
          "title": "4 Week Training Split for Women",
          "youtubeId": "PL7PDZ00fddjflWQFrSmMahslYzwdGNh2y",
          "url": "https://www.youtube.com/playlist?list=PL7PDZ00fddjflWQFrSmMahslYzwdGNh2y",
          "description": "Advanced 4-week structured split focusing on strength & hypertrophy (dumbbell/barbell based).",
          "cta": "Follow 4-Week Program",
          "embeddable": false
        },
        {
          "id": "women_advanced_2",
          "title": "CURRENT WORKOUT SPLIT | Routine for Women",
          "youtubeId": "oSleT7lQtZY",
          "url": "https://www.youtube.com/watch?v=oSleT7lQtZY",
          "description": "Shows an advanced, personal workout split routine that can be adapted by experienced women lifters.",
          "cta": "Copy Advanced Split",
          "embeddable": true
        },
        {
          "id": "women_advanced_3",
          "title": "Women's Workout – Toning in the Gym",
          "youtubeId": "PL5qo1Sl2GW3fNC78qry7eRC8EVM0F7nVF",
          "url": "https://www.youtube.com/playlist?list=PL5qo1Sl2GW3fNC78qry7eRC8EVM0F7nVF",
          "description": "Focused toning workouts structured into a weekly schedule; works well for advanced intermediate progression.",
          "cta": "Sculpt Your Physique",
          "embeddable": false
        },
        {
          "id": "women_advanced_4",
          "title": "Weekly Split Suggestions / Multiple Day Workouts",
          "youtubeId": "uu7eqMFhJEE",
          "url": "https://www.youtube.com/watch?v=uu7eqMFhJEE",
          "description": "Video walking through a personalized split that transformed a physique — great for advanced users.",
          "cta": "Transform Your Body",
          "embeddable": true
        }
      ]
    }
  }
};

export const levelInfo = {
  beginner: {
    color: "from-green-500 to-emerald-500",
    badgeColor: "bg-green-500",
    icon: "🟢",
    timeRange: "0-6 months",
    description: "Learn form, build habit, avoid injury"
  },
  intermediate: {
    color: "from-yellow-500 to-amber-500",
    badgeColor: "bg-yellow-500",
    icon: "🟡",
    timeRange: "6-18 months",
    description: "Optimize hypertrophy and progression"
  },
  advanced: {
    color: "from-red-500 to-orange-600",
    badgeColor: "bg-red-500",
    icon: "🔴",
    timeRange: "18+ months",
    description: "Break plateaus and specialize"
  }
};

export const genderInfo = {
  men: {
    icon: "💪",
    label: "Men",
    color: "from-blue-500 to-cyan-500"
  },
  women: {
    icon: "👸",
    label: "Women",
    color: "from-pink-500 to-rose-500"
  }
};
