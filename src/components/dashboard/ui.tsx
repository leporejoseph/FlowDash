import type { ReactNode } from "react";

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function StatusBadge({ value }: { value: string }) {
  return <span className={`status-badge status-${value.replace(/\s+/g, "-")}`}>{value}</span>;
}
