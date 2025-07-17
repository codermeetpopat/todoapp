# Render Deployment Guide

## Prerequisites
- GitHub repository with your code
- Render account (free tier available)
- MongoDB database (MongoDB Atlas recommended)

## Step 1: Prepare Your Repository

1. Make sure all changes are committed and pushed to GitHub
2. Ensure your `render.yaml` file is in the root directory
3. Verify your `package.json` has the correct build scripts

## Step 2: Deploy to Render

### Option A: Deploy via GitHub (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository: `codermeetpopat/todoapp`
5. Configure the service:
   - **Name**: `todoapp-new`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Option B: Deploy via render.yaml

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Select your repository: `codermeetpopat/todoapp`
5. Render will automatically detect the `render.yaml` file

## Step 3: Set Environment Variables

Add these environment variables in Render:

- `NODE_ENV`: `production`
- `PORT`: `10000` (Render will set this automatically)
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong secret key
- `JWT_EXPIRES_IN`: `7d`

## Step 4: Database Setup

### MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier available)
3. Create a database user
4. Get your connection string
5. Add the connection string to `MONGODB_URI` in Render

## Step 5: Custom Domain (Optional)

1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Expected Result

After deployment:
- Your app will be available at: `https://todoapp-new.onrender.com`
- API endpoints will be available at: `https://todoapp-new.onrender.com/api/*`
- API status check: `https://todoapp-new.onrender.com/api/status`

## Troubleshooting

### Common Issues:
1. **Build fails**: Check that all dependencies are in `package.json`
2. **App doesn't start**: Verify `NODE_ENV=production` is set
3. **Database connection fails**: Check MongoDB URI and network access
4. **Client assets not loading**: Ensure build command completed successfully

### Logs:
- Check deployment logs in Render dashboard
- Monitor runtime logs for errors
- Use `console.log` statements for debugging

## Health Check

The app includes a health check endpoint at `/api/status` that returns:
```json
{
  "message": "Todo API is running successfully!",
  "status": "healthy",
  "timestamp": "2025-07-17T14:40:48.000Z"
}
```
