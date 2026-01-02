# 🚀 FitFuel AI - Quick Setup Guide

## Step-by-Step Installation

### 1. Prerequisites Check
Make sure you have the following installed:
- Node.js version 18.x or higher
- npm (comes with Node.js) or yarn

To check your versions:
```bash
node --version
npm --version
```

### 2. Extract and Navigate
```bash
# Extract the zip file
unzip fitfuel-ai.zip

# Navigate to the project directory
cd fitfuel-ai
```

### 3. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

This will install:
- Next.js (React framework)
- Framer Motion (animations)
- Recharts (charts)
- Tailwind CSS (styling)
- Lucide React (icons)
- TypeScript types

### 4. Start Development Server
```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

### 5. Open in Browser
Open your browser and navigate to:
```
http://localhost:3000
```

You should see the FitFuel AI dashboard!

## 🎯 First Steps

1. **Explore the Dashboard**: View the main metrics and charts
2. **Scan Food**: Try the AI food recognition feature
3. **Set Goals**: Configure your weight and nutrition goals
4. **View Meal Plans**: Get AI-powered meal suggestions
5. **Read Health Tips**: Check personalized nutrition advice

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Common Issues

### Port Already in Use
If port 3000 is busy, the dev server will automatically use port 3001, 3002, etc.

### Module Not Found
Run `npm install` again to ensure all dependencies are installed.

### TypeScript Errors
The project uses TypeScript. Make sure your IDE supports it (VS Code recommended).

## 📱 Mobile Testing

The app is fully responsive. To test on mobile:
1. Get your local IP address (e.g., 192.168.1.100)
2. Start dev server
3. Open `http://YOUR_IP:3000` on your phone

## 🎨 Customization Tips

### Change Colors
Edit `tailwind.config.js` to modify the color scheme.

### Add More Foods
Edit `lib/utils.ts` and add to `FOOD_DATABASE`.

### Modify Layout
Components are in the `components/` folder.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 💡 Need Help?

Check the main README.md for detailed documentation.

---

Enjoy using FitFuel AI! 🎉
