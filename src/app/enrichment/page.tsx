export default function EnrichmentPage() {
  return (
    <div className="p-6 max-w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🔍 Enrichissement D&eacute;cideurs
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent-light)" }}
          >
            KSPR + LinkedIn
          </span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Pipeline automatique : Entreprise &rarr; LinkedIn &rarr; Top 10 d&eacute;cideurs &rarr; Email pro
        </p>
      </div>

      {/* Pipeline visual */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-semibold mb-4">🔄 Pipeline d&apos;enrichissement</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <PipelineStep
            step={1}
            title="Entreprise scrap&eacute;e"
            desc="Google Maps / Apify"
            count={204}
            color="#6366f1"
          />
          <Arrow />
          <PipelineStep
            step={2}
            title="LinkedIn Search"
            desc="Chercher employ&eacute;s"
            count={0}
            color="#818cf8"
          />
          <Arrow />
          <PipelineStep
            step={3}
            title="KSPR Enrichment"
            desc="Email pro via Kaspr"
            count={0}
            color="#f59e0b"
          />
          <Arrow />
          <PipelineStep
            step={4}
            title="D&eacute;cideur qualifi&eacute;"
            desc="Pret pour Instantly"
            count={0}
            color="#22c55e"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatBox label="Entreprises en attente" value="204" color="#6366f1" icon="🏢" />
        <StatBox label="Profils LinkedIn trouv&eacute;s" value="0" color="#818cf8" icon="🔗" />
        <StatBox label="Emails KSPR trouv&eacute;s" value="0" color="#f59e0b" icon="📧" />
        <StatBox label="D&eacute;cideurs qualifi&eacute;s" value="0" color="#22c55e" icon="🎯" />
      </div>

      {/* Decision maker targets */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-semibold mb-4">🎯 Profils cibl&eacute;s par verticale</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TargetCard
            verticale="Formation / &Eacute;ducation"
            emoji="🎓"
            targets={["Directeur G\u00e9n\u00e9ral", "Responsable Admissions", "Directeur Commercial", "Responsable P\u00e9dagogique"]}
          />
          <TargetCard
            verticale="Cabinets Dentaires"
            emoji="🦷"
            targets={["Chirurgien-Dentiste titulaire", "Directeur de clinique", "Office Manager"]}
          />
          <TargetCard
            verticale="Agences Immobili\u00e8res"
            emoji="🏠"
            targets={["Directeur d'agence", "Responsable Commercial", "G\u00e9rant"]}
          />
          <TargetCard
            verticale="Cabinets d'Avocats"
            emoji="⚖️"
            targets={["Associ\u00e9 G\u00e9rant", "Managing Partner", "Office Manager"]}
          />
        </div>
      </div>

      {/* KSPR API Status */}
      <div
        className="rounded-xl p-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-semibold mb-3">⚡ API KSPR (Kaspr)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg" style={{ background: "var(--background)" }}>
            <p className="text-xs" style={{ color: "var(--muted)" }}>Statut</p>
            <p className="text-sm font-medium" style={{ color: "#22c55e" }}>Connect&eacute; &#10003;</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: "var(--background)" }}>
            <p className="text-xs" style={{ color: "var(--muted)" }}>Cr&eacute;dits restants</p>
            <p className="text-sm font-medium">&#8212;</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: "var(--background)" }}>
            <p className="text-xs" style={{ color: "var(--muted)" }}>Endpoint</p>
            <p className="text-xs font-mono" style={{ color: "var(--accent-light)" }}>POST /profile/linkedin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineStep({
  step,
  title,
  desc,
  count,
  color,
}: {
  step: number;
  title: string;
  desc: string;
  count: number;
  color: string;
}) {
  return (
    <div
      className="p-4 rounded-xl min-w-40 text-center shrink-0"
      style={{ background: "var(--background)", border: "1px solid var(--border)" }}
    >
      <div
        className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold"
        style={{ background: color, color: "white" }}
      >
        {step}
      </div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{desc}</p>
      <p className="text-lg font-bold mt-2" style={{ color }}>{count}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="text-xl shrink-0" style={{ color: "var(--muted)" }}>
      &rarr;
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon: string;
}) {
  return (
    <div
      className="p-4 rounded-xl text-center"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <span className="text-2xl">{icon}</span>
      <p className="text-2xl font-bold mt-1" style={{ color }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{label}</p>
    </div>
  );
}

function TargetCard({
  verticale,
  emoji,
  targets,
}: {
  verticale: string;
  emoji: string;
  targets: string[];
}) {
  return (
    <div className="p-4 rounded-lg" style={{ background: "var(--background)" }}>
      <h4 className="text-sm font-medium mb-2">
        {emoji} {verticale}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {targets.map((t) => (
          <span
            key={t}
            className="text-[11px] px-2 py-1 rounded-full"
            style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent-light)" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
