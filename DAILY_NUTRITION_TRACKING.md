# 📅 DAILY NUTRITION TRACKING WITH CALENDAR & GRAPHS

## 📊 Overview

FitFuel AI now includes a **comprehensive daily tracking system** with:
- ✅ **Automatic daily reset** at midnight
- ✅ **Historical data storage** (up to 90 days)
- ✅ **Interactive charts** showing nutrient trends
- ✅ **Calendar navigation** to view any day
- ✅ **7-day weekly averages**
- ✅ **Detailed meal breakdowns** per day

---

## 🎯 New Features

### **1. Automatic Daily Reset**

**What It Does:**
- Detects when a new day starts
- Automatically saves yesterday's data
- Resets today's tracker to zero
- Preserves historical data

**How It Works:**
```
Midnight arrives → New day detected
├── Yesterday's data saved to history
├── Today's meals cleared
├── Water intake reset to 0
└── Ready for new day tracking
```

---

### **2. Historical Data Storage**

**What Gets Saved:**
- Total calories per day
- Protein, carbs, fats, fiber
- Water intake
- All meals with timestamps
- 90-day rolling history

**Storage Structure:**
```javascript
{
  "date": "2026-01-02",
  "calories": 2150,
  "protein": 145,
  "carbs": 220,
  "fats": 65,
  "fiber": 32,
  "water": 8,
  "meals": [
    {
      "id": "meal-1",
      "name": "Chicken & Rice",
      "calories": 450,
      "timestamp": "2026-01-02T12:30:00Z"
      // ... more nutrients
    }
  ]
}
```

---

### **3. Interactive Charts**

**Calorie Trend (Line Chart):**
- Shows daily calorie intake over time
- Visual trend line
- Hover for exact values
- Helps spot patterns

**Macronutrient Bars (Bar Chart):**
- Side-by-side comparison
- Protein (red), Carbs (blue), Fats (green)
- Easy to see balance
- Daily breakdown

**Time Periods:**
- 7 days (1 week)
- 14 days (2 weeks)
- 30 days (1 month)

---

### **4. Calendar Navigation**

**View Any Day:**
- Select specific dates
- Previous/Next day buttons
- "Today" quick jump
- Date range: up to 90 days back

**Daily Details Show:**
- Total nutrients for that day
- All meals eaten
- Meal timestamps
- Individual nutrient breakdowns

---

### **5. Weekly Averages**

**7-Day Average Card:**
- Average calories
- Average protein
- Average carbs
- Average fats
- Average fiber

**Benefits:**
- Smooth out daily fluctuations
- See true patterns
- Better goal tracking
- Long-term perspective

---

## 📱 USER INTERFACE

### **Navigation**

**New Tab Added:**
```
Header Navigation:
[Dashboard] [Goals] [Fitness] [Workouts] 
[Meal Plans] [HISTORY] [Health Tips]
              ^^^^^^^^
              NEW TAB!
```

---

### **History Page Layout**

```
┌─────────────────────────────────────┐
│  📊 Nutrition History               │
│  Track daily nutrient intake        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Trend Analysis                     │
│  [7 Days] [14 Days] [30 Days]       │
│                                     │
│  📈 Calorie Intake (Line Chart)     │
│  [Chart showing trend]              │
│                                     │
│  📊 Macronutrients (Bar Chart)      │
│  [Chart showing P/C/F bars]         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📊 7-Day Average                   │
│  Calories: 2150  Protein: 145g      │
│  Carbs: 220g     Fats: 65g          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📅 Daily Details                   │
│  [←] [Today] [→]                    │
│                                     │
│  Friday, Jan 2, 2026                │
│                                     │
│  451 cal | 52.8g P | 43g C | 6.4g F│
│                                     │
│  Meals (3):                         │
│  ├─ Chicken Breast - 12:30 PM       │
│  ├─ Brown Rice - 12:30 PM           │
│  └─ Broccoli - 12:30 PM             │
└─────────────────────────────────────┘
```

---

## 🔄 AUTOMATIC DAILY RESET

### **How It Works**

**On Page Load:**
```javascript
1. Check localStorage for last active date
2. Compare with today's date
3. If different → NEW DAY DETECTED
   ├── Save yesterday's data to history
   ├── Clear food entries
   ├── Reset water intake
   └── Update last active date
4. If same → Load existing data
```

**Example:**
```
Yesterday (Jan 1):
├── User tracked 2150 calories
├── 3 meals logged
└── 8 glasses of water

Midnight Arrives → Jan 2 starts

Page Loads:
├── Jan 1 data saved to history ✅
├── Today's calories: 0 ✅
├── Today's meals: empty ✅
└── Water: 0 ✅
```

---

