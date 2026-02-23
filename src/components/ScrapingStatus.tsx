"use client";

import { useState, useEffect } from "react";

interface ApifyRun {
  runId: string;
  datasetId: string;
  status: string;
  queriesCount: number;
  verticale: string;
  resultsCount?: number;
}

export function ScrapingStatus({ runs }: { runs: ApifyRun[] }) {
  const [currentRuns, setCurrentRuns] = useState(runs);

  const statusColors: Record<string, string> = {
    SUCCEEDED: "#22c55e",
    RUNNING: "#f59e0b",
    READY: "#6366f1",
    FAILED: "#ef4444",
  };

  const statusIcons: Record<string, string> = {
    SUCCEEDED: "✅",
    RUNNING: "⏳",
    READY: "🔄",
    FAILED: "❌",
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🕷️ Scraping Apify — France</h3>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{
            background: "rgba(99,102,241,0.15)",
            color: "#818cf8",
          }}
        >
          {currentRuns.filter((r) => r.status === "RUNNING").length} en cours
        </span>
      </div>
      <div className="space-y-2">
        {currentRuns.map((run) => (
          <div
            key={run.runId}
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{ background: "var(--background)" }}
          >
            <span>{statusIcons[run.status] || "❓"}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{run.verticale}</p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {run.queriesCount} requêtes
                {run.resultsCount ? ` • ${run.resultsCount} résultats` : ""}
              </p>
            </div>
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{
                background: `${statusColors[run.status] || "#737373"}20`,
                color: statusColors[run.status] || "#737373",
              }}
            >
              {run.status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg" style={{ background: "rgba(99,102,241,0.08)" }}>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          📍 <strong>930 requêtes</strong> planifiées • 30 villes × 31 catégories •
          Objectif: 50K-100K entreprises France entière
        </p>
      </div>
    </div>
  );
}
