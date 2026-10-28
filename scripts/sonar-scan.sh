#!/usr/bin/env bash
#
# Runs a SonarCloud analysis of the current branch from your machine.
# One-time setup: _notes/development.md (Code quality). In short:
#   - Turn off Automatic Analysis, or SonarCloud rejects this scan:
#       https://sonarcloud.io/project/analysis_method?id=hammayo_hammayo.github.io
#   - Put SONAR_TOKEN in .env.local (create one at https://sonarcloud.io/account/security)
#
# Usage: bash scripts/sonar-scan.sh
# The scan is published to SonarCloud under the current git branch name, never as `main`.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# Read only SONAR_TOKEN from .env.local (sourcing the whole file would also run its other lines).
if [[ -z "${SONAR_TOKEN:-}" && -f .env.local ]]; then
  SONAR_TOKEN="$(grep -m1 '^SONAR_TOKEN=' .env.local | cut -d= -f2- | tr -d "\"'")"
fi
: "${SONAR_TOKEN:?Set SONAR_TOKEN in .env.local or the environment (SonarCloud: My Account, Security)}"
export SONAR_TOKEN

BRANCH="$(git branch --show-current)"
: "${BRANCH:?Detached HEAD: check out a branch first}"
[[ "$BRANCH" == "main" ]] && { echo "Refusing to publish a local scan as main; use a branch." >&2; exit 1; }

# Project settings live in sonar-project.properties. The scanner is pinned and downloads its own
# JRE, so no local Java is needed. Keep the version in step with .github/workflows/sonarcloud.yml.
bunx @sonar/scan@5.0.2 -Dsonar.branch.name="$BRANCH"
