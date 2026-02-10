import { notFound } from "next/navigation";
import { Panel, StatusBadge } from "@/components/dashboard/ui";
import { jobs } from "@/lib/dashboard-data";

export default async function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = jobs.find((item) => item.id === jobId);
  if (!job) notFound();

  return (
    <div className="page-stack">
      <header>
        <h1>{job.title}</h1>
        <StatusBadge value={job.status} />
      </header>
      <Panel title="Execution details">
        <p><strong>Priority:</strong> {job.priority}</p>
        <p><strong>Assigned agent:</strong> {job.assignedAgent}</p>
        <p><strong>Reason:</strong> {job.reason}</p>
      </Panel>
      <Panel title="Runbook action">
        <p>Approval action should include rationale and artifact references for audit logging.</p>
      </Panel>
    </div>
  );
}
