export type Agent = {
  id: string;
  name: string;
  role: string;
  status: "healthy" | "degraded" | "offline";
  modalities: string[];
  skills: string[];
  soulSummary: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  version: string;
  lifecycle: "active" | "beta" | "deprecated";
  inputSchema: string;
  outputSchema: string;
};

export type Integration = {
  id: string;
  name: string;
  authType: "apiKey" | "oauth" | "serviceAccount";
  health: "healthy" | "warning" | "down";
  blastRadius: "low" | "medium" | "high";
  tools: string[];
};

export type Workflow = {
  id: string;
  name: string;
  owner: string;
  steps: number;
  approvals: number;
  status: "running" | "idle" | "error";
};

export type Job = {
  id: string;
  title: string;
  priority: "P1" | "P2" | "P3";
  status: "queued" | "needs_approval" | "running" | "completed";
  assignedAgent: string;
  reason: string;
};

export const agents: Agent[] = [
  {
    id: "orchestrator",
    name: "Orchestrator Prime",
    role: "Global router + policy guard",
    status: "healthy",
    modalities: ["text", "tool_calls", "streaming"],
    skills: ["routing", "policy-eval", "job-triage"],
    soulSummary: "Mission-first, conservative with privileged actions.",
  },
  {
    id: "ops-analyst",
    name: "Ops Analyst",
    role: "Incident analysis + remediation drafts",
    status: "degraded",
    modalities: ["text", "logs"],
    skills: ["incident-summary", "runbook-mapper"],
    soulSummary: "Fast diagnosis, always cites artifacts.",
  },
  {
    id: "integration-bot",
    name: "Integration Bot",
    role: "MCP tool execution",
    status: "healthy",
    modalities: ["tool_calls", "json"],
    skills: ["tool-invocation", "health-check"],
    soulSummary: "Strictly validates schemas before execution.",
  },
];

export const skills: Skill[] = [
  {
    id: "routing",
    name: "Dynamic Routing",
    category: "orchestration",
    version: "1.4.0",
    lifecycle: "active",
    inputSchema: "TaskIntent + ContextMap",
    outputSchema: "RoutePlan",
  },
  {
    id: "incident-summary",
    name: "Incident Summarizer",
    category: "operations",
    version: "0.9.2",
    lifecycle: "beta",
    inputSchema: "LogChunk[]",
    outputSchema: "IncidentReport",
  },
  {
    id: "policy-eval",
    name: "Policy Evaluator",
    category: "governance",
    version: "2.1.0",
    lifecycle: "active",
    inputSchema: "ActionRequest",
    outputSchema: "PolicyDecision",
  },
];

export const integrations: Integration[] = [
  {
    id: "github",
    name: "GitHub",
    authType: "oauth",
    health: "healthy",
    blastRadius: "medium",
    tools: ["create_issue", "comment_pr", "dispatch_workflow"],
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    authType: "apiKey",
    health: "warning",
    blastRadius: "high",
    tools: ["list_incidents", "ack_incident", "escalate"],
  },
  {
    id: "bigquery",
    name: "BigQuery",
    authType: "serviceAccount",
    health: "healthy",
    blastRadius: "high",
    tools: ["run_query", "create_view"],
  },
];

export const workflows: Workflow[] = [
  {
    id: "incident-war-room",
    name: "Incident War Room",
    owner: "SRE",
    steps: 9,
    approvals: 2,
    status: "running",
  },
  {
    id: "onboarding-automation",
    name: "Client Onboarding",
    owner: "Operations",
    steps: 7,
    approvals: 1,
    status: "idle",
  },
  {
    id: "cost-anomaly-response",
    name: "Cost Anomaly Response",
    owner: "FinOps",
    steps: 11,
    approvals: 3,
    status: "error",
  },
];

export const jobs: Job[] = [
  {
    id: "job-4021",
    title: "Restart failing ingestion workers",
    priority: "P1",
    status: "needs_approval",
    assignedAgent: "orchestrator",
    reason: "Touches production queue workers",
  },
  {
    id: "job-4022",
    title: "Summarize overnight incident log",
    priority: "P2",
    status: "running",
    assignedAgent: "ops-analyst",
    reason: "Customer-impacting degradation",
  },
  {
    id: "job-4023",
    title: "Run weekly integration audit",
    priority: "P3",
    status: "queued",
    assignedAgent: "integration-bot",
    reason: "Scheduled governance task",
  },
];

export const protocolReadiness = [
  {
    id: "ag-ui",
    name: "AG-UI",
    coverage: "streaming + structured UI",
    readiness: "healthy",
  },
  {
    id: "adk",
    name: "Google ADK",
    coverage: "orchestrator + schema output",
    readiness: "healthy",
  },
  {
    id: "mcp",
    name: "MCP",
    coverage: "tool registry + embedded app handoff",
    readiness: "degraded",
  },
  {
    id: "a2a",
    name: "A2A",
    coverage: "agent card discovery + delegation",
    readiness: "beta",
  },
] as const;
