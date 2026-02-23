import { VERTICALES, getVerticalesByTier } from "@/lib/verticales";

export default function VerticalesPage() {
  const tier1 = getVerticalesByTier(1);
  const tier2 = getVerticalesByTier(2);
  const tier3 = getVerticalesByTier(3);

  return (
    <div className="p-6 max-w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold">📊 Verticales &amp; Niches</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          {VERTICALES.length} verticales analys&eacute;es • Scoring ROI automatique • Cat&eacute;gories Google Maps
        </p>
      </div>

      {/* Tier 1 */}
      <TierSection
        tier={1}
        label="Tier 1 — ROI Maximum"
        subtitle="D&eacute;al value &eacute;lev&eacute;, cycle court, besoin urgent"
        color="#22c55e"
        verticales={tier1}
      />

      {/* Tier 2 */}
      <TierSection
        tier={2}
        label="Tier 2 — ROI Bon"
        subtitle="Volume int&eacute;ressant, deal value moyen"
        color="#f59e0b"
        verticales={tier2}
      />

      {/* Tier 3 */}
      <TierSection
        tier={3}
        label="Tier 3 — Volume"
        subtitle="Masse de prospects, deal value plus bas"
        color="#818cf8"
        verticales={tier3}
      />
    </div>
  );
}

function TierSection({
  tier,
  label,
  subtitle,
  color,
  verticales,
}: {
  tier: number;
  label: string;
  subtitle: string;
  color: string;
  verticales: typeof VERTICALES;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-xs font-bold px-2 py-1 rounded-full"
          style={{ background: `${color}20`, color }}
        >
          TIER {tier}
        </span>
        <div>
          <h2 className="text-lg font-semibold">{label}</h2>
          <p className="text-xs" style={{ color: "var(--muted)" }}>{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {verticales.map((v) => (
          <div
            key={v.id}
            className="rounded-xl p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">
                {v.emoji} {v.name}
              </h3>
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: `${color}20`, color }}
              >
                {v.totalScore}
              </span>
            </div>

            <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
              {v.description}
            </p>

            <div className="mb-3 p-2 rounded-lg" style={{ background: "rgba(239,68,68,0.06)" }}>
              <p className="text-[11px] font-medium" style={{ color: "#ef4444" }}>
                Pain point: {v.painPoint}
              </p>
            </div>

            <div className="mb-3 p-2 rounded-lg" style={{ background: "rgba(34,197,94,0.06)" }}>
              <p className="text-[11px] font-medium" style={{ color: "#22c55e" }}>
                Pitch: {v.pitchAngle}
              </p>
            </div>

            {/* Scoring breakdown */}
            <div className="grid grid-cols-5 gap-1 mb-3">
              <ScoreBar label="Vol." value={v.scoring.callVolume} />
              <ScoreBar label="Val." value={v.scoring.missedCallValue} />
              <ScoreBar label="Buy" value={v.scoring.buyProbability} />
              <ScoreBar label="Mkt" value={v.scoring.marketSize} />
              <ScoreBar label="Spd" value={v.scoring.shortCycle} />
            </div>

            {/* Decision makers */}
            <div className="mb-2">
              <p className="text-[10px] font-medium mb-1" style={{ color: "var(--muted)" }}>
                D&eacute;cideurs:
              </p>
              <div className="flex flex-wrap gap-1">
                {v.decisionMakers.slice(0, 3).map((dm) => (
                  <span
                    key={dm}
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent-light)" }}
                  >
                    {dm}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-[10px] mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <span style={{ color: "var(--muted)" }}>
                Deal: {v.avgDealValue}&euro;/mois
              </span>
              <span style={{ color: "var(--muted)" }}>
                March&eacute;: {v.marketSize.toLocaleString("fr-FR")}
              </span>
              <span style={{ color: "var(--muted)" }}>
                {v.googleMapsCategories.length} cats Google
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const maxHeight = 32;
  const height = (value / 10) * maxHeight;
  const color =
    value >= 8 ? "#22c55e" : value >= 6 ? "#f59e0b" : value >= 4 ? "#818cf8" : "#737373";

  return (
    <div className="text-center">
      <div
        className="mx-auto mb-1 rounded-sm"
        style={{
          width: 12,
          height: maxHeight,
          background: "var(--background)",
          position: "relative",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 rounded-sm"
          style={{ height, background: color }}
        />
      </div>
      <p className="text-[9px]" style={{ color: "var(--muted)" }}>{label}</p>
    </div>
  );
}
