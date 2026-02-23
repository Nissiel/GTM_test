export default function ScrapingPage() {
  return (
    <div className="p-6 max-w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold">🕷️ Scraping &amp; Sources</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Apify Google Maps • 600/930 requêtes • 30 villes × 31 catégories
        </p>
      </div>

      {/* Apify Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatBox label="Requêtes lancées" value="600" color="#6366f1" />
        <StatBox label="Runs terminés" value="11" color="#22c55e" />
        <StatBox label="Leads uniques" value="8,360" color="#22c55e" />
        <StatBox label="En attente" value="330" color="#f59e0b" />
      </div>

      {/* Progress bar */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">📊 Progression Scraping</h3>
          <span className="text-sm font-bold" style={{ color: "#6366f1" }}>64.5%</span>
        </div>
        <div className="w-full h-3 rounded-full" style={{ background: "var(--background)" }}>
          <div
            className="h-3 rounded-full"
            style={{
              width: "64.5%",
              background: "linear-gradient(90deg, #6366f1, #818cf8)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-xs" style={{ color: "var(--muted)" }}>600 requêtes traitées</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>330 restantes (limit Apify atteinte)</p>
        </div>
      </div>

      {/* Runs */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-semibold mb-4">📦 Runs Apify ({11} runs)</h3>
        <div className="space-y-3">
          <RunCard
            runId="WMS8gIAQ5rqzyghf0"
            datasetId="1R95ndihhQhYmX7Pv"
            status="SUCCEEDED"
            queries={30}
            results={447}
            verticale="Formation Paris+Lyon (original)"
          />
          <RunCard
            runId="JH3n4GsiBgmTidFfm"
            datasetId="d75bTGRX0avyXyzJ8"
            status="SUCCEEDED"
            queries={50}
            results={579}
            verticale="Formation France - Batch 1"
          />
          <RunCard
            runId="gLcR1g5PhdOFUwQRw"
            datasetId="KVOtVsZexVIpJCvd7"
            status="SUCCEEDED"
            queries={50}
            results={395}
            verticale="Formation + Auto-école France"
          />
          <RunCard
            runId="BwMU7MRjkqHZpNKL5"
            datasetId="fBvNu8dFcJUjiwZAC"
            status="SUCCEEDED"
            queries={50}
            results={947}
            verticale="Multi-verticale Chunk 3"
          />
          <RunCard
            runId="XFD7PTtDDYQdWODxO"
            datasetId="KFWY4BoPSH7GwZMig"
            status="SUCCEEDED"
            queries={50}
            results={925}
            verticale="Multi-verticale Chunk 4"
          />
          <RunCard
            runId="mOb8hvAId5vETHbYP"
            datasetId="mKkV3YSzTfRSKPqWz"
            status="SUCCEEDED"
            queries={50}
            results={912}
            verticale="Multi-verticale Chunk 5"
          />
          <RunCard
            runId="EBJwkNWs9qnOnDr2H"
            datasetId="SlXorLlzSLhf8CfcU"
            status="SUCCEEDED"
            queries={50}
            results={921}
            verticale="Multi-verticale Chunk 6"
          />
          <RunCard
            runId="VvsH1PuPTHa1vnIe7"
            datasetId="6vTJdV8EPwbYz8qVR"
            status="SUCCEEDED"
            queries={50}
            results={914}
            verticale="Multi-verticale Chunk 7"
          />
          <RunCard
            runId="si1VpqXtNqdk1JK21"
            datasetId="79cWMFzVOeYKTNj76"
            status="SUCCEEDED"
            queries={50}
            results={855}
            verticale="Multi-verticale Chunk 8"
          />
          <RunCard
            runId="UWkYvTtUA3E6OAJde"
            datasetId="fB8yPUVaSzNYiw7XB"
            status="SUCCEEDED"
            queries={50}
            results={870}
            verticale="Multi-verticale Chunk 9"
          />
          <RunCard
            runId="bivuRtrsbFZhN2mDs"
            datasetId="JHdQYQit3CPoZMfe1"
            status="FAILED"
            queries={50}
            results={852}
            verticale="Multi-verticale Chunk 10"
          />
        </div>
      </div>

      {/* Query Map */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-semibold mb-4">🗺️ Couverture Géographique (30 villes)</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {[
            { ville: "Strasbourg", count: 549 },
            { ville: "Lille", count: 529 },
            { ville: "Bordeaux", count: 527 },
            { ville: "Nice", count: 513 },
            { ville: "Nantes", count: 510 },
            { ville: "Reims", count: 507 },
            { ville: "Rennes", count: 499 },
            { ville: "Toulouse", count: 453 },
            { ville: "Le Havre", count: 446 },
            { ville: "Saint-Étienne", count: 445 },
            { ville: "Grenoble", count: 443 },
            { ville: "Toulon", count: 409 },
            { ville: "Montpellier", count: 381 },
            { ville: "Paris", count: 371 },
            { ville: "Lyon", count: 168 },
            { ville: "Dijon", count: 71 },
            { ville: "Marseille", count: 59 },
          ].map((item) => (
            <div
              key={item.ville}
              className="p-2 rounded-lg text-center"
              style={{ background: "var(--background)" }}
            >
              <p className="text-sm font-bold" style={{ color: "#6366f1" }}>{item.count}</p>
              <p className="text-[10px]" style={{ color: "var(--muted)" }}>{item.ville}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div
        className="rounded-xl p-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-semibold mb-4">🏷️ Catégories Google Maps (20 verticales)</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { cat: "Centre de formation", count: 353 },
            { cat: "Formation continue", count: 316 },
            { cat: "Dentiste", count: 287 },
            { cat: "Auto-école", count: 273 },
            { cat: "Expert-comptable", count: 255 },
            { cat: "Kinésithérapeute", count: 254 },
            { cat: "Salon de coiffure", count: 254 },
            { cat: "Enseignement supérieur", count: 251 },
            { cat: "Agence immobilière", count: 248 },
            { cat: "Plombier", count: 246 },
            { cat: "Hôtel", count: 246 },
            { cat: "Électricien", count: 239 },
            { cat: "Institut de beauté", count: 238 },
            { cat: "Agence de voyages", count: 238 },
            { cat: "Crèche", count: 236 },
            { cat: "Fleuriste", count: 229 },
            { cat: "Ostéopathe", count: 216 },
            { cat: "Coach sportif", count: 193 },
            { cat: "Nettoyage", count: 192 },
            { cat: "Photographe", count: 178 },
          ].map((item) => (
            <span
              key={item.cat}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent-light)" }}
            >
              {item.cat} ({item.count})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="p-4 rounded-xl text-center"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{label}</p>
    </div>
  );
}

function RunCard({
  runId,
  datasetId,
  status,
  queries,
  results,
  verticale,
}: {
  runId: string;
  datasetId: string;
  status: string;
  queries: number;
  results: number;
  verticale: string;
}) {
  const statusColor =
    status === "SUCCEEDED"
      ? "#22c55e"
      : status === "RUNNING"
        ? "#f59e0b"
        : "#ef4444";

  return (
    <div
      className="p-4 rounded-lg flex items-center justify-between"
      style={{ background: "var(--background)" }}
    >
      <div>
        <p className="text-sm font-medium">{verticale}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
          Run: {runId.substring(0, 8)}... | Dataset: {datasetId.substring(0, 8)}...
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-bold">{results.toLocaleString()}</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>{queries} queries</p>
        </div>
        <span
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{ background: `${statusColor}20`, color: statusColor }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
