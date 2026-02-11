# 🚀 Alchemy Connect - Deployment Guide

This project has been migrated to use **Supabase** for Backend-as-a-Service (BaaS), making it ready for production deployment on platforms like Vercel, Netlify, or Railway.

## 1. Supabase Setup (Prerequisite)

1.  **Create a New Project**: Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Run migrations**:
    *   Open the **SQL Editor** in your Supabase dashboard.
    *   Copy and paste the contents of `supabase_schema.sql` (located in the project root) and click **Run**.
    *   This will create your `profiles`, `missions`, `proposals`, and `events` tables with seed data.
3.  **Get API Keys**:
    *   Go to **Project Settings** > **API**.
    *   Copy the `Project URL` and `anon public` key.

## 2. Environment Variables

Update your `.env.local` (for local development) and add these to your deployment platform's environment variable settings:

| Variable | Description |
| :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Anon/Public Key |
| `VITE_GEMINI_API_KEY` | Your Google Gemini API Key |

## 3. Local Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

## 4. Deployment to Vercel (Recommended)

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in the 프로젝트 root.
3.  Follow the prompts. When asked for environment variables, add the ones listed above.
4.  Your app will be live on a production URL!

## 5. Deployment to Netlify

1.  Connect your GitHub repository to Netlify.
2.  Set the Build Command to `npm run build`.
3.  Set the Publish Directory to `dist`.
4.  Add your environment variables in the Netlify dashboard under **Site settings** > **Environment variables**.

---
**Note**: The local `backend/server.js` (Express/SQLite) is now deprecated and no longer needed for the main application to function.
