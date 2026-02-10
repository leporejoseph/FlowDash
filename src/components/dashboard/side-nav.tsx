"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/mission-control", label: "Mission Control" },
  { href: "/chat", label: "Live Chat" },
  { href: "/agents", label: "Agents" },
  { href: "/skills", label: "Skills" },
  { href: "/integrations", label: "Integrations" },
  { href: "/workflows", label: "Workflows" },
  { href: "/jobs", label: "Jobs / HITL Queue" },
  { href: "/components", label: "Components Library" },
  { href: "/settings", label: "Settings" },
];

const quickActions = ["Create Agent", "New Job", "Connect Integration"];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-nav">
      <div>
        <h1 className="brand">FlowDash</h1>
        <p className="brand-subtitle">A2A + ADK Control Plane</p>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} className={`nav-link ${active ? "active" : ""}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <section className="quick-actions">
        <h2>Quick actions</h2>
        <div>
          {quickActions.map((action) => (
            <button key={action} type="button" className="quick-action-btn">
              {action}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
