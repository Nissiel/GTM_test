# 🧬 AVA AI — GROWTH MACHINE

## Setup en 5 minutes

### 1. Copie ce repo entier dans ton workspace Claude Code
```bash
cp -r ava-growth-machine/ ~/projects/ava-growth-machine/
cd ~/projects/ava-growth-machine/
```

### 2. Configure les connecteurs MCP (dans Claude.ai Settings)
- [x] Notion → CRM pipeline + calendrier éditorial
- [x] Google Drive → Stockage docs
- [x] Gmail → Envoi/réception
- [x] Google Calendar → Booking démos
- [x] Canva → Visuels, one-pagers
- [x] Supabase → Database leads (optionnel, pour scale)
- [x] Vercel → Landing pages (optionnel)

### 3. Configure les outils externes
- [ ] Instantly.ai → 3 domaines email secondaires + warmup (LANCER IMMÉDIATEMENT)
- [ ] Apollo.io → Import CSV leads
- [ ] Apify → Google Maps Scraper (créer un compte gratuit)
- [ ] Dropcontact → Enrichissement emails français
- [ ] Cal.com → Page de booking démos (gratuit)
- [ ] Loom → Vidéos personnalisées (gratuit)

### 4. Configure la démo AVA AI
⚠️ CRITIQUE : RIEN NE FONCTIONNE SANS ÇA
- [ ] Démo visio prête (écran partagé, AVA en action)
- [ ] Script démo configuré (voir /40-demos/CLAUDE.md)
- [ ] Testé 10 fois en interne
- [ ] Lien de booking Cal.com / Calendly actif
- [ ] Réponse AVA < 2 secondes

### 5. Prépare le case study Gift Education
⚠️ PRIORITÉ #1 avant tout outreach
- [ ] Appeler Gift Education
- [ ] Extraire : taux de réponse avant/après, RDV bookés, temps économisé
- [ ] Écrire le one-pager (format dans /40-demos/CLAUDE.md)
- [ ] Obtenir un témoignage citation

---

## 🗓️ PLAN DE BATAILLE 30 JOURS

### SEMAINE 0 (maintenant, avant de lancer)
| Action | Statut | Deadline |
|--------|--------|----------|
| Configurer démo visio + tester | ⬜ | J0 |
| Quantifier case study Gift Education | ⬜ | J0 |
| Acheter 3 domaines email secondaires | ⬜ | J0 |
| Créer comptes Instantly + Apollo + Apify | ⬜ | J0 |
| Lancer warmup email (2-3 semaines) | ⬜ | J0 |
| Créer page Cal.com pour booking démos | ⬜ | J0 |
| Choisir vertical #1 (santé OU éducation) | ⬜ | J0 |

### SEMAINE 1 — Sourcing + Outreach (pendant que les emails chauffent)
| Jour | Action | Volume |
|------|--------|--------|
| Lun | Scraper Google Maps — Paris + Lyon (vertical choisi) | 500 leads |
| Lun | Scorer les leads → top 100 | 100 leads scorés |
| Mar | LinkedIn — connection requests aux décisionnaires (top 30, score ≥ 85) | 30 requests |
| Mar | Emails personnalisés manuels aux top leads | 20 emails |
| Mer | LinkedIn — connection requests suite | 20 requests |
| Mer | WhatsApp aux leads avec mobile identifié (score ≥ 80) | 15 messages |
| Jeu | Scraper Google Maps — Marseille + Toulouse | 400 leads |
| Jeu | Scorer + emails personnalisés | 20 emails |
| Ven | Missed Call Audits sur top 20 leads | 20 audits |
| Ven | Envoyer audits par email personnalisé | 20 emails manuels |
| WE | Préparer séquences email pour semaine 2 | — |

**Objectif S1 :** 5 démos bookées, 900 leads scrappés, warmup email en cours

### SEMAINE 2 — Volume outbound (emails + LinkedIn + WhatsApp)
| Jour | Action | Volume |
|------|--------|--------|
| Lun | Lancer séquence email V1 (si warmup OK) | 100-200 emails |
| Lun | LinkedIn DMs (connexions acceptées S1) | 15 DMs |
| Mar | Scraper nouvelles villes (Bordeaux, Nantes) | 400 leads |
| Mar | Emails personnalisés + LinkedIn suite | 50 emails + 10 DMs |
| Mer | WhatsApp aux leads score ≥ 80 sans réponse email | 20 messages |
| Mer | Poster 1er contenu LinkedIn (chiffre choc) | 1 post |
| Jeu | Follow-up email 2 (J+3 sur batch 1) | Auto via Instantly |
| Jeu | Vidéos Loom personnalisées (top 10 prospects chauds) | 10 vidéos |
| Ven | Emails batch 2 + LinkedIn suite | 100 emails + 10 DMs |

**Objectif S2 :** 10-15 démos bookées total, 500+ contacts outreach

