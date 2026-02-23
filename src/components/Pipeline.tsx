"use client";

interface PipelineStage {
  name: string;
  count: number;
  color: string;
}

export function Pipeline({ stages }: { stages: PipelineStage[] }) {
  const totalLeads = stages.reduce((sum, s) => sum + s.count, 0);

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <h3 className="text-lg font-semibold mb-4">🎯 Pipeline</h3>
      <div className="flex gap-1 mb-4 h-3 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        {stages.map((stage) => (
          <div
            key={stage.name}
            style={{
              width: totalLeads > 0 ? `${(stage.count / totalLeads) * 100}%` : "0%",
              background: stage.color,
              minWidth: stage.count > 0 ? "4px" : "0",
            }}
            className="transition-all duration-500"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {stages.map((stage) => (
          <div
            key={stage.name}
            className="flex items-center gap-2 p-2 rounded-lg"
            style={{ background: stage.count > 0 ? `${stage.color}10` : "transparent" }}
          >
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ background: stage.color }}
            />
            <div className="min-w-0">
              <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{stage.name}</p>
              <p className="text-lg font-bold">{stage.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
