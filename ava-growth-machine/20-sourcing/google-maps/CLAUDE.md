# Google Maps Sourcing — CLAUDE.md

## Tu es le moteur de sourcing. Ton job : générer des leads qualifiés par ville et vertical.

## Workflow complet

### Étape 1 : Scraping
Utiliser Apify Google Maps Scraper ou Scrap.io pour extraire les données.

**Input requis :**
- Ville cible
- Vertical (formation/auto-ecoles/artisans/sante/education/immo)
- Rayon (défaut : 20km autour du centre-ville)

**Requêtes à lancer (adapter selon vertical, voir /10-icp/[vertical]/CLAUDE.md) :**
Pour chaque requête, extraire :
- Nom de l'établissement
- Catégorie Google Maps
- Adresse complète
- Numéro de téléphone
- Site web
- Note Google (étoiles)
- Nombre d'avis
- Horaires d'ouverture
- URL Google Maps

### Étape 2 : Nettoyage
- Supprimer les doublons (même téléphone ou même adresse)
- Supprimer les entrées sans numéro de téléphone
- Supprimer les chaînes nationales / franchises (sauf si ciblage spécifique)
- Vérifier que le site web est actif

### Étape 3 : Enrichissement
Pour chaque lead, chercher :
- Email du décisionnaire (site web → page contact / mentions légales)
- Profil LinkedIn du dirigeant/gérant
- Présence de booking en ligne (Doctolib, Calendly, etc.)
- Présence d'un chat sur le site
- Offres d'emploi actives (Indeed, LinkedIn) mentionnant "accueil", "secrétaire", "réceptionniste"

### Étape 4 : Scoring (0-100)

| Critère | Points |
|---------|--------|
| Nombre d'avis > 200 | +15 |
| Nombre d'avis 100-200 | +10 |
| Nombre d'avis 50-100 | +5 |
| Avis négatifs mentionnant téléphone/joindre | +20 |
| Pas de booking en ligne | +15 |
| Booking en ligne MAIS téléphone proéminent | +10 |
| Horaires étendus / weekend | +10 |
| 2+ locations ou praticiens | +10 |
| Offre d'emploi réceptionniste/accueil | +15 |
| Pub Google Ads active | +10 |
| Site web sans chat | +5 |
| Note Google < 4.0 (possible insatisfaction service) | +5 |
| Pas de site web | -10 |
| < 30 avis | -10 |
| Solo praticien apparent | -5 |

**Score ≥ 70 → Priorité haute** (outreach immédiat)
**Score 40-69 → Priorité moyenne** (séquence email standard)
**Score < 40 → Déprioritisé** (garder pour plus tard)

## Format CSV output (leads_raw.csv)
```csv
nom,categorie,ville,adresse,telephone,site_web,email,note_google,nb_avis,horaires,url_gmaps,booking_online,chat_site,linkedin_dirigeant,offre_emploi_accueil,notes
```

## Format CSV output (leads_scored.csv)
```csv
nom,telephone,email,ville,score,raison_score,pitch_angle,ligne_personnalisation,priorite,statut_outreach
```

## Volume cible
- **500 leads bruts par ville par vertical**
- **Top 100 leads scorés ≥ 70 par ville** → outreach immédiat
- **Rythme : 1 ville/semaine en phase d'attaque**

## Outils
| Outil | Usage | Coût |
|-------|-------|------|
| Apify Google Maps Scraper | Scraping principal | Free tier → $49/mois |
| Scrap.io | Alternative temps réel | $49/mois |
| Google Maps manuel | Vérification + enrichissement | Gratuit |
| LinkedIn Sales Navigator | Trouver les décisionnaires | $79/mois (optionnel) |
| Hunter.io / Dropcontact | Trouver emails | Free tier → $49/mois |

---

## Requêtes Google Maps par vertical

### Formation (écoles post-bac + centres CPF)
```
"ecole de commerce [ville]", "business school [ville]", "ecole d'ingenieur [ville]",
"ecole de design [ville]", "ecole informatique [ville]", "ecole de communication [ville]",
"ecole superieure [ville]", "centre de formation [ville]", "organisme de formation [ville]",
"formation professionnelle [ville]", "formation CPF [ville]", "bilan de competences [ville]",
"CFA [ville]", "BTS prive [ville]", "prepa privee [ville]", "ecole de sante [ville]"
```

### Auto-écoles
```
"auto-ecole [ville]", "auto ecole [ville]", "ecole de conduite [ville]",
"permis de conduire [ville]", "permis moto [ville]", "permis accelere [ville]",
"conduite accompagnee [ville]", "auto-ecole [quartier] [ville]"
```

### Artisans haut de gamme
```
"cuisiniste [ville]", "cuisine sur mesure [ville]", "pisciniste [ville]",
"constructeur piscine [ville]", "verandiste [ville]", "veranda [ville]",
"pergola [ville]", "menuisier alu [ville]", "fenetre PVC [ville]",
"chauffagiste [ville]", "pompe a chaleur [ville]", "climatisation [ville]",
"paysagiste [ville]", "portail [ville]", "renovation maison [ville]",
"salle de bain [ville]", "constructeur maison [ville]"
```

### Santé / Dentaire / Esthétique
```
"cabinet dentaire [ville]", "clinique dentaire [ville]", "orthodontiste [ville]",
"chirurgien dentiste [ville]", "clinique esthetique [ville]",
"medecin esthetique [ville]", "kinesitherapeute [ville]",
"centre de kinesitherapie [ville]", "clinique veterinaire [ville]"
```

### Éducation privée K-12
```
"ecole privee [ville]", "ecole maternelle privee [ville]",
"creche privee [ville]", "ecole de langues [ville]",
"ecole de musique [ville]", "ecole internationale [ville]"
```

### Immobilier
```
"agence immobiliere [ville]", "agent immobilier [ville]",
"gestion locative [ville]", "syndic de copropriete [ville]",
"location saisonniere [ville]"
```
