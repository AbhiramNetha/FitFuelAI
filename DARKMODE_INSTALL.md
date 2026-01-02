# 🌙 DARK MODE - WORKING INSTALLATION GUIDE

## ⚠️ CRITICAL STEPS - FOLLOW EXACTLY

### **STEP 1: Fix Dashboard.tsx First**

Before anything else, fix the corrupted Dashboard file:

```cmd
# Run the PowerShell script
Right-click FIX_DASHBOARD.ps1 → Run with PowerShell
```

OR manually replace Dashboard.tsx with the one provided.

---

### **STEP 2: Create contexts Folder**

```cmd
cd C:\Users\aarup\OneDrive\Desktop\fitfuel-ai
mkdir contexts
```

---

### **STEP 3: Add ThemeContext.tsx**

Create file: `contexts\ThemeContext.tsx`

Copy this EXACT content:

```typescript
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem('fitfuel-theme') as Theme;
    
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      applyTheme(initialTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('fitfuel-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  const handleSetTheme = (newTheme: Theme) => {
    applyTheme(newTheme);
  };

  if (!mounted) {
    return <div className="invisible">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

---

### **STEP 4: Add ThemeToggle.tsx**

Create file: `components\ThemeToggle.tsx`

---

### **STEP 5: Update tailwind.config.js**

Open `tailwind.config.js` and add this line at the top:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',  // ← ADD THIS LINE
  content: [
    // ... rest of config
```

---

### **STEP 6: Replace globals.css**

Delete current `app\globals.css`

Rename `app\globals_dual.css` to `app\globals.css`

---

### **STEP 7: Test Dark Mode**

```cmd
npm run dev
```

Open http://localhost:3000

Click the sun/moon icon in the header!

---

## ✅ Verification Checklist

After installation:

- [ ] App runs without errors
- [ ] Sun/Moon icon appears in header
- [ ] Clicking icon changes theme instantly
- [ ] Background changes (white ↔ dark)
- [ ] All text is readable
- [ ] Theme persists after refresh
- [ ] Works on all pages/tabs

---

## 🐛 Troubleshooting

### "Dark mode doesn't work"

1. Check `tailwind.config.js` has `darkMode: 'class'`
2. Verify `ThemeProvider` wraps app in `layout.tsx`
3. Check browser console for errors
4. Clear browser cache (Ctrl+Shift+Delete)
5. Delete `.next` folder and restart

### "Theme doesn't persist"

1. Check localStorage in DevTools
2. Verify `localStorage.setItem()` works
3. Check browser permissions

### "Can't see toggle button"

1. Check `ThemeToggle.tsx` exists in `components/`
2. Verify import in `Header.tsx`
3. Check for TypeScript errors

---

## 📝 Quick Commands

```cmd
# Delete build cache
rmdir /s /q .next

# Restart dev server
npm run dev

# Check for errors
npm run build
```

---

## 🎯 Expected Result

**Light Mode:**
- White background
- Dark text
- Green accents
- Light shadows

**Dark Mode:**
- Dark gray background
- Light text
- Brighter green accents
- Dark shadows

**Toggle:**
- Smooth transition
- Instant theme change
- Icon animation
- Ripple effect on click

---

**Follow these steps EXACTLY and dark mode will work perfectly!** 🌙
