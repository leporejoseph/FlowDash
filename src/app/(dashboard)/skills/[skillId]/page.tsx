import { notFound } from "next/navigation";
import { Panel, StatusBadge } from "@/components/dashboard/ui";
import { skills } from "@/lib/dashboard-data";

export default async function SkillDetailPage({ params }: { params: Promise<{ skillId: string }> }) {
  const { skillId } = await params;
  const skill = skills.find((item) => item.id === skillId);
  if (!skill) notFound();

  return (
    <div className="page-stack">
      <header>
        <h1>{skill.name}</h1>
        <StatusBadge value={skill.lifecycle} />
      </header>
      <Panel title="Schemas">
        <p><strong>Input:</strong> {skill.inputSchema}</p>
        <p><strong>Output:</strong> {skill.outputSchema}</p>
      </Panel>
    </div>
  );
}
