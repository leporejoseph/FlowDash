const components = [
  { name: "Approval Card", purpose: "Capture approve/reject + rationale" },
  { name: "Event Timeline", purpose: "Render AG-UI streaming events" },
  { name: "Agent Card Editor", purpose: "Validate and export agent.json" },
  { name: "Integration Health Chip", purpose: "Show auth and blast radius posture" },
];

export default function ComponentsPage() {
  return (
    <div className="page-stack">
      <header>
        <h1>Components Library</h1>
        <p>Reusable building blocks for agent-aware and protocol-aware app surfaces.</p>
      </header>
      <section className="panel">
        <ul className="list-reset">
          {components.map((item) => (
            <li key={item.name} className="list-row">
              <strong>{item.name}</strong>
              <span>{item.purpose}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
