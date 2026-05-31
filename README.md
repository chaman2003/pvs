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

Pull and run on any server (with MongoDB via compose):

```powershell
docker compose pull
docker compose up -d
```

App: [http://localhost:3000](http://localhost:3000)

Seed the database (from your machine while MongoDB is running in Docker):

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
