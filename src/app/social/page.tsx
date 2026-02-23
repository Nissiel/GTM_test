export default function SocialPage() {
  return (
    <div className="p-6 max-w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold">📱 Social Media Auto-Posting</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          LinkedIn, Reddit, Twitter/X &bull; Publication automatique quotidienne
        </p>
      </div>

      {/* Coming soon banner */}
      <div
        className="rounded-xl p-8 text-center mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))",
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        <p className="text-4xl mb-3">🚧</p>
        <h2 className="text-lg font-bold mb-2">Phase 5 &mdash; En construction</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Auto-posting sur 3 plateformes avec IA content generation
        </p>
      </div>

      {/* Planned features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <PlatformCard
          platform="LinkedIn"
          icon="🔗"
          color="#0077B5"
          features={[
            "Posts quotidiens thought leadership",
            "Partage cas clients & t\u00e9moignages",
            "Engagement automatis\u00e9 (likes, comments)",
            "Ciblage d\u00e9cideurs Formation/Sant\u00e9/Immo",
          ]}
          status="Planifi\u00e9"
        />
        <PlatformCard
          platform="Reddit"
          icon="🤖"
          color="#FF4500"
          features={[
            "Posts dans r/france, r/entrepreneur",
            "R\u00e9ponses aux questions IA/SaaS",
            "Content \u00e9ducatif sur voice AI",
            "Community building",
          ]}
          status="Planifi\u00e9"
        />
        <PlatformCard
          platform="Twitter/X"
          icon="🐦"
          color="#1DA1F2"
          features={[
            "Threads AI & voice tech",
            "Partage m\u00e9triques croissance",
            "Engagement tech community",
            "Launch announcements",
          ]}
          status="Planifi\u00e9"
        />
      </div>

      {/* Content Calendar Mockup */}
      <div
        className="rounded-xl p-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-semibold mb-4">📅 Calendrier de contenu (Semaine type)</h3>
        <div className="grid grid-cols-7 gap-2">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div key={day} className="text-center">
              <p className="text-xs font-medium mb-2" style={{ color: "var(--muted)" }}>{day}</p>
              <div
                className="p-2 rounded-lg space-y-1.5"
                style={{ background: "var(--background)", minHeight: 80 }}
              >
                {day === "Lun" && (
                  <>
                    <Tag color="#0077B5" text="LI: Thought leadership" />
                    <Tag color="#1DA1F2" text="X: Thread IA vocal" />
                  </>
                )}
                {day === "Mar" && <Tag color="#FF4500" text="Reddit: Case study" />}
                {day === "Mer" && (
                  <>
                    <Tag color="#0077B5" text="LI: Demo vid\u00e9o" />
                    <Tag color="#1DA1F2" text="X: Metrics" />
                  </>
                )}
                {day === "Jeu" && <Tag color="#FF4500" text="Reddit: AMA r/SaaS" />}
                {day === "Ven" && (
                  <>
                    <Tag color="#0077B5" text="LI: Newsletter" />
                    <Tag color="#1DA1F2" text="X: Week recap" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformCard({
  platform,
  icon,
  color,
  features,
  status,
}: {
  platform: string;
  icon: string;
  color: string;
  features: string[];
  status: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">
          {icon} {platform}
        </h3>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: `${color}20`, color }}
        >
          {status}
        </span>
      </div>
      <ul className="space-y-2">
        {features.map((f) => (
          <li key={f} className="text-xs flex items-start gap-2" style={{ color: "var(--muted)" }}>
            <span style={{ color }}>&#x25CF;</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tag({ color, text }: { color: string; text: string }) {
  return (
    <div
      className="text-[9px] px-1.5 py-0.5 rounded truncate"
      style={{ background: `${color}15`, color }}
    >
      {text}
    </div>
  );
}
