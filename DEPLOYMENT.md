# Deployment Guide for Render

## Frontend Deployment on Render

This guide will help you deploy the frontend application to Render.

### Prerequisites
- A Render account (sign up at https://render.com)
- Your backend API deployed (or the backend URL you'll use)

### Step 1: Prepare Your Repository
1. Make sure all your changes are committed and pushed to your Git repository (GitHub, GitLab, or Bitbucket)

### Step 2: Deploy on Render

#### Option A: Using render.yaml (Recommended)
1. Go to your Render dashboard
2. Click "New +" and select "Static Site"
3. Connect your repository
4. Render will automatically detect the `render.yaml` file
5. Configure the following:
   - **Name**: catalyst-bench-frontend (or your preferred name)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

#### Option B: Manual Configuration
1. Go to your Render dashboard
2. Click "New +" and select "Static Site"
3. Connect your repository
4. Configure:
   - **Name**: catalyst-bench-frontend
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

### Step 3: Set Environment Variables
In the Render dashboard, go to your static site's settings and add:

- **Key**: `VITE_API_URL`
- **Value**: `https://group3-xrxh.onrender.com/api`

**Note**: The `/api` suffix is included because your API routes are mounted at `/api`.

### Step 4: Deploy
Click "Create Static Site" and Render will:
1. Install dependencies
2. Build your application
3. Deploy it to a public URL

### Environment Variables

The frontend uses the following environment variable:
- `VITE_API_URL`: The base URL for your backend API
  - Local development: `http://localhost:5000/api`
  - Production: `https://group3-xrxh.onrender.com/api`

### Notes
- The build process uses Vite, which outputs to `frontend/dist`
- Environment variables prefixed with `VITE_` are available in the frontend code
- After deployment, your site will be available at a URL like: `https://catalyst-bench-frontend.onrender.com`

### Troubleshooting
- If the build fails, check the build logs in Render
- Ensure your backend CORS settings allow requests from your Render frontend URL
- Verify that `VITE_API_URL` is set correctly in the Render environment variables

