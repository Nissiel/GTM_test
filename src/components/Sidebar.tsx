"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: "🚀" },
  { href: "/leads", label: "Leads", icon: "👥", badge: "204" },
  { href: "/campaigns", label: "Campagnes", icon: "📧" },
  { href: "/enrichment", label: "Enrichissement", icon: "🔍" },
  { href: "/verticales", label: "Verticales", icon: "📊" },
  { href: "/scraping", label: "Scraping", icon: "🕷️" },
  { href: "/social", label: "Social Media", icon: "📱" },
];

const BOTTOM_ITEMS: NavItem[] = [
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-56 flex flex-col z-50"
      style={{
        background: "var(--card)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ background: "var(--accent)", color: "white" }}
        >
          A
        </div>
        <div>
          <p className="text-sm font-bold">AVA GTM</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>
            Command Center
          </p>
        </div>
      </div>

      {/* Separator */}
      <div
        className="mx-3 mb-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      />

      {/* Main Nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
              style={{
                background: isActive ? "rgba(99,102,241,0.12)" : "transparent",
                color: isActive ? "var(--accent-light)" : "var(--foreground)",
              }}
            >
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(99,102,241,0.15)",
                    color: "var(--accent-light)",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 space-y-0.5">
        <div
          className="mx-1 mb-2"
          style={{ borderBottom: "1px solid var(--border)" }}
        />
        {BOTTOM_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
            style={{ color: "var(--muted)" }}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
        <div
          className="mx-1 mt-2 p-3 rounded-lg"
          style={{ background: "rgba(99,102,241,0.06)" }}
        >
          <p className="text-[10px] font-medium" style={{ color: "var(--accent-light)" }}>
            Apify: Plan upgrade needed
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
            930 queries en attente
          </p>
        </div>
      </div>
    </aside>
  );
}
