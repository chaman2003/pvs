# PVS Promoters

Full-stack Next.js website for PVS Promoters — projects, admin panel, contact forms, and newsletter.

## Requirements

- Node.js 20+
- MongoDB (local or Docker)

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin).

## Production

```bash
npm run build
npm start
```

## Docker

Enable BuildKit for faster cached rebuilds (recommended on Windows PowerShell):

```powershell
$env:DOCKER_BUILDKIT = "1"
$env:COMPOSE_DOCKER_CLI_BUILD = "1"
docker compose up --build -d
```

Subsequent builds reuse npm and Next.js cache layers and are much faster when only app code changes.

### Publish to Docker Hub

```powershell
docker build -t sunilbalaji2004/pvs-promoters:latest .
docker push sunilbalaji2004/pvs-promoters:latest
```

Image: [sunilbalaji2004/pvs-promoters](https://hub.docker.com/r/sunilbalaji2004/pvs-promoters)

Pull and run on any server (**web + MongoDB required**):

```powershell
# Copy docker-compose.prod.yml and .env to your server, then:
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

**Important:** Deploying only `sunilbalaji2004/pvs-promoters:latest` with `MONGO_URI=mongodb://mongodb:27017/...` does **not** work. The hostname `mongodb` is the MongoDB service in compose — it does not exist when you run a single web container.

| Deploy type | What to do |
|-------------|------------|
| VPS with Docker Compose | Use `docker-compose.prod.yml` (web + mongo) |
| Single-container platform | Use [MongoDB Atlas](https://www.mongodb.com/atlas) and set `MONGO_URI=mongodb+srv://...` |
| Local dev | `docker compose up -d` (full stack) |

Set in `.env` on production:

```env
MONGO_URI=mongodb://mongodb:27017/pvs_promoters
NEXT_PUBLIC_SITE_URL=https://pvs-promoters.com
NODE_ENV=production
JWT_SECRET=<long-random-string>
```

App: [http://localhost:3000](http://localhost:3000)

Seed the database after first Docker start:

```powershell
# Seeds the MongoDB container used by docker compose (recommended)
docker run --rm --network pvs_default -v "${PWD}:/app" -w /app -e MONGO_URI=mongodb://mongodb:27017/pvs_promoters node:20-alpine sh -c "npm ci && npx tsx scripts/seed-db.ts"
```

For local dev without Docker (MongoDB on localhost):

```bash
MONGO_URI=mongodb://127.0.0.1:27017/pvs_promoters npm run seed
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run seed` | Seed MongoDB with projects |
| `npm run download-assets` | Download images from pvspromoters.com |
