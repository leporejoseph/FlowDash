import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/ui";
import { workflows } from "@/lib/dashboard-data";

export default function WorkflowsPage() {
  return (
    <div className="page-stack">
      <header>
        <h1>Workflows</h1>
        <p>Composed multi-agent flows with routing policy and approval gate counts.</p>
      </header>
      <section className="panel">
        <ul className="list-reset">
          {workflows.map((workflow) => (
            <li className="list-row" key={workflow.id}>
              <div>
                <strong>{workflow.name}</strong>
                <p>{workflow.steps} steps · {workflow.approvals} approval gates</p>
              </div>
              <div className="link-row">
                <StatusBadge value={workflow.status} />
                <Link href={`/workflows/${workflow.id}`}>Open graph</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
