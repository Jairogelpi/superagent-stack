#!/usr/bin/env bash
set -euo pipefail
docker compose -f compose/docker-compose.yml pull || true
docker compose -f compose/docker-compose.yml up -d
