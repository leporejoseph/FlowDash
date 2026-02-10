import { notFound } from "next/navigation";
import { Panel, StatusBadge } from "@/components/dashboard/ui";
import { agents } from "@/lib/dashboard-data";

export default async function AgentDetailPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const agent = agents.find((item) => item.id === agentId);
  if (!agent) notFound();

  return (
    <div className="page-stack">
      <header>
        <h1>{agent.name}</h1>
        <p>{agent.role}</p>
        <StatusBadge value={agent.status} />
      </header>
      <Panel title="Capabilities">
        <p><strong>Modalities:</strong> {agent.modalities.join(", ")}</p>
        <p><strong>Skills:</strong> {agent.skills.join(", ")}</p>
      </Panel>
      <Panel title="Governance summary">
        <p>{agent.soulSummary}</p>
      </Panel>
    </div>
  );
}
