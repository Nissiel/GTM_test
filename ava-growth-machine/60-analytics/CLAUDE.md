# Analytics — CLAUDE.md

## Tu génères les rapports hebdomadaires et suis les KPIs. Sois factuel, pas optimiste.

## KPIs HEBDOMADAIRES (revue chaque dimanche soir)

### Pipeline
| KPI | Cible S1-S2 | Cible S3-S4 | Alarme si |
|-----|-------------|-------------|-----------|
| Leads bruts scrappés | 500/sem | 300/sem | < 200 |
| Leads scorés ≥ 70 | 100/sem | 80/sem | < 50 |
| Leads contactés (tous canaux) | 300/sem | 500/sem | < 200 |
| Emails envoyés | 200/sem | 400/sem | < 150 |
| Appels passés (humain + AVA) | 100/sem | 200/sem | < 70 |
| LinkedIn DMs | 50/sem | 70/sem | < 30 |

### Conversion
| KPI | Cible | Alarme si |
|-----|-------|-----------|
| Taux d'ouverture email | 40-60% | < 30% |
| Taux de réponse email | 3-5% | < 2% |
| Taux de réponse LinkedIn | 15-25% | < 10% |
| Démos bookées / semaine | 5-8 | < 3 |
| Taux de show démo | 70%+ | < 50% |
| Taux de close (démo → client) | 20-30% | < 15% |

### Revenue
| KPI | Cible M1 | Cible M2 | Cible M3 |
|-----|----------|----------|----------|
| Clients payants cumulés | 5-10 | 20-30 | 40-60 |
| MRR | €1,000-4,000 | €4,000-10,000 | €10,000-25,000 |
| Churn mensuel | 0% (trop tôt) | <10% | <5% |
| NPS clients | 8+/10 | 8+/10 | 8+/10 |

### Pilotes
| KPI | Cible |
|-----|-------|
| Pilotes actifs | 5-10 |
| Conversion pilote → payant | 50-70% |
| Time-to-value (setup → premier appel capturé) | <48h |

## RAPPORT HEBDOMADAIRE (template)

```markdown
# Rapport Semaine [N] — AVA AI Growth

## Résumé
- Leads contactés : [X]
- Démos bookées : [X]
- Démos réalisées : [X]
- Pilotes lancés : [X]
- Clients signés : [X]
- MRR actuel : €[X]

## Ce qui a marché
- [Tactique/canal qui a le mieux performé]
- [Message/objet email avec le meilleur taux de réponse]

## Ce qui n'a pas marché
- [Ce qui a sous-performé et pourquoi]

## Ajustements pour la semaine prochaine
- [Action 1]
- [Action 2]
- [Action 3]

## Pipeline
- Leads chauds (réponse positive, en attente de démo) : [X]
- Démos planifiées semaine prochaine : [X]
- Pilotes en cours : [X]
- Prospects "pas maintenant" à recontacter dans 30j : [X]

## Blockers
- [Ce qui bloque la progression]
```

## EXPÉRIENCES A/B EN COURS (experiments.md)

Format pour chaque test :
```
TEST #[N] : [Nom du test]
Hypothèse : [Si on fait X, alors Y parce que Z]
Variable testée : [objet email / accroche / CTA / séquence / timing]
Volume : [X envois par variante]
Durée : [X jours]
Résultat : [En cours / Variante A gagne / Variante B gagne]
Action : [Ce qu'on implémente]
```

## Dashboards à maintenir
1. **Pipeline tracker** → 80-crm/pipeline.csv
2. **Email performance** → 30-outreach/cold-email/logs/
3. **WhatsApp logs** → 30-outreach/whatsapp/logs.csv
4. **LinkedIn tracker** → 30-outreach/linkedin/logs.csv
5. **Client health** → 80-crm/clients.csv
