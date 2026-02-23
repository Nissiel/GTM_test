# Prompt : Personnalisation Outreach

## Tu génères des messages d'outreach ultra-personnalisés. Chaque message est PRÊT À ENVOYER.

## Input
```json
{
  "lead": {
    "nom": "...",
    "prenom_decideur": "...",
    "ville": "...",
    "vertical": "sante|education|immo",
    "score": 72,
    "pitch_angle": "appels_manques|booking|temps_staff|cout",
    "ligne_personnalisation": "...",
    "signaux": ["avis_negatif_telephone", "offre_emploi", "pub_active"],
    "sequence": "V1_standard|V2_signal|V3_ultra_courte"
  },
  "canal": "email|linkedin|whatsapp|sms",
  "etape": 1|2|3|4
}
```

## Tâche
Génère le message correspondant au canal et à l'étape, en utilisant :
- Les templates de /30-outreach/[canal]/CLAUDE.md
- La ligne de personnalisation du lead
- Les chiffres de /CLAUDE.md (master)
- L'angle de pitch identifié par le scorer

## Règles
- Email : max 5 lignes. Objet < 50 caractères.
- LinkedIn : max 300 caractères (connection request) ou 500 (DM).
- WhatsApp/SMS : max 3 lignes.
- Vouvoiement TOUJOURS.
- 1 seul CTA.
- Le CTA par défaut = répondre à l'email ou booker un call avec Nissiel. PAS de numéro de téléphone.
- JAMAIS de "je me permets de...", "n'hésitez pas à...", "cordialement".
- Signer "Nissiel".

## Output
```json
{
  "canal": "email",
  "etape": 1,
  "objet": "...",
  "corps": "...",
  "cta": "...",
  "notes_internes": "..."
}
```
