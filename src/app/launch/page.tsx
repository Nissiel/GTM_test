"use client";

import { useState } from "react";

// Verticales avec scoring et metadata
const VERTICALES = [
  { id: "dentiste", name: "Cabinets Dentaires", icon: "🦷", score: 97.5, dealValue: "350€/mois", marketSize: "43,000" },
  { id: "medecin", name: "Cabinets Médicaux", icon: "🏥", score: 97, dealValue: "300€/mois", marketSize: "120,000" },
  { id: "immobilier", name: "Agences Immobilières", icon: "🏠", score: 96, dealValue: "400€/mois", marketSize: "35,000" },
  { id: "avocat", name: "Cabinets d'Avocats", icon: "⚖️", score: 94.5, dealValue: "500€/mois", marketSize: "70,000" },
  { id: "formation", name: "Formation / Éducation", icon: "🎓", score: 92.5, dealValue: "250€/mois", marketSize: "65,000" },
  { id: "comptable", name: "Experts-Comptables", icon: "📊", score: 90, dealValue: "350€/mois", marketSize: "22,000" },
  { id: "coiffeur", name: "Salons de Coiffure", icon: "💇", score: 87, dealValue: "150€/mois", marketSize: "85,000" },
  { id: "beaute", name: "Instituts de Beauté", icon: "💅", score: 85, dealValue: "150€/mois", marketSize: "35,000" },
  { id: "veterinaire", name: "Cliniques Vétérinaires", icon: "🐾", score: 88, dealValue: "250€/mois", marketSize: "19,000" },
  { id: "restaurant", name: "Restaurants Haut de Gamme", icon: "🍽️", score: 82, dealValue: "200€/mois", marketSize: "180,000" },
  { id: "plombier", name: "Plombiers / Chauffagistes", icon: "🔧", score: 80, dealValue: "200€/mois", marketSize: "45,000" },
  { id: "electricien", name: "Électriciens", icon: "⚡", score: 79, dealValue: "200€/mois", marketSize: "40,000" },
  { id: "garage", name: "Garages Automobiles", icon: "🚗", score: 78, dealValue: "200€/mois", marketSize: "38,000" },
  { id: "kine", name: "Kinésithérapeutes", icon: "💪", score: 86, dealValue: "250€/mois", marketSize: "90,000" },
  { id: "architecte", name: "Architectes", icon: "📐", score: 83, dealValue: "400€/mois", marketSize: "30,000" },
  { id: "assurance", name: "Courtiers Assurance", icon: "🛡️", score: 81, dealValue: "300€/mois", marketSize: "25,000" },
  { id: "pharmacie", name: "Pharmacies", icon: "💊", score: 76, dealValue: "200€/mois", marketSize: "21,000" },
  { id: "auto_ecole", name: "Auto-Écoles", icon: "🚙", score: 75, dealValue: "150€/mois", marketSize: "12,000" },
  { id: "opticien", name: "Opticiens", icon: "👓", score: 74, dealValue: "200€/mois", marketSize: "12,500" },
  { id: "osteopathe", name: "Ostéopathes", icon: "🦴", score: 84, dealValue: "200€/mois", marketSize: "35,000" },
];

const COUNTRIES = [
  { id: "france", name: "France", flag: "🇫🇷", cities: 36 },
  { id: "belgique", name: "Belgique", flag: "🇧🇪", cities: 10 },
  { id: "suisse", name: "Suisse (Romande)", flag: "🇨🇭", cities: 8 },
  { id: "canada", name: "Canada (Québec)", flag: "🇨🇦", cities: 12 },
];

interface CampaignConfig {
  verticale: string;
  country: string;
  leadCount: number;
  status: "idle" | "scraping" | "enriching" | "uploading" | "launching" | "done" | "error";
  progress: number;
  results: {
    scraped: number;
    enriched: number;
    uploaded: number;
    campaignId: string;
  };
}

