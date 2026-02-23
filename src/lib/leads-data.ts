// Lead data — loaded from our CSV exports
// In production: API route that reads from Supabase or CSV on server

export interface Lead {
  id: string;
  nom_entreprise: string;
  type_etablissement: string;
  ville: string;
  adresse: string;
  telephone: string;
  email: string;
  site_web: string;
  note_google: number;
  nb_avis_google: number;
  score: number;
  pitch_angle: string;
  statut_pipeline: "nouveau" | "contacte" | "repondu" | "rdv_booke" | "deal_won" | "perdu";
  date_scraping: string;
  source: string;
  instantly_status: "imported" | "pending" | "not_imported";
  verticale: string;
  // Enrichment fields (Phase 2)
  decision_makers: DecisionMaker[];
  enrichment_status: "pending" | "in_progress" | "completed" | "failed";
}

export interface DecisionMaker {
  name: string;
  title: string;
  email: string;
  linkedin_url: string;
  confidence: number;
}

export type SortField = "nom_entreprise" | "ville" | "score" | "note_google" | "nb_avis_google" | "statut_pipeline" | "date_scraping";
export type SortDirection = "asc" | "desc";

export interface LeadFilters {
  search: string;
  ville: string;
  verticale: string;
  pipeline: string;
  scoreMin: number;
  scoreMax: number;
  hasEmail: "all" | "yes" | "no";
  source: string;
}

// Sample leads data — top leads from our CSV
export function getLeads(): Lead[] {
  return SAMPLE_LEADS;
}

export function getLeadStats() {
  const leads = SAMPLE_LEADS;
  return {
    total: leads.length,
    withEmail: leads.filter((l) => l.email).length,
    withoutEmail: leads.filter((l) => !l.email).length,
    avgScore: Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length),
    byPipeline: {
      nouveau: leads.filter((l) => l.statut_pipeline === "nouveau").length,
      contacte: leads.filter((l) => l.statut_pipeline === "contacte").length,
      repondu: leads.filter((l) => l.statut_pipeline === "repondu").length,
      rdv_booke: leads.filter((l) => l.statut_pipeline === "rdv_booke").length,
      deal_won: leads.filter((l) => l.statut_pipeline === "deal_won").length,
      perdu: leads.filter((l) => l.statut_pipeline === "perdu").length,
    },
    byVille: leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.ville] = (acc[l.ville] || 0) + 1;
      return acc;
    }, {}),
    byVerticale: leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.verticale] = (acc[l.verticale] || 0) + 1;
      return acc;
    }, {}),
  };
}

