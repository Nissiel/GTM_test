export default function SettingsPage() {
  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold">⚙️ Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Configuration des APIs et int&eacute;grations
        </p>
      </div>

      <div className="space-y-4">
        <ApiCard
          name="Instantly.ai"
          icon="📧"
          status="connected"
          details="Campaign: 4cc21116... | 178 leads import&eacute;s"
          color="#22c55e"
        />
        <ApiCard
          name="Apify"
          icon="🕷️"
          status="limit"
          details="Limite mensuelle atteinte — upgrade requis"
          color="#f59e0b"
        />
        <ApiCard
          name="KSPR (Kaspr)"
          icon="🔍"
          status="connected"
          details="API connect&eacute;e — POST /profile/linkedin"
          color="#22c55e"
        />
        <ApiCard
          name="Cal.com"
          icon="📅"
          status="connected"
          details="cal.com/avafirstai/15min"
          color="#22c55e"
        />
        <ApiCard
          name="Notion"
          icon="📝"
          status="connected"
          details="Pipeline AVA GTM — 51 leads"
          color="#22c55e"
        />
        <ApiCard
          name="N8N"
          icon="⚡"
          status="planned"
          details="Automatisation workflows — Phase 4"
          color="#818cf8"
        />
      </div>
    </div>
  );
}

function ApiCard({
  name,
  icon,
  status,
  details,
  color,
}: {
  name: string;
  icon: string;
  status: "connected" | "limit" | "planned" | "error";
  details: string;
  color: string;
}) {
  const statusLabel = {
    connected: "Connect\u00e9",
    limit: "Limite",
    planned: "Planifi\u00e9",
    error: "Erreur",
  }[status];

  return (
    <div
      className="rounded-xl p-5 flex items-center justify-between"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{details}</p>
        </div>
      </div>
      <span
        className="text-xs font-medium px-3 py-1 rounded-full"
        style={{ background: `${color}20`, color }}
      >
        {statusLabel}
      </span>
    </div>
  );
}
