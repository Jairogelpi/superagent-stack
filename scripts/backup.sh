#!/usr/bin/env bash
set -euo pipefail
tar -czf backup-$(date +%F-%H%M%S).tar.gz knowledge workflows configs .env 2>/dev/null || true
