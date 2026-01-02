# 🐳 Docker Setup Guide - FitFuel AI

Run FitFuel AI in a Docker container without installing Node.js or any dependencies!

## 📋 Prerequisites

**Only Docker is required!**

### Install Docker

#### Windows
1. Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. Run the installer
3. Restart your computer
4. Docker Desktop will start automatically

#### macOS
1. Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
2. Drag Docker.app to Applications
3. Launch Docker from Applications
4. Wait for Docker to start

#### Linux (Ubuntu/Debian)
```bash
# Update package index
sudo apt-get update

# Install Docker
sudo apt-get install docker.io docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (optional - avoid using sudo)
sudo usermod -aG docker $USER
# Log out and back in for this to take effect
```

#### Verify Installation
```bash
docker --version
docker-compose --version
```

---

## 🚀 Quick Start (2 Methods)

### Method 1: Using Docker Compose (Recommended)

**Step 1:** Extract and navigate
```bash
unzip fitfuel-ai.zip
cd fitfuel-ai
```

**Step 2:** Build and run
```bash
docker-compose up --build
```

**Step 3:** Open browser
```
http://localhost:3000
```

That's it! 🎉

**To stop:**
```bash
# Press Ctrl+C in the terminal
# Or in a new terminal:
docker-compose down
```

---

### Method 2: Using Docker Commands

**Step 1:** Extract and navigate
```bash
unzip fitfuel-ai.zip
cd fitfuel-ai
```

**Step 2:** Build the image
```bash
docker build -t fitfuel-ai .
```

**Step 3:** Run the container
```bash
docker run -p 3000:3000 --name fitfuel-ai-app fitfuel-ai
```

**Step 4:** Open browser
```
http://localhost:3000
```

**To stop:**
```bash
docker stop fitfuel-ai-app
docker rm fitfuel-ai-app
```

---

## 🔧 Docker Commands Reference

### Building

```bash
# Build the Docker image
docker build -t fitfuel-ai .

# Build with no cache (fresh build)
docker build --no-cache -t fitfuel-ai .
```

### Running

```bash
# Run in foreground
docker run -p 3000:3000 fitfuel-ai

# Run in background (detached)
docker run -d -p 3000:3000 --name fitfuel-ai-app fitfuel-ai

# Run with custom port (e.g., 8080)
docker run -p 8080:3000 fitfuel-ai
```

### Managing Containers

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop fitfuel-ai-app

# Start a stopped container
docker start fitfuel-ai-app

# Restart a container
docker restart fitfuel-ai-app

# Remove a container
docker rm fitfuel-ai-app

# Remove a running container (force)
docker rm -f fitfuel-ai-app
```

### Managing Images

```bash
# List all images
docker images

# Remove an image
docker rmi fitfuel-ai

# Remove unused images
docker image prune
```

### Docker Compose Commands

```bash
# Build and start services
docker-compose up --build

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# Rebuild services
docker-compose build

# Restart services
docker-compose restart
```

---

## 📊 Container Details

### Image Information
- **Base Image:** `node:18-alpine`
- **Image Size:** ~150MB (optimized)
- **Build Type:** Multi-stage (production-optimized)
- **Runtime User:** Non-root (secure)

### Container Specs
- **Port:** 3000 (configurable)
- **Environment:** Production
- **Network:** Bridge (isolated)
- **Health Check:** Enabled
- **Auto Restart:** Unless stopped

---

## 🌐 Accessing the Application

### Local Access
```
http://localhost:3000
```

### Network Access (from other devices)
```
http://YOUR_IP_ADDRESS:3000

# Find your IP:
# Windows: ipconfig
# macOS/Linux: ifconfig or ip addr show
```

### Custom Port
If port 3000 is busy, use a different port:

**Docker Run:**
```bash
docker run -p 8080:3000 fitfuel-ai
# Access at: http://localhost:8080
```

**Docker Compose:**
Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Change 8080 to your preferred port
```

---

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Find what's using port 3000
# Linux/macOS:
lsof -i :3000

# Windows:
netstat -ano | findstr :3000

# Use a different port:
docker run -p 8080:3000 fitfuel-ai
```

### Container Won't Start
```bash
# Check container logs
docker logs fitfuel-ai-app

