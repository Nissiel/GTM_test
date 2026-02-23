import { StatCard } from "@/components/StatCard";
import { Pipeline } from "@/components/Pipeline";
import { VerticaleChart } from "@/components/VerticaleChart";
import { ScrapingStatus } from "@/components/ScrapingStatus";
import { CampaignTable } from "@/components/CampaignTable";
import { ActionItems } from "@/components/ActionItems";
import { getDashboardStats, getPipelineStages, getApifyRuns } from "@/lib/data";

export default function Dashboard() {
  const stats = getDashboardStats();
  const pipeline = getPipelineStages();
  const apifyRuns = getApifyRuns();

  const campaigns = [
    {
      name: "🇫🇷 Formation Paris+Lyon — Séquence 1",
      status: "paused" as const,
      totalLeads: 178,
      sent: 0,
      opened: 0,
      replied: 0,
      booked: 0,
    },
  ];

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">🚀 AVA GTM Command Center</h1>
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
            >
              LIVE
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Growth Machine — Réceptionniste IA Vocal • Toutes verticales France
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: "var(--muted)" }}>Dernière mise à jour</p>
          <p className="text-sm font-medium">
            {new Date().toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads.toLocaleString()}
          icon="👥"
          color="#6366f1"
          subtitle={`${stats.totalLeads - stats.withEmail} sans email • KSPR en attente`}
        />
        <StatCard
          title="Avec Téléphone"
          value="8,015"
          icon="📞"
          color="#22c55e"
          subtitle="95.9% des leads"
        />
        <StatCard
          title="Emails Envoyés"
          value="0"
          icon="📨"
          color="#f59e0b"
          subtitle="⚠️ Sender non connecté"
        />
        <StatCard
          title="RDV Bookés"
          value="0"
          icon="📅"
          color="#06b6d4"
          subtitle="cal.com/avafirstai/15min"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Leads Prioritaires"
          value={stats.prioritaire}
          icon="🔥"
          color="#ef4444"
          subtitle="Score ≥ 80"
        />
        <StatCard
          title="Avec Site Web"
          value="7,415"
          icon="🌐"
          color="#818cf8"
          subtitle="88.7% des leads"
        />
        <StatCard
          title="Scraping France"
          value="600/930"
          icon="🕷️"
          color="#a78bfa"
          subtitle="11 runs • 30 villes × 31 catégories"
        />
      </div>

      {/* Pipeline + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Pipeline stages={pipeline} />
        <ActionItems />
      </div>

      {/* Campaigns */}
      <div className="mb-6">
        <CampaignTable campaigns={campaigns} />
      </div>

      {/* Verticales + Scraping */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <VerticaleChart data={stats.byVerticale} />
        <ScrapingStatus runs={apifyRuns} />
      </div>

      {/* Ville breakdown */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="text-lg font-semibold mb-4">📍 Répartition Géographique</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.byVille).map(([ville, count]) => (
            <div
              key={ville}
              className="p-4 rounded-lg text-center"
              style={{ background: "var(--background)" }}
            >
              <p className="text-2xl font-bold" style={{ color: "#6366f1" }}>{count}</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{ville}</p>
            </div>
          ))}
          <div
            className="p-4 rounded-lg text-center"
            style={{ background: "rgba(99,102,241,0.08)", border: "1px dashed var(--border)" }}
          >
            <p className="text-2xl font-bold" style={{ color: "#818cf8" }}>+15</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Autres villes</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          AVA AI Growth Machine • Powered by Instantly + Apify + KSPR + N8N
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          🔗 Instantly Campaign: 4cc21116... • Cal.com: cal.com/avafirstai/15min
        </p>
      </div>
    </div>
  );
}
