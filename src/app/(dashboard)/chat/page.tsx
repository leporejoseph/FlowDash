"use client";

import { FormEvent, useMemo, useState } from "react";

import { Panel, StatusBadge } from "@/components/dashboard/ui";
import { OrchestratorResponse, OrchestrationEvent } from "@/lib/protocols";

const protocolClass: Record<OrchestrationEvent["protocol"], string> = {
  AG_UI: "status-running",
  ADK: "status-active",
  MCP: "status-beta",
  A2A: "status-healthy",
};

export default function ChatPage() {
  const [input, setInput] = useState("Prepare a Q4 report and email the team.");
  const [result, setResult] = useState<OrchestratorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const protocolCounts = useMemo(() => {
    if (!result) {
      return null;
    }

    return result.events.reduce<Record<string, number>>((acc, event) => {
      acc[event.protocol] = (acc[event.protocol] ?? 0) + 1;
      return acc;
    }, {});
  }, [result]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/runtime/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Could not execute orchestration request.");
      }

      const data = (await response.json()) as OrchestratorResponse;
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page-stack">
      <header>
        <h1>Live Chat</h1>
        <p>
          AG-UI powered orchestration console with ADK routing, MCP tool traces, optional A2A
          delegation, and HITL approvals.
        </p>
      </header>

      <Panel title="Orchestrator conversation">
        <form className="chat-form" onSubmit={handleSubmit}>
          <label htmlFor="prompt">Prompt</label>
          <textarea
            id="prompt"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={3}
          />
          <button className="save-btn" disabled={isLoading} type="submit">
            {isLoading ? "Orchestrating..." : "Run orchestration"}
          </button>
        </form>

        {error ? <p className="error-message">{error}</p> : null}

        {result ? (
          <div className="chat-box">
            <p>
              <strong>You:</strong> {result.userMessage}
            </p>
            <p>
              <strong>Orchestrator Prime:</strong> {result.assistantMessage}
            </p>
            <StatusBadge value={result.requiresApproval ? "needs approval" : "completed"} />
          </div>
        ) : null}
      </Panel>

      <div className="card-grid">
        <Panel title="Structured output (ADK schema)">
          {result ? (
            <div className="page-stack">
              <p className="kpi" style={{ fontSize: "1.2rem" }}>
                {result.structuredOutput.title}
              </p>
              <p>{result.structuredOutput.summary}</p>
              <ul className="list-reset">
                {result.structuredOutput.metrics.map((metric) => (
                  <li className="list-row" key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Run a prompt to see schema-validated structured output.</p>
          )}
        </Panel>

        <Panel title="Policy recommendations">
          {result ? (
            <ul className="list-reset">
              {result.structuredOutput.recommendations.map((item) => (
                <li className="list-row" key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recommendations yet.</p>
          )}
        </Panel>
      </div>

      <Panel title="Protocol event stream">
        {result ? (
          <>
            <div className="link-row">
              {Object.entries(protocolCounts ?? {}).map(([protocol, count]) => (
                <span className={`status-badge ${protocolClass[protocol as keyof typeof protocolClass]}`} key={protocol}>
                  {protocol}: {count}
                </span>
              ))}
            </div>
            <ul className="list-reset" style={{ marginTop: 10 }}>
              {result.events.map((eventItem) => (
                <li className="list-row" key={eventItem.id}>
                  <div>
                    <strong>{eventItem.actor}</strong>
                    <p className="mono" style={{ margin: "4px 0 0" }}>
                      {eventItem.type} • {eventItem.detail}
                    </p>
                  </div>
                  <StatusBadge value={eventItem.protocol} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Run orchestration to inspect AG-UI/A2A/MCP/ADK events.</p>
        )}
      </Panel>
    </div>
  );
}
