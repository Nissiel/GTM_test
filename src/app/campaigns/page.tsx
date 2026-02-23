export default function CampaignsPage() {
  return (
    <div className="p-6 max-w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          📧 Campagnes Email
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
          >
            1 active
          </span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Gestion des campagnes Instantly.ai • Suivi ouvertures, r&eacute;ponses, RDV
        </p>
      </div>

      {/* Campaign Card */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">🇫🇷 Formation Paris+Lyon &mdash; S&eacute;quence 1</h3>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              ID: 4cc21116-672d-43f5-8fb3-d98bcf8e1f01
            </p>
          </div>
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
          >
            ⏸ En pause
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MetricBox label="Leads" value="178" color="#6366f1" />
          <MetricBox label="Envoy&eacute;s" value="0" color="#818cf8" />
          <MetricBox label="Ouverts" value="0" color="#f59e0b" />
          <MetricBox label="R&eacute;pondu" value="0" color="#22c55e" />
          <MetricBox label="RDV Book&eacute;" value="0" color="#06b6d4" />
        </div>

        <div
          className="mt-4 p-3 rounded-lg flex items-center gap-2"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <span>⚠️</span>
          <p className="text-xs" style={{ color: "#ef4444" }}>
            <strong>Action requise:</strong> Connecter un compte email sender dans Instantly pour lancer les envois.
          </p>
        </div>
      </div>

      {/* Sequence */}
      <div
        className="rounded-xl p-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-semibold mb-4">📝 S&eacute;quence Email</h3>
        <div className="space-y-3">
          <SequenceStep
            step={1}
            delay="J+0"
            subject="[Pr&eacute;nom], votre standard t&eacute;l&eacute;phonique perd des clients"
            preview="Chaque appel manqu&eacute; = un client perdu. AVA est une IA qui r&eacute;pond 24/7..."
          />
          <SequenceStep
            step={2}
            delay="J+3"
            subject="Re: {{company}} — ce que j'ai observ&eacute; sur votre site"
            preview="J'ai regard&eacute; votre site et j'ai not&eacute; que..."
          />
          <SequenceStep
            step={3}
            delay="J+7"
            subject="Derni&egrave;re question rapide"
            preview="Juste un dernier message — est-ce que le sujet vous int&eacute;resse ? Un oui/non suffit."
          />
        </div>
      </div>
    </div>
  );
}

function MetricBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{label}</p>
    </div>
  );
}

function SequenceStep({
  step,
  delay,
  subject,
  preview,
}: {
  step: number;
  delay: string;
  subject: string;
  preview: string;
}) {
  return (
    <div
      className="p-4 rounded-lg flex gap-4"
      style={{ background: "var(--background)" }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
        style={{ background: "var(--accent)", color: "white" }}
      >
        {step}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium">{subject}</p>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent-light)" }}
          >
            {delay}
          </span>
        </div>
        <p className="text-xs" style={{ color: "var(--muted)" }}>{preview}</p>
      </div>
    </div>
  );
}
