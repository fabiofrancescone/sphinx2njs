#!/bin/bash
set -e

ROOT_DIR="$(git rev-parse --show-toplevel)"

docker build \
  -f "$ROOT_DIR/containers/Dockerfile.dita" \
  -t local/dita-ot \
  "$ROOT_DIR"

docker run --rm \
  -v "$ROOT_DIR:/workspace" \
  local/dita-ot \
  dita -i /workspace/content/dita/user-guide.ditamap -f html5 --verbose
