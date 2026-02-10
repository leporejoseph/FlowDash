import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/ui";
import { integrations } from "@/lib/dashboard-data";

export default function IntegrationsPage() {
  return (
    <div className="page-stack">
      <header>
        <h1>Integrations</h1>
        <p>MCP/API connectors with authentication posture, tools, and runtime health.</p>
      </header>
      <div className="card-grid">
        {integrations.map((integration) => (
          <article className="panel" key={integration.id}>
            <h2>{integration.name}</h2>
            <StatusBadge value={integration.health} />
            <p><strong>Auth:</strong> {integration.authType}</p>
            <p><strong>Blast radius:</strong> {integration.blastRadius}</p>
            <p><strong>Tools:</strong> {integration.tools.join(", ")}</p>
            <Link href={`/integrations/${integration.id}`}>Open integration</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
