# 👋 Welcome to FitFuel AI!

## 🎯 Choose Your Adventure

You have **TWO** ways to run this application:

---

## 🐳 Option 1: Docker (RECOMMENDED for beginners!)

### ✨ Why Docker?
- ✅ **Super Easy**: Just install Docker, that's it!
- ✅ **No Hassle**: No Node.js, no npm, no dependency headaches
- ✅ **Universal**: Works the same on Windows, Mac, and Linux
- ✅ **One Click**: Double-click a file and you're running!

### 📥 What to Install
Just download and install Docker Desktop:
- **Windows**: https://www.docker.com/products/docker-desktop/
- **macOS**: https://www.docker.com/products/docker-desktop/
- **Linux**: Run `sudo apt-get install docker.io docker-compose`

### 🚀 How to Run
After installing Docker:

**Windows:**
1. Double-click `start.bat`
2. Wait for it to build (first time takes 2-3 minutes)
3. Open http://localhost:3000 in your browser
4. Done! 🎉

**macOS/Linux:**
1. Open Terminal in this folder
2. Run: `./start.sh`
3. Wait for it to build (first time takes 2-3 minutes)
4. Open http://localhost:3000 in your browser
5. Done! 🎉

**Or manually:**
```bash
docker-compose up
```

### 📖 More Docker Info
- Quick guide: [DOCKER_QUICKSTART.md](DOCKER_QUICKSTART.md)
- Complete guide: [DOCKER.md](DOCKER.md)

---

## 💻 Option 2: Traditional Way (for developers)

### ✨ Why Traditional?
- 🛠️ Full control over the development environment
- 🔧 Easy to modify and debug code
- 📦 Direct access to node_modules

### 📥 What to Install
1. **Node.js** version 18 or higher
   - Download: https://nodejs.org/
   - Choose "LTS" version
2. **npm** (comes with Node.js)

### 🚀 How to Run
```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:3000 in your browser
```

### 📖 More Traditional Setup Info
See: [SETUP.md](SETUP.md)

---

## 📚 Documentation Quick Links

| File | What It Is |
|------|------------|
| **README_FIRST.md** | 👈 You are here! Start here |
| **DOCKER_QUICKSTART.md** | 30-second Docker guide |
| **DOCKER.md** | Complete Docker documentation |
| **SETUP.md** | Traditional installation guide |
| **README.md** | Full project documentation |
| **FEATURES.md** | Detailed feature list |
| **PROJECT_SUMMARY.md** | Project overview |

---

## 🆘 Need Help?

### Docker Not Working?
1. Make sure Docker Desktop is running (Windows/Mac)
2. Check the system tray / menu bar for Docker icon
3. See [DOCKER.md](DOCKER.md) for troubleshooting

### Traditional Setup Not Working?
1. Check Node.js version: `node --version` (should be 18+)
2. Delete `node_modules` folder and run `npm install` again
3. See [SETUP.md](SETUP.md) for troubleshooting

### Still Stuck?
- Check the detailed documentation in README.md
- Make sure your antivirus isn't blocking Docker or Node.js

---

## 🎉 Quick Tips

1. **First Time?** → Use Docker! It's easier!
2. **Want to Edit Code?** → Use Traditional setup
3. **Want to Deploy?** → Docker is production-ready
4. **Port 3000 Busy?** → Edit docker-compose.yml to use different port

---

## 🚀 What's Next?

After you get it running:

1. **Explore the app** - Click through all 5 sections
2. **Try features** - Upload a food image, set goals, etc.
3. **Read FEATURES.md** - See everything the app can do
4. **Customize** - Change colors, add features, make it yours!

---

## 💡 Pro Tips

- **Docker users**: Your data is in the browser, not the container
- **Traditional users**: Data is in browser localStorage
- **Both**: Clear browser cache to reset your data
- **Want to share?** Docker makes it super easy - see DOCKER.md

---

**Ready? Pick your option above and let's go! 🚀**

Have fun tracking your nutrition with FitFuel AI! 💪
