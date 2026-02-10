import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/ui";
import { agents } from "@/lib/dashboard-data";

export default function AgentsPage() {
  return (
    <div className="page-stack">
      <header>
        <h1>Agents</h1>
        <p>Agent mesh registry with identity, modalities, and governance links.</p>
      </header>
      <div className="card-grid">
        {agents.map((agent) => (
          <article className="panel" key={agent.id}>
            <h2>{agent.name}</h2>
            <p>{agent.role}</p>
            <StatusBadge value={agent.status} />
            <p><strong>Skills:</strong> {agent.skills.join(", ")}</p>
            <div className="link-row">
              <Link href={`/agents/${agent.id}`}>Open workspace</Link>
              <Link href={`/agents/${agent.id}/soul`}>Soul.md</Link>
              <Link href={`/agents/${agent.id}/card`}>A2A card</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
