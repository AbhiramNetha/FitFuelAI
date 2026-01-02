# 🐳 Docker Quick Start - FitFuel AI

## ⚡ Super Quick Start (30 Seconds!)

### Windows
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Extract `fitfuel-ai.zip`
3. Double-click `start.bat`
4. Open http://localhost:3000

### macOS
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Extract `fitfuel-ai.zip`
3. Run `./start.sh` in Terminal
4. Open http://localhost:3000

### Linux
1. Install Docker:
   ```bash
   sudo apt-get update
   sudo apt-get install docker.io docker-compose
   ```
2. Extract and run:
   ```bash
   cd fitfuel-ai
   docker-compose up
   ```
3. Open http://localhost:3000

---

## 🎯 Common Commands

### Start the App
```bash
docker-compose up
```

### Start in Background
```bash
docker-compose up -d
```

### Stop the App
```bash
docker-compose down
```

### Rebuild After Changes
```bash
docker-compose up --build
```

### View Logs
```bash
docker-compose logs -f
```

---

## 🔍 Troubleshooting

### "Port 3000 already in use"
Edit `docker-compose.yml` and change:
```yaml
ports:
  - "8080:3000"  # Use port 8080 instead
```

### "Cannot connect to Docker daemon"
- **Windows/Mac**: Start Docker Desktop
- **Linux**: `sudo systemctl start docker`

### "Permission denied"
**Linux only:**
```bash
sudo usermod -aG docker $USER
# Then log out and back in
```

---

## ✨ Benefits of Docker

✅ **No Node.js needed** - Just Docker!
✅ **No dependencies** - Everything in the container
✅ **Same everywhere** - Works identically on all systems
✅ **Isolated** - Doesn't mess with your system
✅ **Easy to share** - Send the image to anyone
✅ **Production-ready** - Same container for dev and prod

---

## 📚 Need More Help?

See the complete guide: [DOCKER.md](DOCKER.md)

---

**That's it! Enjoy FitFuel AI! 🎉**
