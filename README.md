# Shadow Operator

Strategic Business Planning & Brand Analysis Software

## Overview

Shadow Operator is a comprehensive software platform designed to help entrepreneurs and business owners launch and grow their Shadow Operating businesses. The platform provides:

- **14-Day Strategic Plan**: A complete A-to-Z roadmap for launching your business, with daily tasks, milestones, and resources.
- **Brand Analysis Tools**: Powerful tools for market research, competitor analysis, customer personas, positioning, and more.

## Features

### Public Pages
- **Homepage**: Showcase of features, benefits, and pricing
- **Shadow Operator**: Overview of the 14-day strategic plan
- **Brand Analysis**: Overview of market research tools
- **Pricing**: $99/month subscription with full access
- **Contact**: Get in touch form

### Dashboard (Protected)
- **Overview**: Progress tracking and quick actions
- **Shadow Operator**: Interactive 14-day plan with task tracking
- **Brand Analysis**: Suite of analysis tools including:
  - Competitor Analysis
  - Customer Personas
  - Market Positioning
  - Opportunity Finder
  - SWOT Analysis
  - Performance Metrics

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google provider
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your credentials:
   ```
   AUTH_SECRET=your-secret-key
   AUTH_GOOGLE_ID=your-google-client-id
   AUTH_GOOGLE_SECRET=your-google-client-secret
   ```

4. Set up the database:
   ```bash
   npm run db:push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/auth/         # NextAuth API routes
│   ├── brand-analysis/   # Brand analysis public page
│   ├── contact/          # Contact page
│   ├── dashboard/        # Protected dashboard area
│   │   ├── brand-analysis/
│   │   └── shadow-operator/
│   ├── pricing/          # Pricing page
│   ├── shadow-operator/  # Shadow Operator public page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── Header.tsx        # Navigation header
│   └── Footer.tsx        # Site footer
├── lib/
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Utility functions
├── auth.ts               # NextAuth configuration
└── auth.config.ts        # Auth providers config
```

## License

ISC
