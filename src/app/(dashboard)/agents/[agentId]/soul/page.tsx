import { notFound } from "next/navigation";
import { agents } from "@/lib/dashboard-data";

export default async function AgentSoulPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const agent = agents.find((item) => item.id === agentId);
  if (!agent) notFound();

  return (
    <div className="page-stack">
      <header>
        <h1>{agent.name} Soul.md</h1>
        <p>Identity and policy profile with inheritance from global governance.</p>
      </header>
      <section className="panel">
        <pre className="editor">{`# Soul Profile: ${agent.name}

## Mission
${agent.soulSummary}

## Guardrails
- Require human approval for high-blast actions.
- Cite runbook and artifact before execution.
- Log policy decisions in audit trail.
`}</pre>
      </section>
    </div>
  );
}
