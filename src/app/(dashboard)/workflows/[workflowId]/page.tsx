import { notFound } from "next/navigation";
import { Panel, StatusBadge } from "@/components/dashboard/ui";
import { workflows } from "@/lib/dashboard-data";

export default async function WorkflowDetailPage({ params }: { params: Promise<{ workflowId: string }> }) {
  const { workflowId } = await params;
  const workflow = workflows.find((item) => item.id === workflowId);
  if (!workflow) notFound();

  return (
    <div className="page-stack">
      <header>
        <h1>{workflow.name}</h1>
        <StatusBadge value={workflow.status} />
      </header>
      <Panel title="Graph summary">
        <p><strong>Owner:</strong> {workflow.owner}</p>
        <p><strong>Total steps:</strong> {workflow.steps}</p>
        <p><strong>Approval gates:</strong> {workflow.approvals}</p>
      </Panel>
    </div>
  );
}
