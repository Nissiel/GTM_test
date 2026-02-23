"use client";

interface CampaignData {
  name: string;
  status: string;
  totalLeads: number;
  sent: number;
  opened: number;
  replied: number;
  booked: number;
}

export function CampaignTable({ campaigns }: { campaigns: CampaignData[] }) {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <h3 className="text-lg font-semibold mb-4">📧 Campagnes Email</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="text-left text-xs font-medium py-3 px-2" style={{ color: "var(--muted)" }}>Campagne</th>
              <th className="text-center text-xs font-medium py-3 px-2" style={{ color: "var(--muted)" }}>Status</th>
              <th className="text-right text-xs font-medium py-3 px-2" style={{ color: "var(--muted)" }}>Leads</th>
              <th className="text-right text-xs font-medium py-3 px-2" style={{ color: "var(--muted)" }}>Envoyés</th>
              <th className="text-right text-xs font-medium py-3 px-2" style={{ color: "var(--muted)" }}>Ouverts</th>
              <th className="text-right text-xs font-medium py-3 px-2" style={{ color: "var(--muted)" }}>Répondu</th>
              <th className="text-right text-xs font-medium py-3 px-2" style={{ color: "var(--muted)" }}>RDV</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.name} style={{ borderBottom: "1px solid var(--border)" }}>
                <td className="py-3 px-2">
                  <p className="text-sm font-medium">{c.name}</p>
                </td>
                <td className="py-3 px-2 text-center">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{
                      background: c.status === "active" ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                      color: c.status === "active" ? "#22c55e" : "#f59e0b",
                    }}
                  >
                    {c.status === "active" ? "🟢 Actif" : "⏸️ En pause"}
                  </span>
                </td>
                <td className="py-3 px-2 text-right text-sm font-bold">{c.totalLeads}</td>
                <td className="py-3 px-2 text-right text-sm">{c.sent}</td>
                <td className="py-3 px-2 text-right text-sm">
                  {c.opened}
                  {c.sent > 0 && (
                    <span className="text-xs ml-1" style={{ color: "var(--muted)" }}>
                      ({Math.round((c.opened / c.sent) * 100)}%)
                    </span>
                  )}
                </td>
                <td className="py-3 px-2 text-right text-sm font-bold" style={{ color: c.replied > 0 ? "#22c55e" : "inherit" }}>
                  {c.replied}
                </td>
                <td className="py-3 px-2 text-right text-sm font-bold" style={{ color: c.booked > 0 ? "#06b6d4" : "inherit" }}>
                  {c.booked}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