# Or with docker-compose:
docker-compose logs
```

### Permission Denied (Linux)
```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Or run with sudo:
sudo docker-compose up
```

### Build Fails
```bash
# Clean build with no cache
docker-compose build --no-cache

# Or:
docker build --no-cache -t fitfuel-ai .
```

### Cannot Connect to Docker Daemon
```bash
# Start Docker service (Linux)
sudo systemctl start docker

# Check Docker Desktop is running (Windows/macOS)
```

---

## 💾 Data Persistence

### Current Setup
- Data is stored in browser's localStorage
- Data persists as long as browser cache is not cleared
- Each browser/device has its own data

### Adding Volume for Data (Optional)
To persist data across container restarts, you can add a volume:

Edit `docker-compose.yml`:
```yaml
services:
  fitfuel-ai:
    # ... existing config ...
    volumes:
      - ./data:/app/data
```

---

## 🚀 Production Deployment

### Docker Hub (Share Your Image)
```bash
# Login to Docker Hub
docker login

# Tag your image
docker tag fitfuel-ai yourusername/fitfuel-ai:latest

# Push to Docker Hub
docker push yourusername/fitfuel-ai:latest

# Others can pull and run:
docker pull yourusername/fitfuel-ai:latest
docker run -p 3000:3000 yourusername/fitfuel-ai:latest
```

### Deploy to Cloud

#### AWS ECS
```bash
# Push to Amazon ECR
# Follow AWS ECS documentation
```

#### Google Cloud Run
```bash
# Push to Google Container Registry
# Follow Google Cloud Run documentation
```

#### Azure Container Instances
```bash
# Push to Azure Container Registry
# Follow Azure documentation
```

#### DigitalOcean App Platform
```bash
# Connect your GitHub repo
# DigitalOcean will build and deploy automatically
```

---

## 🎯 Performance Optimization

### Multi-Stage Build Benefits
✅ Smaller image size (~150MB vs 1GB+)
✅ Faster deployment
✅ Better security (no dev dependencies)
✅ Optimized for production

### Image Layers
The Dockerfile uses caching to speed up builds:
- Dependencies are cached if package.json doesn't change
- Source code changes don't require dependency reinstall

---

## 🔒 Security Features

✅ **Non-root user:** Container runs as 'nextjs' user
✅ **Alpine base:** Minimal attack surface
✅ **Production mode:** No dev dependencies
✅ **Health checks:** Automatic container monitoring
✅ **Isolated network:** Bridge network isolation

---

## 📈 Monitoring

### View Container Stats
```bash
# Real-time stats
docker stats fitfuel-ai-app

# Container details
docker inspect fitfuel-ai-app

# Health status
docker inspect --format='{{.State.Health.Status}}' fitfuel-ai-app
```

### View Logs
```bash
# All logs
docker logs fitfuel-ai-app

# Follow logs (real-time)
docker logs -f fitfuel-ai-app

# Last 100 lines
docker logs --tail 100 fitfuel-ai-app
```

---

## 🎓 Docker Benefits for FitFuel AI

1. **No Node.js Required** - Just install Docker
2. **Consistent Environment** - Works the same everywhere
3. **Easy Deployment** - One command to run
4. **Isolated** - Doesn't affect your system
5. **Portable** - Share with anyone via Docker Hub
6. **Scalable** - Easy to run multiple instances
7. **Cloud Ready** - Deploy anywhere

---

## 🆘 Getting Help

### Check Application Health
```bash
# Inside container
docker exec fitfuel-ai-app wget -q --spider http://localhost:3000

# Should return nothing if healthy
```

### Interactive Shell
```bash
# Access container shell
docker exec -it fitfuel-ai-app sh

# Navigate and explore
ls -la
pwd
exit
```

### Restart Everything
```bash
# Nuclear option - fresh start
docker-compose down
docker-compose up --build --force-recreate
```

---

## ✨ Summary

**To run FitFuel AI with Docker:**

```bash
# One-time setup
unzip fitfuel-ai.zip
cd fitfuel-ai

# Every time you want to run it
docker-compose up

# Open browser at http://localhost:3000
# Press Ctrl+C to stop
```

That's it! No Node.js, no npm, no dependencies to install. Just Docker! 🐳

---

**Need help?** Check the main README.md or create an issue on GitHub.
