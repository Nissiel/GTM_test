# Workflows n8n — Documentation

## Workflow #1 : Pipeline Lead Gen Automatisée (hebdomadaire)

```
TRIGGER : Chaque lundi 8h00

1. [Apify Node] → Scrape Google Maps
   Input : requête + ville (depuis variable)
   Output : JSON leads bruts
   ↓
2. [Google Sheets Node] → Stocker leads bruts
   Append to leads_raw sheet
   ↓
3. [Dropcontact Node] → Enrichir emails
   Input : nom + entreprise + ville
   Output : email professionnel
   ↓
4. [AI Node (Claude)] → Scorer chaque lead
   Prompt : /90-automation/prompts/lead_scoring.md
   Input : données lead enrichies
   Output : score + pitch_angle + personnalisation
   ↓
5. [Filter Node] → Score ≥ 70 uniquement
   ↓
6. [Branch Node]
   ├── Score ≥ 85 → [Instantly.ai Node] → Séquence email prioritaire + LinkedIn DM
   └── Score 70-84 → [Instantly.ai Node] → Ajouter à séquence email standard
   ↓
7. [Slack/Email Notification] → Résumé au fondateur
   "X leads scrappés, Y scorés ≥70, Z ajoutés à séquence, W appelés par AVA"
```

## Workflow #2 : Missed Call Audit Automatisé

```
TRIGGER : Manuel ou batch quotidien

1. [Input] → Liste de numéros à auditer
   ↓
2. [AVA AI Call Node] → Appeler le numéro (3 fois : 10h, 13h, 17h)
   ↓
3. [Logger Node] → Documenter résultat chaque appel
   {heure, répondu(oui/non), temps_attente, messagerie(oui/non)}
   ↓
4. [AI Node (Claude)] → Générer rapport personnalisé
   Input : résultats audit + données lead
   Output : rapport PDF/email avec calcul ROI
   ↓
5. [Email Node] → Envoyer le rapport au prospect
   Template : missed call audit report
   ↓
6. [CRM Update] → Mettre à jour le pipeline
   Statut → "audit_envoyé"
   Prochaine action → "follow-up J+2"
```

## Workflow #3 : Reply Monitoring & Classification

```
TRIGGER : Toutes les 30 minutes

1. [Gmail/Instantly Node] → Vérifier nouvelles réponses
   ↓
2. [AI Node (Claude)] → Classifier la réponse
   Prompt : /90-automation/prompts/reply_classifier.md
   Output : intent + next_step + réponse_suggérée
   ↓
3. [Branch Node]
   ├── intent = "interesse" → [Slack Alert URGENT] + [Calendly Link Auto-send]
   ├── intent = "question" → [Draft réponse] → [Queue pour review humain]
   ├── intent = "pas_maintenant" → [CRM] → statut "nurture_30j"
   ├── intent = "non" → [Auto-réponse polie] → [CRM] → statut "archivé"
   └── intent = "colere" → [Auto-réponse excuse] → [CRM] → statut "blacklist"
   ↓
4. [CRM Update] → Pipeline mis à jour automatiquement
```

## Workflow #4 : Content Publishing (LinkedIn)

```
TRIGGER : Chaque jour 8h30 (heure optimale LinkedIn France)

1. [Google Sheets Node] → Lire calendrier éditorial
   Ligne du jour : type_post + sujet + hook
   ↓
2. [AI Node (Claude)] → Générer le post complet
   Input : type + sujet + hook + guidelines de /50-content/CLAUDE.md
   Output : post LinkedIn formaté
   ↓
3. [Approval Node] → Envoyer au fondateur pour validation (Slack/email)
   ↓
4. [Si approuvé] → [LinkedIn API / Buffer / Hootsuite] → Publier
   ↓
5. [Analytics Node] → Logger : date, type, sujet, impressions (à J+7)
```

## Variables d'environnement n8n

```
APIFY_API_KEY=xxx
INSTANTLY_API_KEY=xxx
APOLLO_API_KEY=xxx
DROPCONTACT_API_KEY=xxx
OPENAI_API_KEY=xxx (pour les nodes AI)
ANTHROPIC_API_KEY=xxx (pour Claude)
AVA_AI_API_KEY=xxx
SLACK_WEBHOOK_URL=xxx
GMAIL_CREDENTIALS=xxx
```

## Priorité d'implémentation
1. Workflow #3 (Reply Monitoring) → le plus urgent, ne rien rater
2. Workflow #1 (Lead Gen) → automatiser le sourcing
3. Workflow #2 (Missed Call Audit) → arme de conversion
4. Workflow #4 (Content) → automatiser quand le contenu est validé manuellement
