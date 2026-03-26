#!/usr/bin/env bash
set -euo pipefail
ARCHIVE=${1:?Uso: ./scripts/restore.sh <archivo.tar.gz>}
tar -xzf "$ARCHIVE"