## 📊 CHART VISUALIZATION

### **Calorie Trend Chart**

**What It Shows:**
- Daily calorie intake
- Line connecting days
- Smooth trend visualization
- Spot high/low days

**Example Data:**
```
Day 1: 2100 cal ●
Day 2: 2300 cal   ●
Day 3: 1950 cal ●
Day 4: 2200 cal    ●
Day 5: 2050 cal  ●
Day 6: 2150 cal   ●
Day 7: 2100 cal ●
```

---

### **Macronutrient Bar Chart**

**What It Shows:**
- Daily protein (red bars)
- Daily carbs (blue bars)
- Daily fats (green bars)
- Side-by-side comparison

**Example:**
```
Day 1:  ███ 150g P  █████ 220g C  ██ 70g F
Day 2:  ████ 160g P  ████ 200g C  ██ 75g F
Day 3:  ██ 140g P  █████ 230g C  ██ 65g F
```

---

## 🗓️ CALENDAR NAVIGATION

### **Daily View Controls**

**Previous Day Button:**
```
[←] Go back one day
```

**Today Button:**
```
[Today] Jump to current date
```

**Next Day Button:**
```
[→] Go forward one day (disabled if already at today)
```

---

### **Date Display**

**Format:**
```
Friday, Jan 2, 2026
```

**Selected Day Shows:**
- Total calories
- All macronutrients
- Complete meal list
- Meal timestamps

---

## 📈 WEEKLY AVERAGE CARD

### **What It Calculates**

**Formula:**
```
Average = Sum of last 7 days ÷ 7
```

**Example:**
```
Last 7 Days Calories:
2100 + 2300 + 1950 + 2200 + 2050 + 2150 + 2100
= 14,850 total
÷ 7 days
= 2,121 average
```

**Displays:**
```
┌───────────────────────────┐
│  📊 7-Day Average         │
│  ─────────────────────    │
│  Calories    2,121        │
│  Protein     145.3g       │
│  Carbs       215.7g       │
│  Fats        67.1g        │
│  Fiber       28.6g        │
└───────────────────────────┘
```

---

## 💾 DATA PERSISTENCE

### **LocalStorage Keys**

**1. Current Day Data:**
```javascript
'food-entries' → Today's meals
'waterIntake' → Today's water
'last-active-date' → "2026-01-02"
```

**2. Historical Data:**
```javascript
'daily-nutrition-history' → Array of 90 days
```

---

### **Data Structure**

**Daily Nutrition Entry:**
```javascript
{
  date: "2026-01-02",
  calories: 2150,
  protein: 145,
  carbs: 220,
  fats: 65,
  fiber: 32,
  water: 8,
  meals: [
    {
      id: "meal-1",
      name: "Chicken Breast",
      calories: 248,
      protein: 46.5,
      carbs: 0,
      fats: 5.4,
      fiber: 0,
      timestamp: "2026-01-02T12:30:00.000Z"
    },
    // ... more meals
  ]
}
```

---

## 🔄 COMPLETE WORKFLOW

### **Scenario: Multi-Day Tracking**

**Day 1 (Monday):**
```
Morning:
├── Log breakfast: Oats + Banana
├── Dashboard shows: 457 cal

Lunch:
├── Log lunch: Chicken + Rice
├── Dashboard shows: 908 cal

Dinner:
├── Log dinner: Salmon + Veggies
├── Dashboard shows: 1455 cal

Midnight:
└── Data automatically saved to history
```

**Day 2 (Tuesday):**
```
Page Loads:
├── New day detected ✅
├── Yesterday saved ✅
├── Today's tracker: 0 cal ✅

Continue Tracking:
├── Log meals throughout day
└── Build today's total
```

**Day 3 (Wednesday):**
```
Open History Tab:
├── See Monday's 1455 cal ✅
├── See Tuesday's data ✅
├── See today's progress ✅
└── View charts showing 3-day trend
```

---

## 📊 EXAMPLE USE CASES

### **Use Case 1: Weekly Review**

```
Friday Evening:
├── Open History tab
├── Select "7 Days" view
├── See calorie trend chart
│   ├── Mon: 2100 cal
│   ├── Tue: 2300 cal
│   ├── Wed: 1950 cal
│   ├── Thu: 2200 cal
│   └── Fri: 2150 cal
│
├── Check weekly average: 2140 cal
└── Goal: 2200 cal → On track! ✅
```

---

### **Use Case 2: Comparing Days**

```
Goal: Find best macro day

Navigate Days:
├── Monday: 150g P, 220g C, 70g F
├── Tuesday: 145g P, 240g C, 65g F
├── Wednesday: 160g P, 200g C, 75g F
│
Best Protein Day: Wednesday ✅
└── Replicate that meal plan
```

