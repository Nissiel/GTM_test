/**
 * VERTICALES CIBLES — Analyse stratégique pour AVA AI
 *
 * Critères de scoring d'une verticale :
 * - Volume d'appels entrants (1-10)
 * - Valeur par appel manqué en € (1-10)
 * - Probabilité d'achat (pas tech, budget OK, pain point) (1-10)
 * - Taille du marché France (nb entreprises) (1-10)
 * - Cycle de vente court (1-10)
 */

export interface Verticale {
  id: string;
  name: string;
  emoji: string;
  tier: 1 | 2 | 3;
  description: string;
  painPoint: string;
  pitchAngle: string;
  avgDealValue: number; // €/mois par client AVA
  marketSize: number; // nb entreprises estimées en France
  scoring: {
    callVolume: number;
    missedCallValue: number;
    buyProbability: number;
    marketSize: number;
    shortCycle: number;
  };
  totalScore: number;
  googleMapsCategories: string[];
  decisionMakers: string[]; // titres des décideurs à cibler
  emailSubjectTemplates: string[];
}

function calcScore(v: Verticale["scoring"]): number {
  return v.callVolume * 2 + v.missedCallValue * 2.5 + v.buyProbability * 2 + v.marketSize * 1.5 + v.shortCycle * 2;
}

