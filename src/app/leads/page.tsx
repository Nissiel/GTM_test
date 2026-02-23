import { LeadsTable } from "@/components/LeadsTable";
import { getLeads, getLeadStats } from "@/lib/leads-data";

export default function LeadsPage() {
  const leads = getLeads();
  const stats = getLeadStats();

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            👥 Base de Leads
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent-light)" }}
            >
              {stats.total}
            </span>
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Toutes les entreprises prospect\u00e9es • Filtrer, trier, enrichir, exporter
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="text-xs px-4 py-2 rounded-lg font-medium"
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            Importer CSV
          </button>
          <button
            className="text-xs px-4 py-2 rounded-lg font-medium"
            style={{ background: "var(--accent)", color: "white" }}
          >
            + Nouveau scraping
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <QuickStat label="Total" value={stats.total} color="#6366f1" />
        <QuickStat label="Avec email" value={stats.withEmail} color="#22c55e" />
        <QuickStat label="Sans email" value={stats.withoutEmail} color="#ef4444" />
        <QuickStat label="Score moyen" value={stats.avgScore} color="#f59e0b" />
        <QuickStat label="Contact\u00e9s" value={stats.byPipeline.contacte} color="#06b6d4" />
      </div>

      {/* Table */}
      <LeadsTable leads={leads} />
    </div>
  );
}

function QuickStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      className="p-3 rounded-lg text-center"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <p className="text-xl font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
        {label}
      </p>
    </div>
  );
}
