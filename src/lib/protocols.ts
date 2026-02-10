export type Protocol = "AG_UI" | "A2A" | "MCP" | "ADK";

export type AgUiEventType =
  | "agent_thinking"
  | "tool_call"
  | "tool_result"
  | "agent_message"
  | "approval_required"
  | "final_output";

export type EventStatus = "info" | "ok" | "warn";

export type OrchestrationEvent = {
  id: string;
  protocol: Protocol;
  type: AgUiEventType;
  actor: string;
  detail: string;
  status: EventStatus;
  timestamp: string;
};

export type StructuredOutput = {
  title: string;
  summary: string;
  metrics: Array<{ label: string; value: string }>;
  recommendations: string[];
};

export type OrchestratorResponse = {
  requestId: string;
  userMessage: string;
  assistantMessage: string;
  requiresApproval: boolean;
  events: OrchestrationEvent[];
  structuredOutput: StructuredOutput;
};

const baseRecommendations = [
  "Keep destructive actions gated behind human approval.",
  "Prefer MCP tools for deterministic data pulls.",
  "Use A2A hand-off when external specialist agents are available.",
];

export function buildMockOrchestration(userMessage: string): OrchestratorResponse {
  const lower = userMessage.toLowerCase();
  const wantsEmail = lower.includes("email");
  const needsExternalAgent =
    lower.includes("sap") || lower.includes("salesforce") || lower.includes("procurement");
  const needsApproval =
    lower.includes("delete") || lower.includes("restart") || lower.includes("production") || wantsEmail;

  const now = new Date();
  const ts = (offsetSeconds: number) =>
    new Date(now.getTime() + offsetSeconds * 1000).toISOString();

  const events: OrchestrationEvent[] = [
    {
      id: "evt-1",
      protocol: "AG_UI",
      type: "agent_thinking",
      actor: "orchestrator-prime",
      detail: "Parsed request and started ADK routing graph.",
      status: "info",
      timestamp: ts(0),
    },
    {
      id: "evt-2",
      protocol: "ADK",
      type: "tool_call",
      actor: "routing-coordinator",
      detail: "Selected workflow pattern: dispatcher + reviewer.",
      status: "ok",
      timestamp: ts(1),
    },
    {
      id: "evt-3",
      protocol: "MCP",
      type: "tool_call",
      actor: "integration-bot",
      detail: "Invoked MCP tool `integration.health_check`.",
      status: "ok",
      timestamp: ts(2),
    },
    {
      id: "evt-4",
      protocol: "MCP",
      type: "tool_result",
      actor: "integration-bot",
      detail: "Tool returned healthy=7 warning=1 down=0.",
      status: "ok",
      timestamp: ts(3),
    },
  ];

  if (needsExternalAgent) {
    events.push({
      id: "evt-5",
      protocol: "A2A",
      type: "tool_call",
      actor: "orchestrator-prime",
      detail: "Delegated sub-task to external enterprise agent card endpoint.",
      status: "info",
      timestamp: ts(4),
    });
    events.push({
      id: "evt-6",
      protocol: "A2A",
      type: "tool_result",
      actor: "external-specialist",
      detail: "Received artifact bundle with structured action plan.",
      status: "ok",
      timestamp: ts(5),
    });
  }

  if (needsApproval) {
    events.push({
      id: "evt-7",
      protocol: "AG_UI",
      type: "approval_required",
      actor: "policy-evaluator",
      detail: "Action touches privileged system. Waiting for user approval.",
      status: "warn",
      timestamp: ts(6),
    });
  }

  events.push({
    id: "evt-8",
    protocol: "AG_UI",
    type: "final_output",
    actor: "orchestrator-prime",
    detail: "Emitted schema-validated response payload.",
    status: "ok",
    timestamp: ts(7),
  });

  return {
    requestId: `req-${Math.random().toString(36).slice(2, 10)}`,
    userMessage,
    assistantMessage:
      "I orchestrated the request across ADK routing, MCP tools, and optional A2A delegation. Review the protocol trace and structured output below.",
    requiresApproval: needsApproval,
    events,
    structuredOutput: {
      title: "Orchestration run summary",
      summary:
        "Run completed with protocol-aware traceability. Output is schema-safe for rendering in dashboard cards, tables, or embedded UI blocks.",
      metrics: [
        { label: "Protocols exercised", value: needsExternalAgent ? "AG-UI, ADK, MCP, A2A" : "AG-UI, ADK, MCP" },
        { label: "Approval gates", value: needsApproval ? "1 pending" : "0 pending" },
        { label: "MCP tool latency", value: "~320ms (mock)" },
      ],
      recommendations: wantsEmail
        ? [...baseRecommendations, "Confirm recipients before sending email actions."]
        : baseRecommendations,
    },
  };
}