export default function LaunchPage() {
  const [selectedVerticale, setSelectedVerticale] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("france");
  const [leadCount, setLeadCount] = useState<number>(500);
  const [campaign, setCampaign] = useState<CampaignConfig | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const verticale = VERTICALES.find((v) => v.id === selectedVerticale);
  const country = COUNTRIES.find((c) => c.id === selectedCountry);

  const estimatedRevenue = verticale
    ? Math.round(leadCount * 0.02 * parseInt(verticale.dealValue))
    : 0;
  const estimatedEmails = Math.round(leadCount * 0.65);
  const estimatedResponses = Math.round(estimatedEmails * 0.08);
  const estimatedRDV = Math.round(estimatedResponses * 0.3);

  const handleLaunch = async () => {
    if (!selectedVerticale || !selectedCountry) return;

    const newCampaign: CampaignConfig = {
      verticale: selectedVerticale,
      country: selectedCountry,
      leadCount,
      status: "scraping",
      progress: 0,
      results: { scraped: 0, enriched: 0, uploaded: 0, campaignId: "" },
    };
    setCampaign(newCampaign);

    // Simulate pipeline execution (in production, this calls the API)
    // Step 1: Scraping
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 200));
      setCampaign((prev) =>
        prev
          ? {
              ...prev,
              status: "scraping",
              progress: i * 0.3,
              results: { ...prev.results, scraped: Math.round((leadCount * i) / 100) },
            }
          : null
      );
    }

    // Step 2: Enriching
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setCampaign((prev) =>
        prev
          ? {
              ...prev,
              status: "enriching",
              progress: 30 + i * 0.35,
              results: { ...prev.results, enriched: Math.round((estimatedEmails * i) / 100) },
            }
          : null
      );
    }

    // Step 3: Uploading
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 100));
      setCampaign((prev) =>
        prev
          ? {
              ...prev,
              status: "uploading",
              progress: 65 + i * 0.2,
              results: { ...prev.results, uploaded: Math.round((estimatedEmails * i) / 100) },
            }
          : null
      );
    }

    // Step 4: Launching
    setCampaign((prev) =>
      prev
        ? {
            ...prev,
            status: "launching",
            progress: 85,
          }
        : null
    );
    await new Promise((r) => setTimeout(r, 1500));

    // Done
    setCampaign((prev) =>
      prev
        ? {
            ...prev,
            status: "done",
            progress: 100,
            results: {
              scraped: leadCount,
              enriched: estimatedEmails,
              uploaded: estimatedEmails,
              campaignId: "4cc21116-672d-43f5-8fb3-d98bcf8e1f01",
            },
          }
        : null
    );
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">🚀 Lancer une Campagne GTM</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Choisis ta verticale, ton pays et le nombre de leads. On fait le reste.
        </p>
      </div>

      {campaign && campaign.status !== "idle" ? (
        /* ==================== CAMPAIGN IN PROGRESS ==================== */
        <div
          className="rounded-xl p-8"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">
              {campaign.status === "done"
                ? "✅"
                : campaign.status === "error"
                  ? "❌"
                  : "⚡"}
            </div>
            <h2 className="text-xl font-bold mb-1">
              {campaign.status === "scraping" && "Scraping en cours..."}
              {campaign.status === "enriching" && "Enrichissement emails..."}
              {campaign.status === "uploading" && "Upload dans Instantly..."}
              {campaign.status === "launching" && "Lancement de la campagne..."}
              {campaign.status === "done" && "Campagne lancée !"}
              {campaign.status === "error" && "Erreur"}
            </h2>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {VERTICALES.find((v) => v.id === campaign.verticale)?.name} •{" "}
              {COUNTRIES.find((c) => c.id === campaign.country)?.flag}{" "}
              {COUNTRIES.find((c) => c.id === campaign.country)?.name}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ background: "var(--background)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${campaign.progress}%`,
                  background:
                    campaign.status === "done"
                      ? "#22c55e"
                      : "linear-gradient(90deg, #6366f1, #818cf8)",
                }}
              />
            </div>
            <p className="text-xs text-center mt-2" style={{ color: "var(--muted)" }}>
              {Math.round(campaign.progress)}%
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--background)" }}>
              <p className="text-2xl font-bold" style={{ color: "#6366f1" }}>
                {campaign.results.scraped.toLocaleString()}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Leads scrapés</p>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--background)" }}>
              <p className="text-2xl font-bold" style={{ color: "#22c55e" }}>
                {campaign.results.enriched.toLocaleString()}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Emails trouvés</p>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--background)" }}>
              <p className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
                {campaign.results.uploaded.toLocaleString()}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Uploadés Instantly</p>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--background)" }}>
              <p className="text-2xl font-bold" style={{ color: "#ef4444" }}>
                {campaign.results.campaignId ? "ACTIVE" : "..."}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Campagne</p>
            </div>
          </div>

          {campaign.status === "done" && (
            <div className="text-center">
              <button
                onClick={() => setCampaign(null)}
                className="px-6 py-3 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: "var(--accent)", color: "white" }}
              >
                Lancer une nouvelle campagne
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ==================== CAMPAIGN CONFIGURATION ==================== */
        <>
          {/* Step 1: Verticale */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              1️⃣ Choisis ta verticale
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {VERTICALES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVerticale(v.id)}
                  className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
                  style={{
                    background:
                      selectedVerticale === v.id
                        ? "rgba(99,102,241,0.15)"
                        : "var(--card)",
                    border: `1px solid ${
                      selectedVerticale === v.id
                        ? "var(--accent)"
                        : "var(--border)"
                    }`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{v.icon}</span>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{
                      background: v.score >= 90 ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                      color: v.score >= 90 ? "#22c55e" : "#f59e0b",
                    }}>
                      {v.score}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{v.name}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                    {v.dealValue} • {v.marketSize} en France
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Country */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              2️⃣ Choisis ton pays
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountry(c.id)}
                  className="p-4 rounded-xl text-center transition-all hover:scale-[1.02]"
                  style={{
                    background:
                      selectedCountry === c.id
                        ? "rgba(99,102,241,0.15)"
                        : "var(--card)",
                    border: `1px solid ${
                      selectedCountry === c.id
                        ? "var(--accent)"
                        : "var(--border)"
                    }`,
                  }}
                >
                  <span className="text-3xl">{c.flag}</span>
                  <p className="text-sm font-medium mt-2">{c.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {c.cities} villes
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Lead count */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              3️⃣ Nombre de leads
            </h2>
            <div className="flex items-center gap-4">
              {[100, 250, 500, 1000, 2000, 5000].map((n) => (
                <button
                  key={n}
                  onClick={() => setLeadCount(n)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background:
                      leadCount === n
                        ? "var(--accent)"
                        : "var(--card)",
                    color: leadCount === n ? "white" : "var(--foreground)",
                    border: `1px solid ${
                      leadCount === n ? "var(--accent)" : "var(--border)"
                    }`,
                  }}
                >
                  {n.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Estimation Panel */}
          {selectedVerticale && (
            <div
              className="rounded-xl p-6 mb-8"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(129,140,248,0.05))",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <h3 className="text-lg font-semibold mb-4">📊 Estimation</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#6366f1" }}>
                    {leadCount.toLocaleString()}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Leads à scraper</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#22c55e" }}>
                    ~{estimatedEmails.toLocaleString()}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Emails (65%)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
                    ~{estimatedResponses}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Réponses (8%)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#ef4444" }}>
                    ~{estimatedRDV}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>RDV bookés (30%)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#06b6d4" }}>
                    ~{estimatedRevenue.toLocaleString()}€
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Revenue potentiel/mois</p>
                </div>
              </div>

              {/* Advanced Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="mt-4 text-xs"
                style={{ color: "var(--accent-light)" }}
              >
                {showAdvanced ? "▼ Masquer les détails" : "▶ Voir les détails de la campagne"}
              </button>

              {showAdvanced && verticale && (
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">Pipeline</p>
                    <ul className="space-y-1" style={{ color: "var(--muted)" }}>
                      <li>1. Scraping PagesJaunes/Google Maps</li>
                      <li>2. Enrichissement email (site web)</li>
                      <li>3. Upload Instantly</li>
                      <li>4. Séquence email 3 étapes (A/B)</li>
                      <li>5. Follow-up automatique</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Séquence email</p>
                    <ul className="space-y-1" style={{ color: "var(--muted)" }}>
                      <li>J0 : Introduction AVA + pain point</li>
                      <li>J+3 : Valeur ajoutée + cas client</li>
                      <li>J+7 : Dernier rappel + CTA booking</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Launch Button */}
          <div className="text-center">
            <button
              onClick={handleLaunch}
              disabled={!selectedVerticale || !selectedCountry}
              className="px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: selectedVerticale
                  ? "linear-gradient(135deg, #6366f1, #818cf8)"
                  : "var(--border)",
                color: "white",
                boxShadow: selectedVerticale
                  ? "0 4px 20px rgba(99,102,241,0.3)"
                  : "none",
              }}
            >
              🚀 Lancer la campagne
            </button>
            <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
              100% gratuit • Scraping + enrichissement + envoi automatisé
            </p>
          </div>
        </>
      )}
    </div>
  );
}
