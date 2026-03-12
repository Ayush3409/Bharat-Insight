# Quick Start Guide

## Setup

1. Install dependencies:
   npm install

2. Create .env file:
   Copy .env.example to .env and add your Gemini API key

3. Run development server:
   npm run dev

4. Open http://localhost:3000

## Project Overview

- Landing Page: Modern dark mode with animations
- Dashboard: /dashboard route with data grid and AI panel
- Command Palette: Press Cmd+K (or Ctrl+K) anywhere

## Next Steps

1. Get Gemini API key from https://makersuite.google.com/app/apikey
2. Add to .env as NEXT_PUBLIC_GEMINI_API_KEY
3. Replace mock data in app/api/data/route.ts with real data.gov.in data
4. Deploy to Vercel

## Features Implemented

✅ Landing page with Hero, Bento Grid, Features, CTA
✅ Dashboard with virtualized data grid
✅ Multi-tenant department switching
✅ AI panel with Gemini streaming
✅ Command palette (Cmd+K)
✅ Role-based access control
✅ Skeleton loaders
✅ Responsive design
✅ TypeScript throughout