export const VERTICALES: Verticale[] = [
  // ═══════════════════════════════════════
  // TIER 1 — ROI MAXIMUM
  // ═══════════════════════════════════════
  {
    id: "sante_dentaire",
    name: "Cabinets Dentaires",
    emoji: "🦷",
    tier: 1,
    description: "Cabinets dentaires, orthodontistes, chirurgiens-dentistes",
    painPoint: "Secrétaire submergée, appels manqués pendant les soins, patients perdus",
    pitchAngle: "Un cabinet dentaire perd en moyenne 15 patients/mois par appels non répondus pendant les soins. AVA répond 24/7, prend les RDV, confirme les rappels.",
    avgDealValue: 350,
    marketSize: 42000,
    scoring: { callVolume: 9, missedCallValue: 9, buyProbability: 8, marketSize: 8, shortCycle: 8 },
    totalScore: 0,
    googleMapsCategories: ["cabinet dentaire", "dentiste", "orthodontiste", "chirurgien-dentiste"],
    decisionMakers: ["Chirurgien-dentiste", "Gérant", "Directeur de cabinet", "Responsable administratif"],
    emailSubjectTemplates: [
      "Vos patients n'arrivent pas à vous joindre pendant les soins ?",
      "15 patients perdus/mois à cause des appels manqués",
      "{nom_entreprise} — et si vos patients obtenaient toujours une réponse ?",
    ],
  },
  {
    id: "sante_medical",
    name: "Cabinets Médicaux",
    emoji: "🏥",
    tier: 1,
    description: "Médecins généralistes, spécialistes, centres médicaux",
    painPoint: "Standard saturé, patients frustrés, secrétariat coûteux",
    pitchAngle: "Un secrétariat médical coûte 2500€/mois. AVA fait le même travail pour 300€, 24/7, sans congés, sans arrêts maladie.",
    avgDealValue: 300,
    marketSize: 95000,
    scoring: { callVolume: 10, missedCallValue: 8, buyProbability: 7, marketSize: 10, shortCycle: 7 },
    totalScore: 0,
    googleMapsCategories: ["cabinet médical", "médecin généraliste", "centre médical", "médecin spécialiste"],
    decisionMakers: ["Médecin", "Directeur médical", "Gérant", "Responsable du cabinet"],
    emailSubjectTemplates: [
      "Votre secrétariat coûte 2500€/mois — AVA fait pareil pour 300€",
      "Vos patients raccrochent après 3 sonneries ?",
      "{nom_entreprise} — répondre à 100% des appels, même pendant les consultations",
    ],
  },
  {
    id: "immobilier",
    name: "Agences Immobilières",
    emoji: "🏠",
    tier: 1,
    description: "Agences immobilières, gestionnaires de biens, syndics",
    painPoint: "Agents en visite, appels prospects non répondus = mandats perdus",
    pitchAngle: "Un agent immobilier est en visite 60% du temps. Chaque appel prospect manqué = un mandat potentiel perdu. AVA qualifie, prend les infos, planifie la visite.",
    avgDealValue: 400,
    marketSize: 35000,
    scoring: { callVolume: 9, missedCallValue: 10, buyProbability: 8, marketSize: 7, shortCycle: 8 },
    totalScore: 0,
    googleMapsCategories: ["agence immobilière", "agence de gestion locative", "syndic de copropriété", "promoteur immobilier"],
    decisionMakers: ["Directeur d'agence", "Gérant", "Responsable commercial", "Dirigeant"],
    emailSubjectTemplates: [
      "Combien de mandats perdus pendant vos visites ?",
      "Vos agents sont en visite — qui répond aux prospects ?",
      "{nom_entreprise} — ne perdez plus un seul appel prospect",
    ],
  },
  {
    id: "juridique",
    name: "Cabinets d'Avocats",
    emoji: "⚖️",
    tier: 1,
    description: "Cabinets d'avocats, notaires, huissiers",
    painPoint: "Avocats en audience/réunion, secrétaire débordée, nouveaux clients perdus",
    pitchAngle: "Un avocat est indisponible 70% de la journée (audiences, RDV, rédaction). Chaque appel manqué d'un prospect = 2000-5000€ de dossier perdu. AVA prend les premiers éléments et planifie le RDV.",
    avgDealValue: 400,
    marketSize: 70000,
    scoring: { callVolume: 8, missedCallValue: 10, buyProbability: 7, marketSize: 9, shortCycle: 7 },
    totalScore: 0,
    googleMapsCategories: ["cabinet d'avocats", "avocat", "notaire", "huissier de justice"],
    decisionMakers: ["Avocat associé", "Avocat gérant", "Managing Partner", "Notaire", "Responsable administratif"],
    emailSubjectTemplates: [
      "Combien de dossiers à 5000€ perdus par appels manqués ?",
      "Vos prospects appellent pendant vos audiences — qui leur répond ?",
      "{nom_entreprise} — qualifiez chaque appel même en audience",
    ],
  },
  {
    id: "comptable",
    name: "Cabinets Comptables",
    emoji: "📊",
    tier: 1,
    description: "Experts-comptables, cabinets d'audit, commissaires aux comptes",
    painPoint: "Période fiscale = standard saturé, clients mécontents, nouveaux prospects perdus",
    pitchAngle: "Pendant la période fiscale (janv-juin), votre standard explose. AVA gère 100% des appels : orientation client existant, qualification nouveau prospect, prise de RDV.",
    avgDealValue: 350,
    marketSize: 21000,
    scoring: { callVolume: 8, missedCallValue: 8, buyProbability: 8, marketSize: 6, shortCycle: 8 },
    totalScore: 0,
    googleMapsCategories: ["expert-comptable", "cabinet comptable", "cabinet d'audit"],
    decisionMakers: ["Expert-comptable", "Gérant", "Associé", "Directeur de bureau"],
    emailSubjectTemplates: [
      "Période fiscale : votre standard tient le coup ?",
      "Vos clients n'arrivent plus à vous joindre en janvier-juin",
      "{nom_entreprise} — 100% des appels répondus, même en période fiscale",
    ],
  },
  {
    id: "formation",
    name: "Formation / Éducation",
    emoji: "🎓",
    tier: 1,
    description: "Écoles, centres de formation CPF, BTS, prépas",
    painPoint: "Rush inscriptions, appels parents/élèves, standard débordé",
    pitchAngle: "Pendant Parcoursup et les périodes d'inscription, votre standard explose. AVA répond 24/7, qualifie les demandes, envoie les brochures, planifie les portes ouvertes.",
    avgDealValue: 300,
    marketSize: 55000,
    scoring: { callVolume: 9, missedCallValue: 7, buyProbability: 8, marketSize: 8, shortCycle: 8 },
    totalScore: 0,
    googleMapsCategories: ["centre de formation", "école de commerce", "école d'ingénieur", "organisme de formation CPF", "auto-école"],
    decisionMakers: ["Directeur", "Directeur des admissions", "Responsable communication", "Gérant", "Secrétaire général"],
    emailSubjectTemplates: [
      "Parcoursup : combien d'appels de parents non répondus ?",
      "Votre standard déborde pendant les inscriptions ?",
      "{nom_entreprise} — ne perdez plus un seul futur étudiant",
    ],
  },
  // ═══════════════════════════════════════
  // TIER 2 — POTENTIEL ÉLEVÉ
  // ═══════════════════════════════════════
  {
    id: "beaute",
    name: "Salons Beauté / Coiffure Premium",
    emoji: "💇",
    tier: 2,
    description: "Salons de coiffure, instituts de beauté, spas",
    painPoint: "Coiffeuse au ciseau, ne peut pas décrocher, RDV perdus",
    pitchAngle: "Vos stylistes ont les mains occupées — ils ne peuvent pas décrocher. AVA prend les RDV, gère les annulations, et envoie les confirmations SMS.",
    avgDealValue: 200,
    marketSize: 85000,
    scoring: { callVolume: 8, missedCallValue: 6, buyProbability: 7, marketSize: 10, shortCycle: 9 },
    totalScore: 0,
    googleMapsCategories: ["salon de coiffure", "institut de beauté", "spa", "salon d'esthétique", "barbier"],
    decisionMakers: ["Gérant", "Propriétaire", "Directeur de salon", "Manager"],
    emailSubjectTemplates: [
      "Vos stylistes ne peuvent pas décrocher les mains dans les cheveux",
      "Combien de RDV perdus parce que personne ne décroche ?",
      "{nom_entreprise} — vos clients obtiennent un RDV même quand vous êtes occupé",
    ],
  },
  {
    id: "veterinaire",
    name: "Cliniques Vétérinaires",
    emoji: "🐾",
    tier: 2,
    description: "Vétérinaires, cliniques vétérinaires, hôpitaux animaliers",
    painPoint: "Véto en consultation/chirurgie, urgences non triées, propriétaires stressés",
    pitchAngle: "Un véto est en consultation 80% du temps. Les propriétaires paniqués appellent et raccrochent. AVA trie les urgences, planifie les consultations, rassure les propriétaires.",
    avgDealValue: 300,
    marketSize: 19000,
    scoring: { callVolume: 9, missedCallValue: 8, buyProbability: 7, marketSize: 5, shortCycle: 8 },
    totalScore: 0,
    googleMapsCategories: ["clinique vétérinaire", "vétérinaire", "hôpital vétérinaire"],
    decisionMakers: ["Vétérinaire", "Directeur de clinique", "Gérant", "Associé"],
    emailSubjectTemplates: [
      "Urgences véto : comment triez-vous quand vous êtes en chirurgie ?",
      "Vos clients rappellent 5 fois — AVA répond dès la première",
      "{nom_entreprise} — triez les urgences même pendant les opérations",
    ],
  },
  {
    id: "restaurant_hg",
    name: "Restauration Haut de Gamme",
    emoji: "🍽️",
    tier: 2,
    description: "Restaurants gastronomiques, traiteurs événementiels, hôtels-restaurants",
    painPoint: "Service du midi/soir = personne ne décroche, réservations perdues",
    pitchAngle: "Pendant le service, personne ne décroche. Résultat : 20% des réservations sont perdues. AVA prend les réservations 24/7 et gère les modifications/annulations.",
    avgDealValue: 250,
    marketSize: 45000,
    scoring: { callVolume: 8, missedCallValue: 7, buyProbability: 7, marketSize: 8, shortCycle: 9 },
    totalScore: 0,
    googleMapsCategories: ["restaurant gastronomique", "traiteur événementiel", "hôtel restaurant", "restaurant étoilé"],
    decisionMakers: ["Chef restaurateur", "Directeur de restaurant", "Gérant", "Maître d'hôtel"],
    emailSubjectTemplates: [
      "20% de réservations perdues pendant le service ?",
      "Qui prend les réservations quand vous êtes en cuisine ?",
      "{nom_entreprise} — chaque appel = une réservation, même pendant le coup de feu",
    ],
  },
  {
    id: "artisan_premium",
    name: "Artisans Premium (Urgences)",
    emoji: "🔧",
    tier: 2,
    description: "Plombiers, électriciens, serruriers, chauffagistes — urgences 24/7",
    painPoint: "En intervention = appels manqués = clients vont chez le concurrent",
    pitchAngle: "Vous êtes chez un client à 2h du matin pour une fuite. 3 autres urgences appellent. Sans réponse, ils appellent votre concurrent. AVA répond 24/7, qualifie l'urgence, planifie l'intervention.",
    avgDealValue: 250,
    marketSize: 120000,
    scoring: { callVolume: 9, missedCallValue: 8, buyProbability: 6, marketSize: 10, shortCycle: 8 },
    totalScore: 0,
    googleMapsCategories: ["plombier", "électricien", "serrurier", "chauffagiste", "climaticien"],
    decisionMakers: ["Gérant", "Artisan", "Chef d'entreprise", "Dirigeant"],
    emailSubjectTemplates: [
      "En intervention à 2h du matin — qui répond aux autres urgences ?",
      "Vos clients appellent votre concurrent quand vous ne décrochez pas",
      "{nom_entreprise} — ne perdez plus une seule urgence",
    ],
  },
  {
    id: "hotellerie",
    name: "Hôtellerie",
    emoji: "🏨",
    tier: 2,
    description: "Hôtels indépendants, résidences hôtelières, chambres d'hôtes premium",
    painPoint: "Réception débordée, réservations téléphoniques manquées, multilingue",
    pitchAngle: "Votre réceptionniste gère check-in, check-out, et le téléphone en même temps. AVA prend les réservations en français ET anglais, 24/7, pendant que votre équipe s'occupe des clients sur place.",
    avgDealValue: 350,
    marketSize: 30000,
    scoring: { callVolume: 8, missedCallValue: 8, buyProbability: 7, marketSize: 6, shortCycle: 7 },
    totalScore: 0,
    googleMapsCategories: ["hôtel", "résidence hôtelière", "chambre d'hôtes", "boutique hotel"],
    decisionMakers: ["Directeur d'hôtel", "Gérant", "Revenue Manager", "Responsable réservations"],
    emailSubjectTemplates: [
      "Votre réceptionniste gère tout en même temps — combien d'appels manqués ?",
      "Réservations perdues la nuit quand personne ne décroche",
      "{nom_entreprise} — réceptionniste virtuel bilingue 24/7",
    ],
  },
  // ═══════════════════════════════════════
  // TIER 3 — À EXPLORER
  // ═══════════════════════════════════════
  {
    id: "cinema",
    name: "Cinémas / Salles de Spectacle",
    emoji: "🎬",
    tier: 3,
    description: "Cinémas indépendants, salles de spectacle, théâtres",
    painPoint: "Standard saturé avant les séances, infos répétitives",
    pitchAngle: "80% des appels sont les mêmes questions : horaires, tarifs, parking. AVA y répond instantanément et libère votre équipe pour l'accueil.",
    avgDealValue: 200,
    marketSize: 5500,
    scoring: { callVolume: 7, missedCallValue: 5, buyProbability: 6, marketSize: 3, shortCycle: 7 },
    totalScore: 0,
    googleMapsCategories: ["cinéma", "salle de spectacle", "théâtre"],
    decisionMakers: ["Directeur", "Gérant", "Responsable programmation"],
    emailSubjectTemplates: [
      "80% de vos appels = la même question sur les horaires",
      "Libérez votre équipe des appels répétitifs",
    ],
  },
  {
    id: "auto_ecole",
    name: "Auto-écoles",
    emoji: "🚗",
    tier: 3,
    description: "Auto-écoles, écoles de conduite",
    painPoint: "Moniteurs en leçon, secrétariat limité, inscriptions manquées",
    pitchAngle: "Vos moniteurs sont sur la route, votre secrétariat ferme à 18h. Les élèves potentiels appellent et ne trouvent personne. AVA gère les inscriptions et le planning 24/7.",
    avgDealValue: 200,
    marketSize: 12000,
    scoring: { callVolume: 7, missedCallValue: 6, buyProbability: 7, marketSize: 4, shortCycle: 8 },
    totalScore: 0,
    googleMapsCategories: ["auto-école", "école de conduite"],
    decisionMakers: ["Directeur", "Gérant", "Exploitant"],
    emailSubjectTemplates: [
      "Vos moniteurs sont sur la route — qui prend les inscriptions ?",
      "Un élève qui n'arrive pas à s'inscrire va chez le concurrent",
    ],
  },
  {
    id: "concession_auto",
    name: "Concessions / Garages Auto",
    emoji: "🚙",
    tier: 3,
    description: "Concessions automobiles, garages, centres auto",
    painPoint: "Vendeurs en essai, atelier débordé, RDV SAV manqués",
    pitchAngle: "Vos vendeurs sont en essai route, votre atelier a les mains dans le cambouis. AVA prend les RDV atelier, qualifie les appels vente, et transfert les urgences.",
    avgDealValue: 300,
    marketSize: 40000,
    scoring: { callVolume: 8, missedCallValue: 7, buyProbability: 6, marketSize: 7, shortCycle: 6 },
    totalScore: 0,
    googleMapsCategories: ["concession automobile", "garage automobile", "centre auto"],
    decisionMakers: ["Directeur de concession", "Chef des ventes", "Responsable après-vente", "Gérant"],
    emailSubjectTemplates: [
      "Vendeurs en essai — qui qualifie les appels entrants ?",
      "RDV atelier manqués = clients mécontents",
    ],
  },
  {
    id: "agence_voyage",
    name: "Agences de Voyage",
    emoji: "✈️",
    tier: 3,
    description: "Agences de voyage, tour-opérateurs",
    painPoint: "Agents en rdv client, appels devis non traités",
    pitchAngle: "Vos agents sont en RDV personnalisation voyage. Les prospects appellent pour des devis et raccrochent. AVA qualifie la demande, note le budget et la destination, et planifie le rappel.",
    avgDealValue: 250,
    marketSize: 4000,
    scoring: { callVolume: 7, missedCallValue: 7, buyProbability: 6, marketSize: 3, shortCycle: 7 },
    totalScore: 0,
    googleMapsCategories: ["agence de voyage", "tour-opérateur"],
    decisionMakers: ["Directeur d'agence", "Gérant", "Responsable commercial"],
    emailSubjectTemplates: [
      "Vos prospects voyage appellent et raccrochent ?",
      "Chaque appel manqué = un voyage non vendu",
    ],
  },
];

// Calculate scores
VERTICALES.forEach((v) => {
  v.totalScore = calcScore(v.scoring);
});

// Sort by score
VERTICALES.sort((a, b) => b.totalScore - a.totalScore);

// Getters
export function getVerticalesByTier(tier: 1 | 2 | 3): Verticale[] {
  return VERTICALES.filter((v) => v.tier === tier);
}

export function getAllGoogleMapsQueries(villes: string[]): string[] {
  const queries: string[] = [];
  for (const v of VERTICALES) {
    for (const cat of v.googleMapsCategories) {
      for (const ville of villes) {
        queries.push(`${cat} ${ville}`);
      }
    }
  }
  return queries;
}

export function getTopVerticales(n = 5): Verticale[] {
  return VERTICALES.slice(0, n);
}

export const VILLES_FRANCE = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Lille",
  "Nantes", "Strasbourg", "Nice", "Montpellier", "Rennes", "Grenoble",
  "Rouen", "Toulon", "Dijon", "Angers", "Clermont-Ferrand", "Le Mans",
  "Aix-en-Provence", "Brest", "Tours", "Amiens", "Limoges", "Metz",
  "Besançon", "Perpignan", "Orléans", "Reims", "Caen", "Saint-Étienne",
];
