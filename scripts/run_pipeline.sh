#!/bin/bash
# ============================================================
# AVA GTM — Pipeline Orchestrator
# Runs the full GTM machine: scrape → enrich → upload → deploy
#
# Usage:
#   ./scripts/run_pipeline.sh           # Full pipeline
#   ./scripts/run_pipeline.sh --test    # Test mode (20 leads)
#
# Cron (daily at 6am):
#   0 6 * * * cd /Users/nissielberrebi/Desktop/GTM_test && ./scripts/run_pipeline.sh >> scripts/pipeline.log 2>&1
# ============================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# Load environment variables from .env if it exists
if [ -f "$PROJECT_DIR/.env" ]; then
    set -a
    source "$PROJECT_DIR/.env"
    set +a
fi

TEST_FLAG=""
if [[ "${1:-}" == "--test" ]]; then
    TEST_FLAG="--test 20"
    echo "🧪 TEST MODE — 20 leads only"
fi

echo ""
echo "============================================================"
echo "  AVA GTM — PIPELINE START"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================================"
echo ""

# Step 1: Email scraping
echo "━━━ STEP 1/4: Email Scraper ━━━"
python3 scripts/email_scraper.py $TEST_FLAG
echo ""

# Step 2: Upload to Instantly
echo "━━━ STEP 2/4: Instantly Upload ━━━"
python3 scripts/instantly_uploader.py $TEST_FLAG
echo ""

# Step 3: Update dashboard data
echo "━━━ STEP 3/4: Dashboard Update ━━━"
python3 scripts/update_dashboard_data.py
echo ""

# Step 4: Git push + Vercel auto-deploy
echo "━━━ STEP 4/4: Git Push + Deploy ━━━"
if git diff --quiet src/lib/data.ts 2>/dev/null; then
    echo "  No changes to data.ts — skipping git push"
else
    git add src/lib/data.ts scripts/enrichment-stats.json scripts/upload-stats.json 2>/dev/null || true
    git commit -m "chore: auto-update dashboard data $(date '+%Y-%m-%d %H:%M')" 2>/dev/null || echo "  Nothing to commit"
    git push origin main 2>/dev/null || echo "  Push failed — check git credentials"
    echo "  Pushed to GitHub → Vercel will auto-deploy"
fi

echo ""
echo "============================================================"
echo "  AVA GTM — PIPELINE COMPLETE"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================================"
echo ""
echo "  Next auto-run: tomorrow 6:00 AM"
echo "  Dashboard: https://gtm-test-ava-firsts-projects.vercel.app"
echo ""
