// Static data loader - reads from CSV/JSON files
// In production, this would connect to Supabase

export interface LeadData {
  nom_entreprise: string;
  type_etablissement: string;
  ville: string;
  adresse: string;
  telephone: string;
  email: string;
  site_web: string;
  note_google: string;
  nb_avis_google: string;
  score: number;
  pitch_angle: string;
  sequence_email: string;
  statut_pipeline: string;
  date_scraping: string;
  source: string;
  instantly_status: string;
}

export interface DashboardStats {
  totalLeads: number;
  withEmail: number;
  withoutEmail: number;
  inInstantly: number;
  prioritaire: number;
  standard: number;
  byVerticale: Record<string, number>;
  byVille: Record<string, number>;
  bySource: Record<string, number>;
  byScore: { high: number; medium: number; low: number };
}

// Real data from Apify scraping runs (11 datasets consolidated, 8360 unique leads)
// Last updated: 2026-02-23 — will be replaced with live API calls
export function getDashboardStats(): DashboardStats {
  return {
    totalLeads: 8360,
    withEmail: 0,
    withoutEmail: 8360,
    inInstantly: 178,
    prioritaire: 7048,
    standard: 1312,
    byVerticale: {
      "Centre de formation": 353,
      "Formation continue": 316,
      "Dentiste": 287,
      "Auto-école": 273,
      "Expert-comptable": 255,
      "Kinésithérapeute": 254,
      "Salon de coiffure": 254,
      "Enseignement supérieur": 251,
      "Agence immobilière": 248,
      "Plombier": 246,
      "Hôtel": 246,
      "Électricien": 239,
      "Institut de beauté": 238,
      "Agence de voyages": 238,
      "Crèche": 236,
      "Fleuriste": 229,
      "Ostéopathe": 216,
      "Coach sportif": 193,
      "Nettoyage": 192,
      "Photographe": 178,
    },
    byVille: {
      Strasbourg: 549,
      Lille: 529,
      Bordeaux: 527,
      Nice: 513,
      Nantes: 510,
      Reims: 507,
      Rennes: 499,
      Toulouse: 453,
      "Le Havre": 446,
      "Saint-Étienne": 445,
      Grenoble: 443,
      Toulon: 409,
      Montpellier: 381,
      Paris: 371,
      Lyon: 168,
    },
    bySource: {
      "Apify Google Maps": 8360,
    },
    byScore: {
      high: 7048,
      medium: 1250,
      low: 62,
    },
  };
}

export interface ApifyRunStatus {
  runId: string;
  datasetId: string;
  status: string;
  queriesCount: number;
  verticale: string;
  resultsCount?: number;
}

export function getApifyRuns(): ApifyRunStatus[] {
  return [
    { runId: "WMS8gIAQ5rqzyghf0", datasetId: "1R95ndihhQhYmX7Pv", status: "SUCCEEDED", queriesCount: 30, verticale: "Formation Paris+Lyon", resultsCount: 447 },
    { runId: "JH3n4GsiBgmTidFfm", datasetId: "d75bTGRX0avyXyzJ8", status: "SUCCEEDED", queriesCount: 50, verticale: "Formation France Batch 1", resultsCount: 579 },
    { runId: "gLcR1g5PhdOFUwQRw", datasetId: "KVOtVsZexVIpJCvd7", status: "SUCCEEDED", queriesCount: 50, verticale: "Formation + Auto-école", resultsCount: 395 },
    { runId: "BwMU7MRjkqHZpNKL5", datasetId: "fBvNu8dFcJUjiwZAC", status: "SUCCEEDED", queriesCount: 50, verticale: "Multi-verticale Chunk 3", resultsCount: 947 },
    { runId: "XFD7PTtDDYQdWODxO", datasetId: "KFWY4BoPSH7GwZMig", status: "SUCCEEDED", queriesCount: 50, verticale: "Multi-verticale Chunk 4", resultsCount: 925 },
    { runId: "mOb8hvAId5vETHbYP", datasetId: "mKkV3YSzTfRSKPqWz", status: "SUCCEEDED", queriesCount: 50, verticale: "Multi-verticale Chunk 5", resultsCount: 912 },
    { runId: "EBJwkNWs9qnOnDr2H", datasetId: "SlXorLlzSLhf8CfcU", status: "SUCCEEDED", queriesCount: 50, verticale: "Multi-verticale Chunk 6", resultsCount: 921 },
    { runId: "VvsH1PuPTHa1vnIe7", datasetId: "6vTJdV8EPwbYz8qVR", status: "SUCCEEDED", queriesCount: 50, verticale: "Multi-verticale Chunk 7", resultsCount: 914 },
    { runId: "si1VpqXtNqdk1JK21", datasetId: "79cWMFzVOeYKTNj76", status: "SUCCEEDED", queriesCount: 50, verticale: "Multi-verticale Chunk 8", resultsCount: 855 },
    { runId: "UWkYvTtUA3E6OAJde", datasetId: "fB8yPUVaSzNYiw7XB", status: "SUCCEEDED", queriesCount: 50, verticale: "Multi-verticale Chunk 9", resultsCount: 870 },
    { runId: "bivuRtrsbFZhN2mDs", datasetId: "JHdQYQit3CPoZMfe1", status: "FAILED", queriesCount: 50, verticale: "Multi-verticale Chunk 10", resultsCount: 852 },
  ];
}

export interface PipelineStage {
  name: string;
  count: number;
  color: string;
}

export function getPipelineStages(): PipelineStage[] {
  return [
    { name: "Nouveau", count: 8182, color: "#6366f1" },
    { name: "Contacté", count: 178, color: "#f59e0b" },
    { name: "Répondu", count: 0, color: "#22c55e" },
    { name: "RDV Booké", count: 0, color: "#06b6d4" },
    { name: "Deal Won", count: 0, color: "#10b981" },
    { name: "Perdu", count: 0, color: "#ef4444" },
  ];
}
