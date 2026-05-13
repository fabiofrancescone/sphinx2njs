#!/bin/bash

set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

docker build \
  -f containers/Dockerfile.dita \
  -t local/dita-ot \
  "$ROOT_DIR"

docker run --rm \
  -v "$ROOT_DIR:/workspace" \
  local/dita-ot \
  dita --input=/workspace/dita/user-guide.ditamap --format=html5 --verbose