---

### **Use Case 3: Spotting Patterns**

```
View 30-Day Chart:

Notice Pattern:
├── Weekends: Lower calories (1800-2000)
├── Weekdays: Higher calories (2100-2300)
│
Analysis:
├── Weekend: Less active
├── Weekday: Gym days
│
Action:
└── Adjust weekend intake for goals
```

---

## 🧪 TESTING GUIDE

### **Test 1: Daily Reset**

```
1. Log some meals today
2. Close browser
3. Change system time to tomorrow
4. Open FitFuel AI
5. Check Dashboard
✓ Should show 0 calories (new day)

6. Open History tab
7. Navigate to yesterday
✓ Should show yesterday's meals
```

---

### **Test 2: Chart Visualization**

```
1. Open History tab
2. Click "7 Days"
✓ Chart shows last 7 days

3. Hover over data points
✓ Tooltip shows exact values

4. Click "30 Days"
✓ Chart expands to 30 days
```

---

### **Test 3: Calendar Navigation**

```
1. Open History → Daily Details
2. Click [←] (Previous Day)
✓ Date changes to yesterday

3. Click [Today]
✓ Jumps back to today

4. Click [→] (Next Day)
✓ Button disabled (can't go beyond today)
```

---

### **Test 4: Data Persistence**

```
1. Log 3 meals
2. Refresh page (F5)
3. Check Dashboard
✓ Meals still there

4. Close browser completely
5. Open tomorrow
6. Check History
✓ Today's data saved
✓ New day starts fresh
```

---

## 🎨 UI COMPONENTS

### **Charts**

**Line Chart (Calories):**
- Color: Orange (#f59e0b)
- Smooth curve
- Dots at data points
- Grid background

**Bar Chart (Macros):**
- Protein: Red (#ef4444)
- Carbs: Blue (#3b82f6)
- Fats: Green (#10b981)
- Side-by-side bars

---

### **Cards**

**Trend Analysis Card:**
- White background (dark: gray-900)
- Purple border
- Period selector buttons
- Responsive charts

**Weekly Average Card:**
- Green gradient background
- White text
- 5-column grid
- Large numbers

**Daily Details Card:**
- White background
- Purple border
- Date navigation
- Meal list

---

## 📂 FILES CREATED/MODIFIED

### **New Files:**

**lib/dailyNutrition.ts**
- Daily data management functions
- Date utilities
- Chart data generation
- Storage helpers

**components/NutritionHistory.tsx**
- Main history page component
- Charts integration
- Calendar navigation
- Daily view

---

### **Modified Files:**

**app/page.tsx**
- Added new day check
- Auto-save daily data
- Import NutritionHistory
- Add history route

**components/Header.tsx**
- Added History tab
- Calendar icon
- 7 navigation items

---

## ✨ SUMMARY

### **What You Get:**

✅ **Automatic Daily Reset**
- New day auto-detection
- Yesterday saved automatically
- Today starts fresh

✅ **90-Day History**
- All past data saved
- Easy retrieval
- Automatic cleanup

✅ **Interactive Charts**
- Calorie trends
- Macro breakdowns
- 7/14/30 day views

✅ **Calendar Navigation**
- View any day
- Previous/Next controls
- Quick "Today" button

✅ **Weekly Averages**
- 7-day calculations
- Smooth out fluctuations
- Better insights

✅ **Complete Meal History**
- All meals with timestamps
- Nutrient breakdowns
- Per-day totals

---

### **Benefits:**

**For Users:**
- 📊 See progress over time
- 📈 Spot patterns and trends
- 🎯 Better goal tracking
- 📅 Historical reference
- 🔄 Automatic management

**For Goals:**
- ✅ Long-term perspective
- ✅ Weekly consistency
- ✅ Pattern recognition
- ✅ Informed adjustments
- ✅ Motivation from progress

---

## 🚀 HOW TO USE

### **Quick Start:**

```cmd
# Install/Update
cd fitfuel-ai
npm install
npm run dev

# Open browser
http://localhost:3000
```

---

### **Using History Feature:**

**Step 1: Track Meals Normally**
```
1. Use Dashboard to track today's meals
2. Data saves automatically
```

**Step 2: View History**
```
1. Click "History" tab in navigation
2. See charts showing your trends
3. Check 7-day average
```

**Step 3: Navigate Days**
```
1. Use [←] [→] buttons
2. Or click [Today]
3. View any day's details
```

**Step 4: Analyze Trends**
```
1. Switch between 7/14/30 days
2. Hover over charts for details
3. Compare with goals
4. Adjust your plan
```

---

**Your nutrition tracking is now a complete analytics system!** 📊✨
