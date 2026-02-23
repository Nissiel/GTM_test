# Automation — CLAUDE.md (Master)

## Ce dossier contient tous les prompts, workflows, et configurations pour automatiser la machine.

## Architecture d'automatisation

```
ENTRÉE : Ville + Vertical
    │
    ├─→ 20-sourcing/ : Scraping Google Maps → leads_raw.csv
    │
    ├─→ 90-automation/prompts/lead_scoring.md : Score chaque lead → leads_scored.csv
    │
    ├─→ 90-automation/prompts/signal_detection.md : Détecte signaux d'achat
    │
    ├─→ 90-automation/prompts/personalization.md : Génère emails personnalisés
    │
    ├─→ 30-outreach/ : Envoi via Instantly/Apollo/LinkedIn
    │
    ├─→ 90-automation/prompts/reply_classifier.md : Classifie les réponses
    │
    ├─→ 90-automation/prompts/followup_generator.md : Génère les follow-ups
    │
    └─→ 60-analytics/ : Rapport hebdomadaire
```

## MCP Servers à connecter

### Priorité 1 (indispensable)
| MCP Server | Usage | Comment connecter |
|-----------|-------|-------------------|
| Notion MCP | CRM léger, pipeline, calendrier éditorial | `notion://` — déjà connecté dans Claude.ai |
| Google Drive | Stockage docs, case studies, rapports | Connecteur Claude.ai |
| Gmail | Envoi/réception emails, suivi réponses | Connecteur Claude.ai |
| Google Calendar | Booking démos, suivi RDV | Connecteur Claude.ai |

### Priorité 2 (scale)
| MCP Server | Usage | Comment connecter |
|-----------|-------|-------------------|
| n8n MCP | Orchestration workflows automatisés | github.com/czlonkowski/n8n-mcp |
| Firecrawl MCP | Web scraping, extraction données, monitoring | firecrawl.dev |
| Supabase MCP | Database leads, CRM, analytics | Déjà connecté |

### Priorité 3 (optimisation)
| MCP Server | Usage |
|-----------|-------|
| LinkedIn MCP | Scraping profils (attention aux TOS) |
| Slack/Discord MCP | Notifications internes |
| Vercel MCP | Landing pages, outils gratuits |

## Outils SaaS à connecter (hors MCP)
| Outil | Usage | Budget |
|-------|-------|--------|
| Instantly.ai | Cold email + warmup | €30-39/mois |
| Apollo.io | Database leads + séquences | €49/mois |
| Apify | Google Maps scraper | €0-49/mois |
| Dropcontact | Enrichissement email (France) | €24-49/mois |
| Cal.com | Booking démos | Gratuit |
| Loom | Vidéos personnalisées | Gratuit |
| Canva | Visuels, one-pagers, case studies | Connecteur Claude.ai |

## Budget total stack : €150-250/mois
