#!/bin/sh
set -e

mkdir -p /app/public/uploads/projects /app/data
chown -R nextjs:nodejs /app/public/uploads /app/data

exec su-exec nextjs "$@"
