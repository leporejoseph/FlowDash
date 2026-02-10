import { notFound } from "next/navigation";
import { agents } from "@/lib/dashboard-data";

export default async function AgentCardPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const agent = agents.find((item) => item.id === agentId);
  if (!agent) notFound();

  return (
    <div className="page-stack">
      <header>
        <h1>{agent.name} A2A Card</h1>
        <p>Preview of <code>/.well-known/agent.json</code> with capabilities and endpoints.</p>
      </header>
      <section className="panel">
        <pre className="editor">{JSON.stringify({
          id: agent.id,
          name: agent.name,
          description: agent.role,
          modalities: agent.modalities,
          skills: agent.skills,
          endpoints: ["/a2a/invoke", "/a2a/events"],
        }, null, 2)}</pre>
      </section>
    </div>
  );
}
