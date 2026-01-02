# 🪟 Windows Setup Guide - FitFuel AI

Complete step-by-step instructions for running FitFuel AI on Windows.

---

## 🎯 Choose Your Method

You have **TWO options** to run this project on Windows:

1. **🐳 Docker Method** (Recommended - Super Easy!)
2. **💻 Traditional Method** (Node.js)

---

# 🐳 METHOD 1: DOCKER (RECOMMENDED)

## Why Docker?
- ✅ No Node.js installation needed
- ✅ No dependency issues
- ✅ One-click to run
- ✅ Easiest method for beginners

---

## Step 1: Install Docker Desktop

### Download Docker Desktop
1. Go to: https://www.docker.com/products/docker-desktop/
2. Click **"Download for Windows"**
3. Download will start automatically (about 500MB)

### Install Docker Desktop
1. **Run the installer** (Docker Desktop Installer.exe)
2. **Follow the installation wizard**:
   - Check ✅ "Use WSL 2 instead of Hyper-V" (recommended)
   - Click "OK"
3. **Wait for installation** (takes 2-3 minutes)
4. **Restart your computer** when prompted

### Start Docker Desktop
1. **Open Docker Desktop** from Start Menu
2. **Wait for Docker to start** (you'll see "Docker Desktop is running" in system tray)
3. **Accept the agreement** if prompted
4. **Skip the tutorial** (you can click "Skip tutorial")

### Verify Docker is Running
1. **Open Command Prompt** (Press `Win + R`, type `cmd`, press Enter)
2. **Type this command**:
   ```cmd
   docker --version
   ```
3. **You should see**: `Docker version 24.x.x` (or similar)

✅ **Docker is ready!**

---

## Step 2: Extract the Project

1. **Locate the downloaded file**: `fitfuel-ai.zip`
2. **Right-click** on the ZIP file
3. **Select** "Extract All..."
4. **Choose a location** (Desktop is fine)
5. **Click** "Extract"

You should now have a folder called `fitfuel-ai`

---

## Step 3: Run the Application

### Option A: Use the Launcher (Easiest!)

1. **Open the extracted folder** `fitfuel-ai`
2. **Find the file** `start.bat`
3. **Double-click** `start.bat`
4. **Wait** for the build process (2-3 minutes first time)
5. **A black window will open** showing the build progress
6. **When you see** "Server started on port 3000", you're ready!

### Option B: Use Command Prompt

1. **Open Command Prompt**:
   - Press `Win + R`
   - Type `cmd`
   - Press Enter

2. **Navigate to the project folder**:
   ```cmd
   cd Desktop\fitfuel-ai
   ```
   (Adjust path if you extracted elsewhere)

3. **Run Docker Compose**:
   ```cmd
   docker-compose up --build
   ```

4. **Wait for build** (2-3 minutes first time)

---

## Step 4: Open the Application

1. **Open your web browser** (Chrome, Edge, Firefox)
2. **Go to**: http://localhost:3000
3. **You should see** the FitFuel AI dashboard! 🎉

---

## Step 5: Using the Application

The application is now running! You can:
- ✅ Track your daily nutrition
- ✅ Scan food images
- ✅ Set weight goals
- ✅ Get meal suggestions
- ✅ View health tips

---

## Step 6: Stopping the Application

### If you used start.bat:
- **Press** `Ctrl + C` in the black window
- **Type** `Y` when asked to terminate
- **Close** the window

### If you used Command Prompt:
- **Press** `Ctrl + C` in the command prompt
- **Type** `Y` when asked to terminate

### Or use Docker Desktop:
1. **Open Docker Desktop**
2. **Go to** "Containers" tab
3. **Click the STOP button** (⬛) next to fitfuel-ai-app

---

## 🔄 Running Again Later

### Easy Way:
1. **Make sure Docker Desktop is running** (check system tray)
2. **Double-click** `start.bat`
3. **Open** http://localhost:3000

### Command Prompt Way:
```cmd
cd Desktop\fitfuel-ai
docker-compose up
```

**Note**: After the first build, starting takes only 10-30 seconds!

---

# 💻 METHOD 2: TRADITIONAL (Node.js)

## Why Traditional?
- 🛠️ Full control over development
- 🔧 Easy to modify code
- 📦 Direct access to packages

---

## Step 1: Install Node.js

### Download Node.js
1. Go to: https://nodejs.org/
2. Click **"LTS"** (Long Term Support) - recommended
3. Download the **Windows Installer (.msi)** (about 30MB)

### Install Node.js
1. **Run the installer** (node-vXX.X.X-x64.msi)
2. **Follow the installation wizard**:
   - Click "Next"
   - Accept the license
   - Choose installation location (default is fine)
   - **Important**: Check ✅ "Automatically install necessary tools"
   - Click "Install"
3. **Wait for installation** (takes 1-2 minutes)
4. **Click "Finish"**

### Verify Installation
1. **Open Command Prompt** (Press `Win + R`, type `cmd`, press Enter)
2. **Type these commands**:
   ```cmd
   node --version
   npm --version
   ```
3. **You should see version numbers** (e.g., v18.x.x and 9.x.x)

✅ **Node.js is ready!**

---

## Step 2: Extract the Project

1. **Locate the downloaded file**: `fitfuel-ai.zip`
2. **Right-click** on the ZIP file
3. **Select** "Extract All..."
4. **Choose a location** (Desktop is fine)
5. **Click** "Extract"

---

## Step 3: Install Dependencies

1. **Open Command Prompt**:
   - Press `Win + R`
   - Type `cmd`
   - Press Enter

2. **Navigate to the project folder**:
   ```cmd
   cd Desktop\fitfuel-ai
   ```
   (Adjust path if you extracted elsewhere)

3. **Install dependencies**:
   ```cmd
   npm install
   ```

4. **Wait for installation** (2-3 minutes)
   - You'll see a progress bar
   - Ignore warnings (they're normal)

✅ **Dependencies installed!**

---

## Step 4: Run the Application

1. **In the same Command Prompt**, type:
   ```cmd
   npm run dev
   ```

2. **Wait for startup** (10-15 seconds)

3. **You'll see messages** ending with:
   ```
   - ready started server on 0.0.0.0:3000
   - Local: http://localhost:3000
   ```

✅ **Application is running!**

---

## Step 5: Open the Application

1. **Open your web browser** (Chrome, Edge, Firefox)
2. **Go to**: http://localhost:3000
3. **You should see** the FitFuel AI dashboard! 🎉

---

## Step 6: Stopping the Application

1. **Go to the Command Prompt window**
2. **Press** `Ctrl + C`
3. **Type** `Y` when asked to terminate

---

## 🔄 Running Again Later

```cmd
cd Desktop\fitfuel-ai
npm run dev
```

Then open http://localhost:3000

---

# 🔧 Troubleshooting

## Docker Issues

### "Docker Desktop requires a newer WSL kernel version"
**Solution**:
1. Open PowerShell as Administrator
2. Run: `wsl --update`
3. Restart computer
4. Start Docker Desktop again

### "Cannot connect to Docker daemon"
**Solution**:
1. Make sure Docker Desktop is running
2. Check system tray for Docker icon
3. If not running, open Docker Desktop from Start Menu

### Port 3000 is already in use
**Solution**:
1. Stop any other apps using port 3000
2. Or change the port:
   - Open `docker-compose.yml` in Notepad
   - Change `"3000:3000"` to `"8080:3000"`
   - Save and run again
   - Access at http://localhost:8080

### Docker is too slow
**Solution**:
1. Open Docker Desktop
2. Go to Settings (gear icon)
3. Resources → Increase CPU and Memory
4. Click "Apply & Restart"

## Node.js Issues

### "npm is not recognized"
**Solution**:
1. Reinstall Node.js
2. Make sure to check "Add to PATH" during installation
3. Restart Command Prompt after installation

### "EACCES: permission denied"
**Solution**:
1. Run Command Prompt as Administrator:
   - Search "cmd" in Start Menu
   - Right-click → "Run as administrator"
2. Try the command again

### "Module not found"
**Solution**:
1. Delete `node_modules` folder
2. Run `npm install` again

### Port 3000 is already in use
**Solution**:
1. Find what's using port 3000:
   ```cmd
   netstat -ano | findstr :3000
   ```
2. Kill the process:
   ```cmd
   taskkill /PID <PID_NUMBER> /F
   ```
   (Replace <PID_NUMBER> with the number you see)
3. Or edit `package.json` to use different port

---

# 📊 Quick Command Reference

## Docker Commands
```cmd
# Start application
docker-compose up

# Start in background
docker-compose up -d

# Stop application
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs -f
```

## NPM Commands
```cmd
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

---

# 🎯 Next Steps

After getting it running:

1. **Explore all 5 sections**:
   - Dashboard
   - Scan Food
   - Goals
   - Meal Plans
   - Health Tips

2. **Try features**:
   - Upload a food image
   - Set your weight goals
   - Log some meals
   - Track water intake

3. **Customize** (optional):
   - Change colors in `tailwind.config.js`
   - Add more foods in `lib/utils.ts`
   - Modify components in `components/` folder

---

# 📞 Still Having Issues?

1. **Check Docker Desktop is running** (for Docker method)
2. **Verify Node.js is installed** (for traditional method)
3. **Make sure port 3000 is free**
4. **Try restarting your computer**
5. **Check Windows Firewall** isn't blocking the application

---

# ✅ Success Checklist

For Docker Method:
- [ ] Docker Desktop installed
- [ ] Docker Desktop is running (check system tray)
- [ ] Project extracted
- [ ] Ran `docker-compose up` or `start.bat`
- [ ] Opened http://localhost:3000
- [ ] Application loads successfully

For Traditional Method:
- [ ] Node.js installed (v18+)
- [ ] Project extracted
- [ ] Ran `npm install`
- [ ] Ran `npm run dev`
- [ ] Opened http://localhost:3000
- [ ] Application loads successfully

---

**That's it! You're ready to track your nutrition with FitFuel AI!** 🎉

Enjoy the application! 💪
