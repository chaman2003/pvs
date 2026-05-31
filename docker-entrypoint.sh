#!/bin/sh
set -e

mkdir -p /app/public/uploads/projects
chown -R nextjs:nodejs /app/public/uploads

exec su-exec nextjs "$@"
