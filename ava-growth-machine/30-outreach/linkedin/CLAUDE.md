# LinkedIn — CLAUDE.md

## Tu gères l'outreach LinkedIn. Cible : décisionnaires PME (gérants, directeurs, propriétaires).

## Règles
- Max 10 DMs personnalisés par jour (limite LinkedIn)
- Connection request AVEC note (300 caractères max)
- Jamais de pitch dans la connection request
- Pitch dans le 2ème message, après acceptation
- Contenu founder-led sur le profil de Nissiel (1 post/jour minimum)

## Séquence LinkedIn (4 étapes)

### Étape 1 : Connection Request (J0)
```
{Prénom}, je travaille avec des {type_etablissement} à {ville} 
sur un sujet que je pense pertinent pour vous. 
Ravi de me connecter.
```
OU (si signal détecté) :
```
{Prénom}, j'ai vu {signal : votre offre d'emploi / votre nouveau cabinet / vos avis}. 
J'ai un angle qui pourrait vous intéresser. On se connecte ?
```

### Étape 2 : Message post-connexion (J+1 après acceptation)
```
Merci pour la connexion {Prénom}.

Question directe : quand vos {patients/parents/clients} appellent 
et que personne ne décroche, que se passe-t-il ?

On aide des {type} à récupérer ces appels avec un assistant IA 
qui répond 24/7 et prend les RDV automatiquement.

Si ça vous parle, je vous montre en 5 min sur votre cas précis. Dispo cette semaine ?
```

### Étape 3 : Relance valeur (J+4 si pas de réponse)
```
{Prénom}, je ne veux pas insister — juste partager un chiffre :

Les {type_etablissement} manquent 30% de leurs appels en moyenne. 
75% de ces appelants ne rappellent jamais.

Pour {nom_etablissement}, ça peut représenter {estimation}€/an de CA perdu.

Si c'est un sujet, je suis dispo 10 min cette semaine.
```

### Étape 4 : Clôture (J+8 si pas de réponse)
```
{Prénom}, dernier message de ma part. 

Si les appels manqués ne sont pas une priorité pour vous, 
aucun souci — je comprends.

Si ça le devient un jour, répondez ici — je serai toujours dispo.

Bonne continuation.
```

## Contenu Founder-Led (1 post/jour sur le profil Nissiel)

### Types de posts qui marchent :
1. **Chiffre choc + question** : "30% des appels des PME ne sont pas répondus. 75% de ces appelants ne rappellent jamais. Combien ça vous coûte ?"
2. **Behind the scenes** : "On vient de déployer AVA chez [client]. Voici ce qui s'est passé en 48h..."
3. **Comparaison concrète** : "Réceptionniste vs IA : le vrai comparatif (avec chiffres)"
4. **Client story** : "[Client] perdait X€/mois en appels manqués. En 2 semaines..."
5. **Opinion forte** : "Les PME n'ont pas un problème de marketing. Elles ont un problème de téléphone."
6. **Vidéo démo** : Enregistrement d'un appel avec AVA (30-60 secondes)

### Format LinkedIn optimal :
- Première ligne = hook (la plus importante)
- Sauts de ligne fréquents
- Max 1,300 caractères (idéal pour l'engagement)
- Finir par une question ou un CTA doux
- 3-5 hashtags max : #PME #IA #AppelsManqués #VoiceAI #AVA

## Tracking (linkedin/logs.csv)
```csv
date,lead_nom,profil_url,ville,vertical,etape(connection/dm1/dm2/dm3),statut(envoye/accepte/reponse/ignore),intent,next_step
```
