# PVS Promoters

> **Your Lifelong Realtor** — Premium coco farmland near Bangalore & Hosur since 2009.

A production-grade, full-stack real estate website built with **Next.js 15**, **TypeScript**, **MongoDB Atlas**, and **Tailwind CSS 4**. Features project listings, image galleries, YouTube video integration, admin panel, contact forms, and newsletter management.

[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

## Features

- **Project Listings** — Rich property cards with image galleries, pricing, amenities, YouTube videos, and progress tracking
- **Admin Panel** — Secure JWT-authenticated dashboard to manage projects, view inquiries, and handle newsletter subscribers
- **Contact & Inquiries** — Fully functional contact form backed by MongoDB with admin-side status tracking
- **Newsletter** — Email subscription management with active/inactive status control
- **SEO Optimised** — Per-page Open Graph metadata, sitemap, robots.txt, and structured data
- **Docker Ready** — Dockerfile and Compose files for local dev and production deployment

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19 + Tailwind CSS 4 |
| Database | MongoDB Atlas via Mongoose |
| Auth | JWT (jose) |
| Images | Next.js Image + Sharp |
| Containerisation | Docker + Docker Compose |

## Project Structure

```
app/
├── (public)        # Home, About, Projects, Services, Contact
├── admin/          # JWT-protected admin dashboard
└── api/            # REST endpoints (projects, inquiries, newsletter)
components/
├── sections/       # Page-level section components
├── ui/             # Reusable UI primitives
├── forms/          # Contact & newsletter forms
├── admin/          # Admin-only components
└── motion/         # Animation wrappers
lib/
├── models/         # Mongoose schemas (Project, Inquiry, Newsletter)
├── db/             # Atlas connection utility
├── auth/           # JWT helpers
└── site-config.ts  # Global site constants
scripts/            # Seed, asset download, image processing
```

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas cluster (free tier works)

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# → set MONGO_URI to your Atlas connection string

# 3. Seed the database with sample projects
npm run seed

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### Environment Variables

```env
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/pvs_promoters?appName=Cluster0
NEXT_PUBLIC_SITE_URL=https://pvs-promoters.com
NODE_ENV=production
JWT_SECRET=<long-random-string>
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run seed` | Seed MongoDB Atlas with project data |
| `npm run lint` | Lint codebase |

## Docker

```bash
# Development
docker compose up -d --build

# Production (pulls from Docker Hub)
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

No local MongoDB container needed — all data lives in MongoDB Atlas.

### Docker Hub Image

```bash
docker pull sunilbalaji2004/pvs-promoters:latest
```

## Deployment

The app is deployable on any Node.js-compatible host.

- **Docker** — use `docker-compose.prod.yml` with your Atlas URI in the environment
- **Vercel / Render** — standard Next.js deployment; `render.yaml` is included for Render
- **Self-hosted** — `npm run build && npm start`

## Pages

| Route | Description |
|---|---|
| `/` | Hero, featured projects, testimonials |
| `/about` | Company history, team, values |
| `/projects` | Full project catalogue |
| `/projects/[slug]` | Individual project detail |
| `/services` | Services offered |
| `/contact` | Contact form |
| `/admin` | Admin dashboard (auth required) |

## About PVS Promoters

PVS Promoters has been in the real estate business since **2009**, specialising in managed **coco (coconut) farmland** in the Bangalore–Hosur corridor. The company offers gated community farmland with clear titles, world-class amenities, and end-to-end support for buyers.

- **Location:** Hosur, Tamil Nadu 635109
- **Phone:** +91 96007 95354
- **Email:** pvscivilconstruction@gmail.com
- **Website:** [pvs-promoters.com](https://pvs-promoters.com)

---

## License

Private project — all rights reserved.
