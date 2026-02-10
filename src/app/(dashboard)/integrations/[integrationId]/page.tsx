import { notFound } from "next/navigation";
import { Panel, StatusBadge } from "@/components/dashboard/ui";
import { integrations } from "@/lib/dashboard-data";

export default async function IntegrationDetailPage({ params }: { params: Promise<{ integrationId: string }> }) {
  const { integrationId } = await params;
  const integration = integrations.find((item) => item.id === integrationId);
  if (!integration) notFound();

  return (
    <div className="page-stack">
      <header>
        <h1>{integration.name}</h1>
        <StatusBadge value={integration.health} />
      </header>
      <Panel title="Trust posture">
        <p><strong>Auth type:</strong> {integration.authType}</p>
        <p><strong>Blast radius:</strong> {integration.blastRadius}</p>
      </Panel>
      <Panel title="Exposed tools">
        <ul>
          {integration.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
