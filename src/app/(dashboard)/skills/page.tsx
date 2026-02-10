import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/ui";
import { skills } from "@/lib/dashboard-data";

export default function SkillsPage() {
  return (
    <div className="page-stack">
      <header>
        <h1>Skills</h1>
        <p>Typed skill registry with versions, categories, and lifecycle visibility.</p>
      </header>
      <section className="panel">
        <ul className="list-reset">
          {skills.map((skill) => (
            <li key={skill.id} className="list-row">
              <div>
                <strong>{skill.name}</strong>
                <p>{skill.category} · v{skill.version}</p>
              </div>
              <div className="link-row">
                <StatusBadge value={skill.lifecycle} />
                <Link href={`/skills/${skill.id}`}>Details</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