### SEMAINE 3 — Démos + Conversion
| Jour | Action | Volume |
|------|--------|--------|
| Lun-Ven | Réaliser les démos (2-3/jour) | 10-15 démos |
| Lun-Ven | Continuer outreach (moitié volume) | 200 emails + LinkedIn + WhatsApp |
| Lun-Ven | LinkedIn contenu quotidien | 5 posts |
| Lun | Follow-up post-démo J+1 | Tous |
| Mer | Follow-up post-démo J+3 | Tous |
| Ven | Identifier les 5 prospects les plus chauds | 5 prospects |
| Ven | Proposer pilotes 14 jours | 5 propositions |

**Objectif S3 :** 5-10 pilotes lancés, premières installations

### SEMAINE 4 — Close + Systématisation
| Jour | Action | Volume |
|------|--------|--------|
| Lun | Revue des pilotes en cours (métriques) | Tous |
| Mar | Contacter les pilotes satisfaits → conversion (email/visio) | 5-10 contacts |
| Mer | Écrire 2 mini case studies (1 page chacun) | 2 |
| Jeu | Lancer prospection 2ème vertical OU 2ème vague villes | 500 leads |
| Ven | Demander referrals à chaque client/pilote satisfait | Tous |
| Ven | Contacter 5 agences marketing pour exploration partenariat | 5 |
| WE | Documenter le playbook (ce qui marche, ce qui ne marche pas) | 1 doc |

**Objectif S4 :** 5-10 clients payants OU 10 pilotes actifs, MRR €1,000-4,000

---

## Commandes Claude Code

Quand tu travailles dans ce repo, tu peux utiliser ces commandes :

```
"Source moi 500 leads dentistes à Lyon"
→ Claude lit /20-sourcing/google-maps/CLAUDE.md + /10-icp/sante/CLAUDE.md
→ Génère les requêtes Google Maps
→ Structure le CSV

"Score ces leads"
→ Claude lit /90-automation/prompts/lead_scoring.md
→ Score chaque lead du CSV
→ Génère leads_scored.csv

"Génère la séquence email pour ce lead : [données]"
→ Claude lit /30-outreach/cold-email/CLAUDE.md + /90-automation/prompts/personalization.md
→ Génère les 3 emails personnalisés

"Écris un post LinkedIn sur les appels manqués"
→ Claude lit /50-content/CLAUDE.md
→ Génère un post avec hook + chiffre + CTA

"Rapport hebdo"
→ Claude lit /60-analytics/CLAUDE.md
→ Compile les données des logs
→ Génère le rapport

"Objection : c'est trop cher"
→ Claude lit /00-foundations/objections.md
→ Retourne la battle card correspondante

"Calcule le ROI pour un cabinet dentaire avec 30 appels/jour"
→ Claude lit /00-foundations/roi-calculator.md
→ Génère le calcul personnalisé
```

---

## Structure complète du repo
```
ava-growth-machine/
├── README.md              ← CE FICHIER
├── CLAUDE.md              ← CERVEAU PRINCIPAL (lire en premier)
│
├── 00-foundations/
│   ├── positioning.md     ← Positionnement, offres, pricing
│   ├── objections.md      ← Battle cards (10 objections + réponses)
│   └── roi-calculator.md  ← Templates calcul ROI par vertical
│
├── 10-icp/
│   ├── sante/CLAUDE.md    ← Ciblage santé/dentaire/esthétique
│   ├── education/CLAUDE.md ← Ciblage éducation privée
│   └── immo/CLAUDE.md     ← Ciblage immobilier
│
├── 20-sourcing/
│   ├── google-maps/CLAUDE.md  ← Workflow scraping + scoring
│   ├── signals/CLAUDE.md      ← Détection signaux d'achat
│   └── directories/           ← Annuaires complémentaires
│
├── 30-outreach/
│   ├── cold-email/CLAUDE.md   ← 3 séquences email prêtes
│   ├── cold-call/CLAUDE.md    ← ⚠️ PAS de cold call (voir fichier)
│   ├── linkedin/CLAUDE.md     ← Séquence LinkedIn 4 étapes
│   └── whatsapp/CLAUDE.md     ← Séquence WhatsApp 3 messages
│
├── 40-demos/
│   └── CLAUDE.md              ← Script démo 7 min + follow-up + case studies
│
├── 50-content/
│   └── CLAUDE.md              ← Content engine : LinkedIn, vidéos, blog, hooks
│
├── 60-analytics/
│   └── CLAUDE.md              ← KPIs, rapport hebdo, expériences A/B
│
├── 70-partnerships/
│   └── CLAUDE.md              ← Programme agences/revendeurs
│
├── 80-crm/
│   └── CLAUDE.md              ← Pipeline, tracking, templates Notion
│
└── 90-automation/
    ├── CLAUDE.md              ← Architecture globale + MCP + outils
    └── prompts/
        ├── lead_scoring.md    ← Prompt scoring leads (JSON)
        ├── personalization.md ← Prompt personnalisation outreach
        └── reply_classifier.md ← Prompt classification réponses + follow-ups
```

---

## La règle d'or

**Volume > Perfection.**

1,500-2,000 contacts → 45-100 réponses → 15-50 démos → 5-10 clients.

Chaque jour sans outreach = des clients qui signent chez un concurrent.

**Lance. Mesure. Ajuste. Répète.**
