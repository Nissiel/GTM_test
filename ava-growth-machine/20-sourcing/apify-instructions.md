# Comment scraper 500+ leads Formation avec Apify

## Étape 1 : Ouvrir Apify Google Maps Scraper

URL : https://console.apify.com/actors/nwua9Gu5YrADL7ZDj

## Étape 2 : Configurer le scraper

### Option A : Coller les requêtes une par une
Dans le champ "Search terms", coller les requêtes depuis `apify-queries-formation.json` :
- Copier toutes les valeurs `searchQuery` du fichier JSON
- Les coller une par ligne dans le champ

### Option B : Import JSON (recommandé)
1. Aller dans l'onglet "Input" du scraper
2. Passer en mode JSON
3. Utiliser cette config :

```json
{
  "searchStringsArray": [
    "école de commerce Paris",
    "business school Paris",
    "école d'ingénieur Paris",
    "école de design Paris",
    "école informatique Paris",
    "école de communication Paris",
    "école d'art Paris",
    "école supérieure Paris",
    "centre de formation Paris",
    "organisme de formation Paris",
    "formation professionnelle Paris",
    "formation CPF Paris",
    "bilan de compétences Paris",
    "CFA Paris",
    "centre de formation apprentis Paris",
    "BTS privé Paris",
    "prépa privée Paris",
    "école de santé Paris",
    "école ostéopathie Paris",
    "formation continue Paris",
    "école de langues Paris",
    "école de musique Paris",
    "école de commerce Lyon",
    "business school Lyon",
    "école d'ingénieur Lyon",
    "école de design Lyon",
    "école informatique Lyon",
    "école de communication Lyon",
    "école d'art Lyon",
    "école supérieure Lyon",
    "centre de formation Lyon",
    "organisme de formation Lyon",
    "formation professionnelle Lyon",
    "formation CPF Lyon",
    "bilan de compétences Lyon",
    "CFA Lyon",
    "centre de formation apprentis Lyon",
    "BTS privé Lyon",
    "prépa privée Lyon",
    "école de santé Lyon",
    "école ostéopathie Lyon",
    "formation continue Lyon",
    "école de langues Lyon",
    "école de musique Lyon"
  ],
  "maxCrawledPlacesPerSearch": 30,
  "language": "fr",
  "countryCode": "FR",
  "includeWebResults": false,
  "maxImages": 0,
  "maxReviews": 5,
  "scrapeReviewerName": false,
  "scrapeReviewerUrl": false
}
```

### Paramètres clés :
- **maxCrawledPlacesPerSearch** : 30 (44 requêtes × 30 = ~1,320 résultats bruts)
- **language** : fr
- **countryCode** : FR
- Résultat attendu après déduplication : **500-700 leads uniques**

## Étape 3 : Lancer et exporter

1. Cliquer **"Start"**
2. Attendre ~10-20 minutes (selon le volume)
3. Quand c'est fini → onglet **"Storage"** → **"Export"**
4. Exporter en **CSV**
5. Renommer le fichier : `leads_formation_paris_lyon_raw.csv`

## Étape 4 : Nettoyer et formater

Le CSV Apify contient beaucoup de colonnes. Garder uniquement :

| Colonne Apify | → Colonne template |
|---------------|-------------------|
| title | nom_entreprise |
| categoryName | type_etablissement |
| city | ville |
| address | adresse |
| phone | telephone |
| website | site_web |
| totalScore | note_google |
| reviewsCount | nb_avis_google |
| openingHours | horaires |

Les colonnes `email`, `contact_nom`, `contact_titre`, `linkedin_url` seront remplies à l'étape suivante.

## Étape 5 : Enrichissement emails (Dropcontact)

1. Aller sur https://www.dropcontact.com
2. Importer le CSV nettoyé
3. Dropcontact trouve les emails professionnels à partir du nom d'entreprise + site web
4. Exporter le CSV enrichi
5. Fusionner avec le template `leads-template.csv`

**Alternative gratuite :** Hunter.io (50 recherches/mois gratuites) ou chercher manuellement sur les sites web.

## Étape 6 : Trouver les décideurs (LinkedIn)

Pour les top 100 leads (score ≥ 80) :
1. Chercher sur LinkedIn : "[nom école] directeur" ou "responsable admissions"
2. Ajouter le nom, titre et URL LinkedIn dans le CSV
3. Envoyer une connection request LinkedIn (voir `/30-outreach/linkedin/CLAUDE.md`)

## Étape 7 : Scoring

1. Ouvrir le prompt `/90-automation/prompts/lead_scoring.md`
2. Pour chaque lead, fournir à Claude :
   - Nom, ville, type, note Google, nb avis, site web, horaires
3. Claude retourne : score (0-100), pitch_angle, personnalisation
4. Ajouter au CSV

**Critères de scoring rapide :**
- Note Google ≥ 4.0 ET >50 avis → +20 points
- Pas de formulaire d'inscription en ligne → +15 points
- "Appelez-nous" comme CTA sur le site → +15 points
- Avis mentionnant "impossible de joindre" → +20 points
- Pub Google/Facebook active → +15 points
- Période inscription active → +15 points

**Seuils :**
- Score ≥ 85 → Séquence prioritaire (email perso + LinkedIn DM)
- Score 70-84 → Séquence email standard (Instantly)
- Score < 70 → Pas de contact (pour l'instant)

## Étape 8 : Import dans Instantly

1. Exporter le CSV final (leads score ≥ 70 uniquement)
2. Aller sur https://instantly.ai
3. Importer le CSV dans une campagne
4. Sélectionner la séquence V1 (voir `/30-outreach/cold-email/CLAUDE.md`)
5. Vérifier que le warmup est terminé (2-3 semaines minimum)
6. Lancer la campagne

---

## Résumé du pipeline

```
Apify (scraping Google Maps)
  → 1,320 résultats bruts
  → Déduplication → ~600 uniques
  → Dropcontact (enrichissement email) → ~400 avec email
  → Scoring Claude → ~200 score ≥ 70
  → Import Instantly → Séquence email automatique
  → Top 50 (score ≥ 85) → Email perso + LinkedIn DM + WhatsApp
```

**Temps estimé : 2-3 heures pour tout le pipeline (une seule fois).**
**Ensuite c'est automatique via Instantly.**
