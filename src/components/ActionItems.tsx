"use client";

interface ActionItem {
  icon: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium";
  status: "todo" | "in_progress" | "done";
}

export function ActionItems() {
  const items: ActionItem[] = [
    {
      icon: "✅",
      title: "Scraping France — 8,360 leads",
      description: "11 runs terminés. 600/930 requêtes. 330 restantes (limit Apify mensuelle atteinte).",
      priority: "high",
      status: "done",
    },
    {
      icon: "🚨",
      title: "Connecter email sender Instantly",
      description: "8,360 leads prêts mais ne peuvent pas partir sans compte email connecté. Settings → Email Accounts",
      priority: "critical",
      status: "todo",
    },
    {
      icon: "🔑",
      title: "Enrichissement KSPR décideurs",
      description: "8,015 leads avec téléphone. Enrichir avec KSPR pour emails dirigeants. API key prête.",
      priority: "critical",
      status: "todo",
    },
    {
      icon: "🌐",
      title: "Déployer dashboard Vercel",
      description: "Connecter repo GitHub Nissiel/ava-gtm-dashboard au projet Vercel gtm-test.",
      priority: "high",
      status: "in_progress",
    },
    {
      icon: "🤖",
      title: "Automatisation N8N",
      description: "Workflows: Lead Gen auto, Reply Monitor, Missed Call Audit",
      priority: "medium",
      status: "todo",
    },
  ];

  const priorityColors = {
    critical: "#ef4444",
    high: "#f59e0b",
    medium: "#6366f1",
  };

  const statusLabels = {
    todo: "À faire",
    in_progress: "En cours",
    done: "Fait ✅",
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <h3 className="text-lg font-semibold mb-4">⚡ Actions Prioritaires</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg"
            style={{
              background: item.priority === "critical" ? "rgba(239,68,68,0.08)" : "var(--background)",
              border: item.priority === "critical" ? "1px solid rgba(239,68,68,0.3)" : "none",
            }}
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold">{item.title}</p>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase"
                  style={{
                    background: `${priorityColors[item.priority]}20`,
                    color: priorityColors[item.priority],
                  }}
                >
                  {item.priority}
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>{item.description}</p>
            </div>
            <span
              className="text-[10px] font-medium px-2 py-1 rounded-full shrink-0"
              style={{
                background: item.status === "done" ? "rgba(34,197,94,0.15)" : item.status === "in_progress" ? "rgba(245,158,11,0.15)" : "rgba(115,115,115,0.15)",
                color: item.status === "done" ? "#22c55e" : item.status === "in_progress" ? "#f59e0b" : "#737373",
              }}
            >
              {statusLabels[item.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
