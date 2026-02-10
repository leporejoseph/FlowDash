import { Panel, StatusBadge } from "@/components/dashboard/ui";
import { agents, integrations, jobs, protocolReadiness, workflows } from "@/lib/dashboard-data";

export default function MissionControlPage() {
  const healthyAgents = agents.filter((agent) => agent.status === "healthy").length;
  const openApprovals = jobs.filter((job) => job.status === "needs_approval").length;

  return (
    <div className="page-stack">
      <header>
        <h1>Mission Control</h1>
        <p>Global health, active workflows, incident posture, and protocol readiness for FlowDash.</p>
      </header>

      <div className="kpi-grid">
        <Panel title="Agent mesh health">
          <p className="kpi">
            {healthyAgents}/{agents.length} healthy
          </p>
        </Panel>
        <Panel title="Workflows running">
          <p className="kpi">{workflows.filter((w) => w.status === "running").length}</p>
        </Panel>
        <Panel title="HITL approvals pending">
          <p className="kpi">{openApprovals}</p>
        </Panel>
        <Panel title="Integration warnings">
          <p className="kpi">{integrations.filter((i) => i.health !== "healthy").length}</p>
        </Panel>
      </div>

      <div className="card-grid">
        <Panel title="Active incidents">
          <ul className="list-reset">
            {jobs.slice(0, 3).map((job) => (
              <li key={job.id} className="list-row">
                <strong>{job.title}</strong>
                <StatusBadge value={job.status} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Protocol readiness">
          <ul className="list-reset">
            {protocolReadiness.map((protocol) => (
              <li className="list-row" key={protocol.id}>
                <div>
                  <strong>{protocol.name}</strong>
                  <p style={{ margin: "4px 0 0", color: "#475569" }}>{protocol.coverage}</p>
                </div>
                <StatusBadge value={protocol.readiness} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
