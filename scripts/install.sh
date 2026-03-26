#!/usr/bin/env bash
set -euo pipefail
cp -n .env.example .env || true
docker compose -f compose/docker-compose.yml up -d
