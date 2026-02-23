"use client";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color?: string;
  trend?: { value: number; label: string };
}

export function StatCard({ title, value, subtitle, icon, color = "#6366f1", trend }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-6 transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              background: trend.value >= 0 ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
              color: trend.value >= 0 ? "#22c55e" : "#ef4444",
            }}
          >
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
          </span>
        )}
      </div>
      <p className="text-sm mb-1" style={{ color: "var(--muted)" }}>{title}</p>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
      {subtitle && (
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{subtitle}</p>
      )}
    </div>
  );
}
