# 🚀 Render Deployment Guide

## Quick Setup Steps

### 1. **Prepare Your Code**
- ✅ All files are ready for deployment
- ✅ Environment variables configured
- ✅ Build scripts set up

### 2. **Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Connect your GitHub account

### 3. **Deploy Backend (Web Service)**

#### Create Web Service:
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ground-truth-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

#### Set Environment Variables:
```
NODE_ENV=production
PORT=10000
```

#### Upload Firebase Service Account:
1. In Render dashboard → Your service → Environment
2. Upload your `firebase.json` file
3. The backend will automatically use it

### 4. **Deploy Frontend (Static Site)**

#### Create Static Site:
1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ground-truth-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: `Free`

#### Set Environment Variables:
```
REACT_APP_API_URL=https://YOUR-BACKEND-NAME.onrender.com
```
*(Replace YOUR-BACKEND-NAME with your actual backend service name)*

### 5. **Update Frontend API URL**
After backend deploys, update frontend environment variable:
1. Go to frontend service → Environment
2. Update `REACT_APP_API_URL` with your backend URL
3. Redeploy frontend

## 🔧 **Important Notes:**

### **Free Tier Limitations:**
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- 750 hours/month limit (usually enough for development)

### **Firebase Setup:**
- Your Firebase service account file is already configured
- Make sure to upload `firebase.json` to Render environment
- Firestore will work seamlessly

### **Custom Domain (Optional):**
- Available on paid plans
- Can use your own domain name
- HTTPS included automatically

## 🎯 **Deployment URLs:**
- **Frontend**: `https://ground-truth-frontend.onrender.com`
- **Backend**: `https://ground-truth-backend.onrender.com`
- **API**: `https://ground-truth-backend.onrender.com/api`

## 🔄 **Auto-Deploy:**
- Both services auto-deploy on git push
- Monitor deployments in Render dashboard
- Check logs for any issues

## 🛠️ **Troubleshooting:**

### **Backend Issues:**
- Check environment variables are set
- Verify Firebase service account uploaded
- Check build logs for errors

### **Frontend Issues:**
- Ensure `REACT_APP_API_URL` points to backend
- Check build command completed successfully
- Verify all dependencies installed

### **Database Issues:**
- Firebase/Firestore should work without changes
- Check service account permissions
- Verify Firebase project is active

## 📱 **Testing Your Deployment:**
1. Visit your frontend URL
2. Try creating a course in training mode
3. Test the map functionality
4. Export CSV to verify backend connection
5. Check dark mode and all features

Your app should work exactly like localhost! 🎉
