# Cold Email — CLAUDE.md

## Tu gères les séquences email. Chaque email doit être PRÊT À ENVOYER.

## Règles absolues
1. Max 5 lignes par email. Les PME ne lisent pas les pavés.
2. 1 seul CTA par email. Toujours.
3. Objet < 50 caractères. Pas de majuscules, pas de ponctuation excessive.
4. Pas de "Bonjour, je me permets de..." — commence direct.
5. Vouvoiement. Toujours.
6. Le CTA = répondre à l'email ou booker un call avec Nissiel. PAS de numéro de téléphone.
7. Personnalisation obligatoire (nom, ville, type d'établissement, signal détecté).
8. Jamais de pièce jointe dans le premier email.
9. Reply-to = email personnel du fondateur, pas un noreply.

## Stack technique
| Outil | Rôle | Config |
|-------|------|--------|
| Instantly.ai | Envoi + warmup + rotation inbox | 3 domaines min, 3 emails/domaine |
| Apollo.io | Base de données backup + séquences | Import CSV custom |
| Dropcontact / Hunter.io | Trouver emails pro | Enrichissement pré-envoi |

## ⚠️ WARMUP OBLIGATOIRE
- Nouveaux domaines : 2-3 semaines de warmup AVANT tout envoi en volume
- Domaines secondaires recommandés : ava-ai.fr, getava.fr, ava-calls.fr (NE PAS utiliser le domaine principal)
- Volume progressif : 10/jour → 20/jour → 50/jour → 100/jour (augmenter chaque semaine)

## SÉQUENCE V1 — STANDARD (3 emails)

### Email 1 — Le constat (J0)
```
Objet : {nom_etablissement} — appels manqués ?

{Prénom},

Les {type_etablissement} manquent en moyenne 30% de leurs appels. 75% de ces appelants ne rappellent jamais.

Pour un {type} comme {nom_etablissement}, ça peut représenter {estimation_perte}€ de revenus perdus par an.

{ligne_personnalisation}

On a un assistant IA qui répond 24/7, en français, et prend les RDV dans votre agenda.

Voulez-vous voir une démo de 5 min ? Je vous montre sur votre cas précis.

Nissiel
```

### Email 2 — La preuve (J+3)
```
Objet : Re: {nom_etablissement} — appels manqués ?

{Prénom},

Rapide suivi. Gift Education a récupéré 23 inscriptions et 92,000€ de revenus en 90 jours avec notre assistant — simplement en répondant aux appels que personne ne prenait.

Le setup prend 48h. Rien de technique de votre côté.

Voulez-vous que je vous montre en 5 min comment ça marche pour un {type} comme le vôtre ?

Nissiel
```

### Email 3 — La clôture (J+7)
```
Objet : dernière question

{Prénom},

Si les appels manqués ne sont pas un sujet pour vous, je ne relancerai pas.

Sinon, j'ai un court rapport sur le nombre d'appels que les {type_etablissement} comme {nom} manquent en moyenne, et combien ça coûte.

Voulez-vous que je vous l'envoie ?

Nissiel
```

## SÉQUENCE V2 — SIGNAL DÉTECTÉ (4 emails, plus agressive)

### Email 1 — Signal direct (J0)
```
Objet : {signal_détecté}

{Prénom},

{accroche_signal}

C'est un problème classique — et exactement ce qu'on résout. Notre assistant IA répond à 100% des appels, 24/7, et prend les rendez-vous automatiquement.

Voulez-vous voir une démo de 5 min adaptée à votre cas ?

Nissiel
```

**Accroches signal par type :**
- **Avis négatif téléphone :** "J'ai lu un avis récent sur votre page Google où un patient/parent/client mentionne avoir eu du mal à vous joindre par téléphone."
- **Offre d'emploi :** "J'ai vu que vous cherchez un(e) {poste}. Avant de recruter, est-ce que ça vaut le coup de voir si une IA peut gérer 80% de vos appels pour une fraction du coût ?"
- **Pub active :** "Vous investissez en publicité pour attirer des {patients/familles/clients}. Est-ce que 100% des appels générés sont répondus ?"

### Email 2 — Preuve (J+2)
[Même structure que V1 Email 2]

### Email 3 — Missed Call Audit (J+5)
```
Objet : test rapide

{Prénom},

On a essayé d'appeler {nom_etablissement} à 3 moments différents cette semaine.

Résultat : {X} appels sur 3 sans réponse.

En moyenne, chaque appel manqué = {montant}€ de revenus perdus (première année).

Ce n'est pas une critique — c'est un problème universel. Mais c'est résolvable en 48h.

Voulez-vous que je vous montre comment en 5 min ?

Nissiel
```

### Email 4 — Clôture (J+9)
[Même structure que V1 Email 3]

## SÉQUENCE V3 — ULTRA-COURTE (pour les profils très occupés)

### Email 1 (J0)
```
Objet : question rapide

{Prénom},

Combien d'appels manquez-vous par semaine à {nom_etablissement} ?

On a un truc qui règle ça en 48h. Répondez à cet email et je vous montre en 5 min.

Nissiel
```

### Email 2 (J+4)
```
Objet : 30 secondes

{Prénom}, un seul truc à faire : répondez "oui" à cet email.

Je vous montre en 5 min comment ça marche sur votre cas.

Si ça parle, on avance. Sinon, pas de relance.

Nissiel
```

## ACCROCHES PAR VERTICAL (à injecter dans les séquences)

### Formation (écoles post-bac + CPF)
- **Accroche standard :** "Pendant les périodes d'inscription, les écoles post-bac manquent 35 à 50% de leurs appels. À {frais}€/an de frais de scolarité, chaque appel manqué peut être une inscription perdue."
- **Accroche signal (pub) :** "Vous investissez en salons et en Google Ads pour attirer des étudiants. Est-ce que 100% des appels générés sont répondus quand votre équipe est en cours ?"
- **Accroche CPF :** "Un prospect CPF qui vous appelle a DÉJÀ son financement. S'il tombe sur la messagerie, il appelle le centre de formation suivant. À {valeur}€ par formation, ça fait mal."
- **Case study angle :** "Gift Education a récupéré 23 inscriptions et 92,000€ en 90 jours avec notre assistant."
- **Estimation perte :** "€80,000–250,000/an en inscriptions perdues" (benchmark écoles 300+ étudiants)

### Auto-écoles
- **Accroche standard :** "Les auto-écoles manquent en moyenne 35% de leurs appels. Avec {nb_concurrents} concurrents à moins de 2 km, l'élève appelle le suivant."
- **Accroche signal (avis) :** "Un de vos élèves mentionne sur Google avoir eu du mal à vous joindre par téléphone. C'est le problème #1 des auto-écoles."
- **Accroche prix :** "À {prix}€ le permis B, chaque appel manqué, c'est potentiellement {prix}€ qui partent chez le concurrent d'à côté."
- **Estimation perte :** "€40,000–80,000/an en inscriptions perdues" (benchmark auto-école urbaine)

### Artisans haut de gamme
- **Accroche standard :** "Quand vous êtes sur chantier, qui répond au téléphone ? Un prospect {type_projet} à {devis}€ ne laisse pas de message — il appelle l'artisan suivant sur Google."
- **Accroche signal (offre emploi) :** "Vous cherchez un(e) assistant(e) commercial(e). Avant de recruter à {salaire}€/an, est-ce qu'une IA à {plan}€/mois pourrait gérer 80% de vos appels ?"
- **Accroche signal (pub) :** "Vous investissez en publicité. Quand le prospect appelle et que vous êtes en rendez-vous client, qui décroche ?"
- **Estimation perte :** "€20,000–100,000/an en devis jamais réalisés" (benchmark artisan CA 500K+)

## Tracking (logs/sent.csv)
```csv
date_envoi,lead_nom,lead_email,ville,vertical,sequence_version,email_numero,objet,statut_envoi
```

## Tracking réponses (logs/replies.csv)
```csv
date_reponse,lead_nom,lead_email,intent,next_step,response_envoyee,date_followup
```

## Métriques cibles
| Métrique | Cible | Alarme |
|----------|-------|--------|
| Taux d'ouverture | 40-60% | < 30% (revoir objets) |
| Taux de réponse | 3-5% | < 2% (revoir contenu) |
| Taux de bounce | < 5% | > 10% (problème de données) |
| Taux de spam | < 0.1% | > 0.3% (STOP immédiat, revoir warmup) |
