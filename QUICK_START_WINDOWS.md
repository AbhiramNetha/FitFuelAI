# 🚀 Quick Start for Windows - FitFuel AI

## 🐳 EASIEST METHOD: Docker (Recommended!)

### 📥 Step 1: Install Docker Desktop (One-time setup)
```
1. Download: https://www.docker.com/products/docker-desktop/
2. Run installer → Click "OK" → Restart computer
3. Open Docker Desktop from Start Menu
4. Wait for "Docker Desktop is running" in system tray ✅
```

### 📂 Step 2: Extract Project
```
1. Right-click fitfuel-ai.zip
2. Click "Extract All..."
3. Choose location (e.g., Desktop)
4. Click "Extract"
```

### ▶️ Step 3: Run Application
```
1. Open fitfuel-ai folder
2. Double-click "start.bat"
3. Wait 2-3 minutes (first time only)
4. Look for "Server started on port 3000"
```

### 🌐 Step 4: Open in Browser
```
Go to: http://localhost:3000
```

### ✅ Done! You're tracking nutrition!

---

## 🛑 To Stop the App
```
Press Ctrl + C in the black window
Or close Docker Desktop
```

---

## 💻 ALTERNATIVE METHOD: Node.js

### 📥 Step 1: Install Node.js (One-time setup)
```
1. Download: https://nodejs.org/ (click LTS)
2. Run installer → Accept defaults → Install
3. Restart computer
```

### 📂 Step 2: Extract Project
```
Same as Docker method above
```

### 💿 Step 3: Install Dependencies
```
1. Press Win + R
2. Type: cmd
3. Press Enter
4. Type: cd Desktop\fitfuel-ai
5. Type: npm install
6. Wait 2-3 minutes
```

### ▶️ Step 4: Run Application
```
In same command prompt:
npm run dev
```

### 🌐 Step 5: Open in Browser
```
Go to: http://localhost:3000
```

---

## 🆘 Common Issues

### ❌ "Port 3000 already in use"
**Fix**: Use different port
```
Edit docker-compose.yml:
Change "3000:3000" to "8080:3000"
Then use: http://localhost:8080
```

### ❌ "Docker daemon not running"
**Fix**: Start Docker Desktop
```
1. Open Docker Desktop from Start Menu
2. Wait for it to fully start
3. Try again
```

### ❌ "npm not recognized"
**Fix**: Reinstall Node.js
```
1. Download Node.js again
2. Make sure "Add to PATH" is checked
3. Restart computer
```

---

## 📞 Need More Help?

See detailed guide: **WINDOWS_SETUP.md**

---

**Enjoy FitFuel AI!** 🎉
