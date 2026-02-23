# CRM & Pipeline — CLAUDE.md

## Tu gères le pipeline commercial. Chaque lead doit être tracké de bout en bout.

## Statuts du pipeline
```
NOUVEAU → CONTACTÉ → RÉPONDU → DÉMO_BOOKÉE → DÉMO_FAITE → PILOTE → PAYANT → CHURNED
                                                                    ↓
                                                              PAS_MAINTENANT (relance 30j)
                                                                    ↓
                                                              NON (archivé)
```

## Fichier pipeline principal (80-crm/pipeline.csv)
```csv
id,date_creation,nom,prenom_decideur,telephone,email,ville,vertical,score,source,statut,date_premier_contact,canal_premier_contact,date_derniere_action,prochaine_action,date_prochaine_action,nb_touchpoints,demo_bookee_date,demo_faite_date,pilote_debut,pilote_fin,plan_choisi,mrr,notes
```

## Fichier clients actifs (80-crm/clients.csv)
```csv
id,nom,prenom_decideur,telephone,email,ville,vertical,plan,mrr,date_signature,date_go_live,nb_appels_mois,nb_rdv_crees_mois,satisfaction_score,referral_demande(oui/non),referral_obtenu,notes
```

## Règles de gestion pipeline
1. **Chaque lead contacté doit être dans le pipeline.** Pas d'exception.
2. **Mise à jour après chaque interaction.** Date + action + résultat.
3. **Alerte automatique si aucune action depuis 3 jours** sur un lead RÉPONDU ou DÉMO_BOOKÉE.
4. **Les "PAS_MAINTENANT" sont recontactés à J+30** avec un nouveau trigger.
5. **Les "NON" sont archivés** mais gardés (possible réactivation à 6 mois).
6. **Chaque client payant reçoit une demande de referral à J+14.**

## Notion comme CRM (si utilisé)

### Database "Pipeline AVA"
| Propriété | Type | Options |
|-----------|------|---------|
| Nom | Title | — |
| Décisionnaire | Text | — |
| Téléphone | Phone | — |
| Email | Email | — |
| Ville | Select | Paris, Lyon, Marseille, Toulouse, Bordeaux, Nantes |
| Vertical | Select | Formation, Auto-écoles, Artisans, Éducation K-12, Santé, Immobilier, Hôtellerie, Concessionnaires |
| Score | Number | 0-100 |
| Statut | Select | Nouveau, Contacté, Répondu, Démo bookée, Démo faite, Pilote, Payant, Pas maintenant, Non |
| Source | Select | Google Maps, LinkedIn, Referral, Inbound, Partenaire, Cold Email, WhatsApp |
| Prochaine action | Text | — |
| Date prochaine action | Date | — |
| MRR | Number | € |
| Notes | Text | — |

### Database "Clients AVA"
| Propriété | Type |
|-----------|------|
| Nom | Title |
| Plan | Select (Starter/Pro/Business/Enterprise) |
| MRR | Number |
| Date go-live | Date |
| Appels/mois | Number |
| RDV créés/mois | Number |
| NPS | Number |
| Referral obtenu | Checkbox |

## Revue pipeline (chaque lundi matin, 15 min)
1. Combien de leads dans chaque statut ?
2. Quels leads sont "bloqués" (>3 jours sans action) ?
3. Quelles démos sont prévues cette semaine ?
4. Quels pilotes se terminent cette semaine ?
5. Quel MRR cible pour la fin de semaine ?
