# PVS Promoters

Full-stack Next.js website for PVS Promoters — projects, admin panel, contact forms, and newsletter.

## Requirements

- Node.js 20+
- MongoDB Atlas cluster

## Development

```bash
npm install
cp .env.example .env   # set MONGO_URI to your Atlas connection string
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin).

## Database (MongoDB Atlas only)

All projects, inquiries, newsletter subscribers, and admin data are stored in MongoDB Atlas.

Set in `.env`:

```env
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/pvs_promoters?appName=Cluster0
NEXT_PUBLIC_SITE_URL=https://pvs-promoters.com
NODE_ENV=production
JWT_SECRET=<long-random-string>
```

Seed projects into Atlas:

```bash
npm run seed
```

## Docker

```powershell
docker compose up -d --build
```

Uses `.env` for `MONGO_URI` (Atlas). No local MongoDB container is required.

### Publish to Docker Hub

```powershell
docker build -t sunilbalaji2004/pvs-promoters:latest .
docker push sunilbalaji2004/pvs-promoters:latest
```

Image: [sunilbalaji2004/pvs-promoters](https://hub.docker.com/r/sunilbalaji2004/pvs-promoters)

Production (Docker Hub image + Atlas):

```powershell
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

Set the same `MONGO_URI` Atlas connection string in your host environment or `.env` on the server.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run seed` | Seed MongoDB Atlas with projects |
