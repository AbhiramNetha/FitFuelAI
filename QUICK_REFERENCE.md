# 📋 FitFuel AI - Quick Reference Card

## 🚀 Running the App

### 🐳 Docker (Easiest!)
```bash
# Windows: Double-click start.bat
# Mac/Linux: Run start.sh

# Or manually:
docker-compose up
```

### 💻 Traditional
```bash
npm install
npm run dev
```

---

## 🔗 Access URLs

- **Local**: http://localhost:3000
- **Network**: http://YOUR_IP:3000
- **Custom Port**: Edit docker-compose.yml or use `-p` flag

---

## 🎯 Main Features

| Feature | Description | Tab |
|---------|-------------|-----|
| **Dashboard** | Track calories & macros | 📊 |
| **Scan Food** | AI image recognition | 📸 |
| **Goals** | Weight & targets | 🎯 |
| **Meal Plans** | AI suggestions | 🍽️ |
| **Health Tips** | Nutrition advice | 💡 |

---

## 🐳 Docker Commands

```bash
# Start
docker-compose up

# Start in background
docker-compose up -d

# Stop
docker-compose down

# Rebuild
docker-compose up --build

# View logs
docker-compose logs -f

# Restart
docker-compose restart
```

---

## 💻 NPM Commands

```bash
# Install
npm install

# Dev mode
npm run dev

# Production build
npm run build

# Run production
npm start
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `README_FIRST.md` | **START HERE** |
| `DOCKER_QUICKSTART.md` | 30-sec Docker guide |
| `DOCKER.md` | Full Docker docs |
| `README.md` | Complete docs |
| `Dockerfile` | Container config |
| `docker-compose.yml` | Docker setup |
| `start.bat` | Windows launcher |
| `start.sh` | Mac/Linux launcher |

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | Change port in docker-compose.yml |
| Docker not running | Start Docker Desktop |
| Permission denied | Linux: `sudo usermod -aG docker $USER` |
| Can't connect | Check firewall settings |

---

## 📊 Data Storage

- **Location**: Browser localStorage
- **Persistence**: Per browser/device
- **Reset**: Clear browser cache
- **Export**: Not yet implemented (future feature)

---

## 🎨 Customization

| What | Where |
|------|-------|
| Colors | `tailwind.config.js` |
| Fonts | `app/layout.tsx` |
| Food database | `lib/utils.ts` |
| Components | `components/` folder |

---

## 🚢 Deployment

### Docker Hub
```bash
docker tag fitfuel-ai user/fitfuel-ai
docker push user/fitfuel-ai
```

### Vercel
```bash
git push origin main
# Auto-deploys from GitHub
```

### Cloud Run
```bash
gcloud builds submit --tag gcr.io/PROJECT/fitfuel-ai
gcloud run deploy --image gcr.io/PROJECT/fitfuel-ai
```

---

## 📞 Getting Help

1. Check `README_FIRST.md`
2. See specific guide (DOCKER.md, SETUP.md)
3. Check README.md for details
4. Review error messages in logs

---

## ✨ Quick Tips

- 💡 First time? Use Docker!
- 🔄 Data resets when you clear browser cache
- 🎯 Set goals first for accurate tracking
- 📸 Try the food scanner with example images
- 💪 Track water intake daily

---

**Port Reference**: 3000 (default) | Change in docker-compose.yml
**Build Time**: ~2-3 minutes first time | ~30 seconds rebuilds
**Container Size**: ~150MB optimized

---

Print this page for quick reference! 📄
