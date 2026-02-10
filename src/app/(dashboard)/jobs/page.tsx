import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/ui";
import { jobs } from "@/lib/dashboard-data";

export default function JobsPage() {
  return (
    <div className="page-stack">
      <header>
        <h1>Jobs / HITL Queue</h1>
        <p>Approval-first queue showing job status, priority, and execution rationale.</p>
      </header>
      <section className="panel">
        <ul className="list-reset">
          {jobs.map((job) => (
            <li key={job.id} className="list-row">
              <div>
                <strong>{job.title}</strong>
                <p>{job.priority} · {job.reason}</p>
              </div>
              <div className="link-row">
                <StatusBadge value={job.status} />
                <Link href={`/jobs/${job.id}`}>View job</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