const SAMPLE_LEADS: Lead[] = [
  {
    id: "lead-001",
    nom_entreprise: "CNAM Paris",
    type_etablissement: "Centre de formation",
    ville: "Paris",
    adresse: "292 Rue Saint-Martin, 75003 Paris",
    telephone: "01 40 27 20 00",
    email: "info@cnam.fr",
    site_web: "https://www.cnam.fr",
    note_google: 4.1,
    nb_avis_google: 1823,
    score: 95,
    pitch_angle: "Automatisez 100% des appels entrants — 0 appel manqué, 24/7",
    statut_pipeline: "contacte",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Formation",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-002",
    nom_entreprise: "AFTEC Formation",
    type_etablissement: "Centre de formation",
    ville: "Paris",
    adresse: "12 Rue du Quatre-Septembre, 75002 Paris",
    telephone: "01 53 40 43 00",
    email: "contact@aftec.fr",
    site_web: "https://www.aftec.fr",
    note_google: 4.3,
    nb_avis_google: 456,
    score: 92,
    pitch_angle: "Ne perdez plus de prospects CPF — AVA qualifie et prend RDV automatiquement",
    statut_pipeline: "contacte",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Formation",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-003",
    nom_entreprise: "OpenClassrooms",
    type_etablissement: "Centre de formation en ligne",
    ville: "Paris",
    adresse: "7 Cité Paradis, 75010 Paris",
    telephone: "01 80 88 80 30",
    email: "contact@openclassrooms.com",
    site_web: "https://openclassrooms.com",
    note_google: 3.9,
    nb_avis_google: 892,
    score: 88,
    pitch_angle: "IA vocale qui qualifie les candidats 24/7 — taux de conversion x3",
    statut_pipeline: "nouveau",
    date_scraping: "2026-02-23",
    source: "Web Search",
    instantly_status: "imported",
    verticale: "Formation",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-004",
    nom_entreprise: "IFSI Lyon",
    type_etablissement: "Institut de formation en soins infirmiers",
    ville: "Lyon",
    adresse: "5 Avenue Esquirol, 69003 Lyon",
    telephone: "04 72 11 57 20",
    email: "ifsi@chu-lyon.fr",
    site_web: "https://www.chu-lyon.fr",
    note_google: 3.8,
    nb_avis_google: 234,
    score: 85,
    pitch_angle: "Gérez les admissions téléphoniques sans mobiliser vos équipes",
    statut_pipeline: "contacte",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Formation",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-005",
    nom_entreprise: "Cabinet Dentaire Saint-Lazare",
    type_etablissement: "Cabinet dentaire",
    ville: "Paris",
    adresse: "48 Rue de la Victoire, 75009 Paris",
    telephone: "01 48 74 32 15",
    email: "rdv@cabinet-saintlazare.fr",
    site_web: "https://www.cabinet-saintlazare.fr",
    note_google: 4.6,
    nb_avis_google: 342,
    score: 94,
    pitch_angle: "Zéro appel manqué, zéro RDV perdu — votre secrétaire IA 24/7",
    statut_pipeline: "nouveau",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Cabinets Dentaires",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-006",
    nom_entreprise: "Agence Immobilière Century 21 Bastille",
    type_etablissement: "Agence immobiliere",
    ville: "Paris",
    adresse: "15 Rue de la Roquette, 75011 Paris",
    telephone: "01 43 38 72 00",
    email: "bastille@century21.fr",
    site_web: "https://www.century21.fr",
    note_google: 4.2,
    nb_avis_google: 567,
    score: 91,
    pitch_angle: "Captez chaque prospect vendeur/acheteur — qualification vocale IA 24/7",
    statut_pipeline: "nouveau",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Agences Immobili\u00e8res",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-007",
    nom_entreprise: "Clinique V\u00e9t\u00e9rinaire des Buttes Chaumont",
    type_etablissement: "Clinique v\u00e9t\u00e9rinaire",
    ville: "Paris",
    adresse: "3 Rue Manin, 75019 Paris",
    telephone: "01 42 08 39 41",
    email: "contact@vetbuttes.fr",
    site_web: "https://www.vetbuttes.fr",
    note_google: 4.5,
    nb_avis_google: 289,
    score: 87,
    pitch_angle: "Urgences v\u00e9to la nuit? AVA g\u00e8re vos appels et trie les vraies urgences",
    statut_pipeline: "nouveau",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Cliniques V\u00e9t\u00e9rinaires",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-008",
    nom_entreprise: "Ma\u00eetre Durand Cabinet Avocats",
    type_etablissement: "Cabinet d'avocats",
    ville: "Lyon",
    adresse: "25 Place Bellecour, 69002 Lyon",
    telephone: "04 78 42 15 63",
    email: "contact@cabinet-durand.fr",
    site_web: "https://www.cabinet-durand.fr",
    note_google: 4.7,
    nb_avis_google: 156,
    score: 93,
    pitch_angle: "Qualifiez vos appels clients automatiquement — ne ratez plus un mandat",
    statut_pipeline: "nouveau",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Cabinets d'Avocats",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-009",
    nom_entreprise: "Expert Comptable Dupont & Associ\u00e9s",
    type_etablissement: "Cabinet comptable",
    ville: "Paris",
    adresse: "82 Rue du Faubourg Saint-Honor\u00e9, 75008 Paris",
    telephone: "01 42 66 90 00",
    email: "accueil@dupont-comptable.fr",
    site_web: "https://www.dupont-comptable.fr",
    note_google: 4.4,
    nb_avis_google: 203,
    score: 90,
    pitch_angle: "P\u00e9riode fiscale? AVA r\u00e9pond et qualifie vos nouveaux clients 24/7",
    statut_pipeline: "nouveau",
    date_scraping: "2026-02-23",
    source: "Web Search",
    instantly_status: "imported",
    verticale: "Cabinets Comptables",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-010",
    nom_entreprise: "Salon de Beaut\u00e9 L'\u00c9clat",
    type_etablissement: "Salon de beaut\u00e9",
    ville: "Marseille",
    adresse: "45 Rue Paradis, 13001 Marseille",
    telephone: "04 91 33 22 11",
    email: "info@salon-eclat.fr",
    site_web: "https://www.salon-eclat.fr",
    note_google: 4.8,
    nb_avis_google: 412,
    score: 86,
    pitch_angle: "Vos clientes appellent pour r\u00e9server? AVA prend les RDV m\u00eame quand vous coiffez",
    statut_pipeline: "nouveau",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Salons Beaut\u00e9",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-011",
    nom_entreprise: "Centre de Formation Studi",
    type_etablissement: "Centre de formation en ligne",
    ville: "Paris",
    adresse: "47 Rue de Maubeuge, 75009 Paris",
    telephone: "01 74 85 22 33",
    email: "contact@studi.fr",
    site_web: "https://www.studi.com",
    note_google: 4.0,
    nb_avis_google: 1245,
    score: 89,
    pitch_angle: "Convertissez 100% des appels CPF en inscriptions avec l'IA vocale",
    statut_pipeline: "contacte",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Formation",
    decision_makers: [],
    enrichment_status: "pending",
  },
  {
    id: "lead-012",
    nom_entreprise: "Auto-\u00e9cole Ornikar Lyon",
    type_etablissement: "Auto-\u00e9cole",
    ville: "Lyon",
    adresse: "18 Rue de la R\u00e9publique, 69002 Lyon",
    telephone: "04 78 12 45 89",
    email: "lyon@ornikar.com",
    site_web: "https://www.ornikar.com",
    note_google: 3.7,
    nb_avis_google: 876,
    score: 78,
    pitch_angle: "R\u00e9servation de cr\u00e9neaux conduite par t\u00e9l\u00e9phone? AVA g\u00e8re tout en vocal",
    statut_pipeline: "nouveau",
    date_scraping: "2026-02-23",
    source: "Apify Google Maps",
    instantly_status: "imported",
    verticale: "Auto-\u00e9coles",
    decision_makers: [],
    enrichment_status: "pending",
  },
];
