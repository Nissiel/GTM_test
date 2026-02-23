# AVA GTM — Machine de Guerre Go-To-Market

## Mission

Plateforme GTM autonome qui scrape, enrichit, et contacte des leads B2B en France.
Zero coût. Zero intervention manuelle. La machine tourne seule.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATEFORME GTM AVA                        │
│                                                              │
│  ┌──────────┐   ┌───────────┐   ┌──────────┐   ┌────────┐  │
│  │ Scraper  │──→│ Enrichir  │──→│ Campagne │──→│ Suivi  │  │
│  │ Google   │   │ Emails    │   │ Instantly │   │ Stats  │  │
│  │ Maps     │   │ (sites)   │   │ (envoi)  │   │ (live) │  │
│  └──────────┘   └───────────┘   └──────────┘   └────────┘  │
│       │               │               │               │     │
│       └───────────────┴───────────────┴───────────────┘     │
│                    Pipeline Autonome (cron)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Fichier |
|-------|-----------|---------|
| Frontend | Next.js 15 + React 19 + Tailwind 4 | `src/` |
| Scraping Google Maps | Python 3 (gratuit, maison) | `scripts/google_maps_scraper.py` |
| Email enrichment | Python 3 async (aiohttp + BS4) | `scripts/email_scraper.py` |
| Upload campagne | Python 3 (Instantly API v2) | `scripts/instantly_uploader.py` |
| Dashboard update | Python 3 → data.ts | `scripts/update_dashboard_data.py` |
| Orchestration | Bash + cron | `scripts/run_pipeline.sh` |
| Hosting | Vercel (auto-deploy on push) | `vercel.json` |
| Git | GitHub (avafirstai/GTM_test) | `.git` |

---

## Fichiers Critiques

### Scripts (pipeline automatisé)
| Fichier | But | Dépendances |
|---------|-----|-------------|
| `scripts/google_maps_scraper.py` | Scrape Google Maps sans Apify | aiohttp, beautifulsoup4 |
| `scripts/email_scraper.py` | Extraire emails des sites web | aiohttp, beautifulsoup4 |
| `scripts/instantly_uploader.py` | Upload leads dans Instantly | urllib (stdlib) |
| `scripts/update_dashboard_data.py` | Sync stats → dashboard | csv, json (stdlib) |
| `scripts/run_pipeline.sh` | Orchestre tout le pipeline | bash |
| `scripts/requirements.txt` | Dépendances Python | pip |

### Frontend (plateforme)
| Fichier | But |
|---------|-----|
| `src/app/page.tsx` | Dashboard home — KPIs + pipeline |
| `src/app/launch/page.tsx` | Interface lancement campagne |
| `src/app/leads/page.tsx` | Base de leads avec filtres |
| `src/components/` | Composants réutilisables |
| `src/lib/data.ts` | Données dashboard (auto-généré) |
| `src/lib/verticales.ts` | 25+ verticales avec scoring ROI |

---

## Credentials (JAMAIS dans le code — .env only)

```bash
# Apify (scraping Google Maps — backup)
APIFY_TOKEN=apify_api_...

# Instantly (campagnes email)
INSTANTLY_BEARER=MWNk...

# GitHub (auto-deploy)
GITHUB_TOKEN=ghp_...
```

> Note: Les tokens sont actuellement en dur dans les scripts Python.
> Phase future: migrer vers .env + python-dotenv.

---

## Pipeline Autonome

### Flux complet
```
1. google_maps_scraper.py   → Scrape leads depuis Google Maps (gratuit)
2. email_scraper.py         → Visite les sites web, extrait emails (68% success)
3. instantly_uploader.py    → Upload dans Instantly par verticale
4. update_dashboard_data.py → Met à jour src/lib/data.ts
5. git push                 → Vercel auto-deploy
```

### Cron (quotidien 6h)
```bash
0 6 * * * cd /Users/nissielberrebi/Desktop/GTM_test && ./scripts/run_pipeline.sh >> scripts/pipeline.log 2>&1
```

---

## Verticales (25+ secteurs analysés)

### Tier 1 — ROI Maximum
- Cabinets Dentaires (score 97.5)
- Cabinets Médicaux (score 97)
- Agences Immobilières (score 96)
- Cabinets d'Avocats (score 94.5)
- Formation/Éducation (score 92.5)

### Tier 2 — High Potential
- Salons Beauté, Vétérinaires, Restauration haut de gamme
- Auto-écoles, Plombiers/Électriciens, Assurances

---

## URLs

| Service | URL |
|---------|-----|
| Dashboard (prod) | https://gtm-test-ava-firsts-projects.vercel.app |
| GitHub repo | https://github.com/avafirstai/GTM_test |
| Instantly | https://app.instantly.ai |
| Cal.com | https://cal.com/avafirstai/15min |

---

## Convention de Code

### Python (scripts/)
- Type hints partout
- Docstrings sur chaque fonction
- `sys.stdout.flush()` après chaque print de progression
- Gestion d'erreurs robuste (try/except autour de chaque requête HTTP)
- Pas de `Any` — utiliser `dict[str, object]` ou types spécifiques

### TypeScript (src/)
- Strict mode
- Interfaces pour toutes les données
- Server Components par défaut
- Client Components uniquement si interactivité nécessaire ('use client')
- Import paths avec @/ alias

### Git
- Branches: `main` (production, auto-deploy)
- Commits: `feat:`, `fix:`, `chore:` prefix
- Ne JAMAIS push de credentials

---

## Règles Absolues

1. **Gratuit** — Aucun outil payant. Tout est fait maison ou open-source.
2. **Autonome** — Le pipeline tourne seul via cron. Aucune intervention humaine.
3. **Robuste** — Timeouts, retries, error handling sur chaque requête HTTP.
4. **Pas de PII dans les logs** — Emails/phones jamais dans les messages d'erreur.
5. **Dashboard live** — Chaque run du pipeline met à jour le site automatiquement.
