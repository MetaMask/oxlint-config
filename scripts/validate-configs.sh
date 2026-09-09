#!/usr/bin/env bash

set -euo pipefail

# `oxlint --print-config` validates the config and prints it as JSON if valid.
# If valid, we extract the "rules" section and save it to a snapshot file.
if config="$(oxlint --print-config 2>&1)"; then
  echo "$config" | jq '.rules' | oxfmt --stdin-filepath rules-snapshot.json > rules-snapshot.json
else
  echo "$config"
  exit 1
fi
