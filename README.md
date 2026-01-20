# Mita Agency Website

A modern marketing agency website built with Next.js, Prisma, and PostgreSQL.

## Features

- **CMS Dashboard**: Manage content for team members, services, portfolio projects, blog posts, and contact submissions
- **NextAuth Authentication**: Secure admin access with Google OAuth
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Content Types**:
  - Team Members
  - Services
  - Portfolio Projects
  - Blog Posts
  - Contact Submissions

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Database**
   - Create a PostgreSQL database
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your database connection string

3. **Configure Authentication**
   - Get Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
   - Add `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` to `.env`
   - Generate a secret for `AUTH_SECRET` (you can use `openssl rand -base64 32`)

4. **Initialize Database**
   ```bash
   npm run db:push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Site**
   - Website: http://localhost:3000
   - Dashboard: http://localhost:3000/dashboard

## Project Structure

```
src/
├── app/
│   ├── (public pages)
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── blog/
│   │   ├── team/
│   │   └── contact/
│   ├── dashboard/       # CMS admin panel
│   └── api/            # API routes
├── lib/                # Utilities and database client
└── components/         # Reusable components

prisma/
└── schema.prisma      # Database schema
```

## Database Schema

- **User**: Admin users with NextAuth
- **TeamMember**: Agency team members
- **Service**: Services offered
- **Project**: Portfolio projects
- **BlogPost**: Blog articles
- **ContactSubmission**: Contact form submissions

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run db:studio`: Open Prisma Studio
- `npm run db:push`: Push schema changes to database

## Tech Stack

- **Framework**: Next.js 16
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth v5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **TypeScript**: Full type safety

## License

ISC
