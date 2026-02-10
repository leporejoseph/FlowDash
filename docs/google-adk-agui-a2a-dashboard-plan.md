# Google ADK + AG-UI + A2A Orchestrator Dashboard Plan

## 1) Product goal
Build a **unique multi-agent operations dashboard** that combines:
- **Google ADK** for agent/runtime abstraction and task execution.
- **A2A protocol** for inter-agent communication and routing.
- **AG-UI patterns** for streaming stateful UI updates.
- **MCP integrations** for external tools and enterprise systems.

The dashboard should feel like a **mission control center** for orchestrating, monitoring, and approving agent work across skills, integrations, and HITL gates.

---

## 2) Unique product concept: “FlowDash Control Plane”
Instead of a generic admin panel, position this as:

- **Control Plane**: observability + governance + execution.
- **Agent Mesh**: every specialist agent appears as a node with skills/apps/resources.
- **Approval-first Ops**: jobs move through queue/review/approval/rejection flows.
- **Protocol-aware UI**: each page reflects A2A/AG-UI/ADK primitives.

Core differentiation from example apps:
1. **Multi-pane workflow**: side menu + context panel + live event stream.
2. **Agent Card fidelity**: native editing + validation of `/.well-known/agent.json`.
3. **Soul.md governance**: global and per-agent identity/policy editor.
4. **Tool trust posture**: integration health, auth type, blast radius tags.
5. **Runbook-first actions**: every critical action captures reason + artifact trace.

---

## 3) Information architecture (must-have side menu)

### Side menu sections
1. **Mission Control**
   - Global health KPIs, active workflows, incidents.
2. **Live Chat**
   - Orchestrator chat + streaming AG-UI updates.
3. **Agents**
   - Agent list, profile, capabilities, Soul.md, A2A card.
4. **Skills**
   - Skill registry, schemas, assignment matrix.
5. **Integrations**
   - MCP/API connections, tools, auth, status.
6. **Workflows**
   - Composed multi-agent flows, routing policies.
7. **Jobs / HITL Queue**
   - Approval queue + historical audit log.
8. **Components Library**
   - UI snippets/templates for agent apps.
9. **Settings**
   - Runtime config, model config, data export/reset.

### UX behavior
- **Desktop**: persistent left side rail + collapsible labels.
- **Tablet/mobile**: slide-over drawer with overlay.
- **Quick actions** in side menu footer: “Create Agent”, “New Job”, “Connect Integration”.

---

## 4) Domain model and bounded contexts

### Core entities
- `Agent`: identity, capability flags, supported modalities, status.
- `Skill`: typed input/output schema, category, version, lifecycle.
- `Integration`: connector definition + tools + auth + health.
- `Job`: unit of execution with status, priority, artifacts, HITL reason.
- `Workflow`: graph of agent steps + routing/approval gates.
- `SoulProfile`: markdown policy/personality with inheritance.
- `AgentCard`: A2A representation exposed at `/.well-known/agent.json`.

### Bounded contexts
1. **Control Plane**: settings, audit, governance.
2. **Runtime Orchestration**: task routing, execution, retries.
3. **Protocol Gateway**: A2A, AG-UI events, MCP bridge.
4. **Catalog**: skills/components/integrations lifecycle.

---

## 5) Proposed technical architecture

## Frontend (Next.js App Router)
- React + TypeScript + shared design tokens.
- Side menu shell + route groups for each domain.
- Real-time updates via SSE/WebSocket for AG-UI events.
- Local optimistic state + server-synced stores.

### Backend/API
- Next.js API routes as BFF for UI.
- Runtime adapters:
  - **Google ADK adapter** (task execution).
  - **A2A adapter** (agent discovery/card exchange/routing).
  - **MCP adapter** (tool calls and app resources).
- Event bus abstraction for streaming job and chat events.

### MCP server
- Keep existing `mcp-server` and add orchestrator-aware tools:
  - job lifecycle tools
  - agent introspection tools
  - integration health tools

### Storage
- Start: local storage + JSON persistence for rapid prototyping.
- Next: PostgreSQL + Redis (queues/cache) + object storage for artifacts.

---

## 6) Suggested file/folder architecture tree

```text
FlowDash/
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                       # Shell: side menu + top bar + content outlet
│   │   │   ├── mission-control/page.tsx         # Global KPIs + incidents + active workflows
│   │   │   ├── chat/page.tsx                    # Orchestrator chat + AG-UI stream panel
│   │   │   ├── agents/
│   │   │   │   ├── page.tsx                     # Agent grid/list
│   │   │   │   ├── [agentId]/page.tsx           # Agent detail workspace
│   │   │   │   ├── [agentId]/soul/page.tsx      # Soul.md editor
│   │   │   │   └── [agentId]/card/page.tsx      # A2A card preview/export
│   │   │   ├── skills/
│   │   │   │   ├── page.tsx                     # Skills registry
│   │   │   │   └── [skillId]/page.tsx           # Skill detail + schema + assignments
│   │   │   ├── integrations/
│   │   │   │   ├── page.tsx                     # Integrations list + filters
│   │   │   │   └── [integrationId]/page.tsx     # Integration details + tools + agents
│   │   │   ├── workflows/
│   │   │   │   ├── page.tsx                     # Workflow catalog
│   │   │   │   └── [workflowId]/page.tsx        # Graph editor + runbook view
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx                     # Queue + history
│   │   │   │   └── [jobId]/page.tsx             # Job details, approvals, artifacts
│   │   │   ├── components/page.tsx              # Template/component library
│   │   │   └── settings/page.tsx                # Runtime + model + backup/reset
│   │   ├── api/
│   │   │   ├── copilotkit/[[...slug]]/route.ts # Existing CopilotKit endpoint
│   │   │   ├── agents/route.ts                  # CRUD agents
│   │   │   ├── skills/route.ts                  # CRUD skills
│   │   │   ├── integrations/route.ts            # CRUD integrations
│   │   │   ├── jobs/route.ts                    # Job queue + transitions
│   │   │   ├── workflows/route.ts               # Workflow CRUD/runs
│   │   │   ├── a2a/
│   │   │   │   ├── route.ts                     # Agent discovery/card federation
│   │   │   │   └── stream/route.ts              # A2A/AG-UI event stream
│   │   │   └── runtime/
│   │   │       ├── execute/route.ts             # ADK execution endpoint
│   │   │       └── health/route.ts              # Runtime/integration health
│   │   ├── layout.tsx
│   │   ├── page.tsx                             # Marketing/landing or redirect to dashboard
│   │   └── globals.css
│   ├── components/
│   │   ├── shell/
│   │   │   ├── side-menu.tsx                    # Required side navigation
│   │   │   ├── top-bar.tsx
│   │   │   └── command-palette.tsx
│   │   ├── agents/
│   │   │   ├── agent-card.tsx
│   │   │   ├── capability-toggles.tsx
│   │   │   ├── soul-editor.tsx
│   │   │   └── a2a-card-preview.tsx
│   │   ├── skills/
│   │   │   ├── skill-card.tsx
│   │   │   └── schema-viewer.tsx
│   │   ├── integrations/
│   │   │   ├── integration-card.tsx
│   │   │   └── tool-chip-list.tsx
│   │   ├── jobs/
│   │   │   ├── approval-panel.tsx
│   │   │   └── artifact-list.tsx
│   │   ├── workflows/
│   │   │   ├── workflow-canvas.tsx
│   │   │   └── run-timeline.tsx
│   │   └── common/
│   │       ├── badge.tsx
│   │       ├── status-dot.tsx
│   │       ├── modal.tsx
│   │       ├── field.tsx
│   │       └── table.tsx
│   ├── lib/
│   │   ├── design-tokens.ts
│   │   ├── storage/
│   │   │   ├── keys.ts
│   │   │   ├── seed-data.ts
│   │   │   └── migrations.ts
│   │   ├── protocols/
│   │   │   ├── a2a.ts                            # A2A DTOs + validators
│   │   │   ├── agui-events.ts                    # Stream event types
│   │   │   └── agent-card.ts                     # Agent card schema helpers
│   │   ├── runtime/
│   │   │   ├── adk-client.ts                     # Google ADK adapter
│   │   │   ├── orchestrator.ts                   # Task routing logic
│   │   │   ├── workflow-engine.ts                # Flow execution + retries
│   │   │   └── hitl.ts                           # Approval policy engine
│   │   ├── integrations/
│   │   │   ├── mcp-client.ts
│   │   │   ├── health-checks.ts
│   │   │   └── auth.ts
│   │   └── utils/
│   │       ├── id.ts
│   │       ├── dates.ts
│   │       └── validation.ts
│   ├── hooks/
│   │   ├── use-media-query.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-event-stream.ts
│   │   └── use-debounced-search.ts
│   ├── types/
│   │   ├── agent.ts
│   │   ├── skill.ts
│   │   ├── integration.ts
│   │   ├── job.ts
│   │   └── workflow.ts
│   └── tests/
│       ├── unit/
│       └── e2e/
├── mcp-server/
│   ├── server.ts
│   ├── src/
│   │   ├── flights.ts
│   │   ├── hotels.ts
│   │   ├── stocks.ts
│   │   ├── kanban.ts
│   │   ├── orchestrator-tools.ts                # New: job/agent/workflow tools
│   │   └── integration-tools.ts                 # New: integration diagnostics
│   └── apps/
│       ├── flights-app.html
│       ├── hotels-app.html
│       ├── trading-app.html
│       ├── kanban-app.html
│       └── ops-console-app.html                 # New: embedded MCP ops widget
├── docs/
│   ├── google-adk-agui-a2a-dashboard-plan.md    # This document
│   ├── ADR-001-architecture.md
│   ├── ADR-002-protocol-boundaries.md
│   └── API-CONTRACTS.md
└── README.md
```

---

## 7) Page-level implementation plan

### Phase 1 — Shell + navigation + seeds
- Build dashboard route group and side menu shell.
- Split the single monolithic component into route-based pages.
- Move constants/seeds/tokens into `lib/` and `types/`.

### Phase 2 — Agents + Skills + Integrations
- Agent detail workspace with tabs: overview, skills, apps, resources, soul, card.
- Skill registry with schema viewer and assignment insights.
- Integration center with status filters and connect/disconnect flows.

### Phase 3 — Jobs + HITL + audit
- Queue-first review experience.
- Approval/rejection actions with reason capture.
- Job details modal/page with artifact timeline.

### Phase 4 — Runtime adapters
- Add ADK execution adapter.
- Add A2A gateway and stream routes.
- Add AG-UI event stream to chat/jobs/workflow pages.

### Phase 5 — Workflow graph + governance
- Workflow editor (node/edge graph).
- Policy packs: safety, confidence thresholds, escalation rules.
- Audit trail and export.

---

## 8) Data contracts (minimum v1)

- `Agent.status`: `active | idle | error`
- `Job.status`: `pending_review | approved | rejected | in_progress | completed`
- `Integration.status`: `connected | disconnected | error`
- `Skill.status`: `active | draft | deprecated`

Validation recommendations:
- Zod schemas for all request/response payloads.
- Runtime schema checks before persisting or streaming.
- Agent card JSON lint + “copy valid JSON” action.

---

## 9) Non-functional requirements
- **Performance**: first meaningful paint < 2s on local demo.
- **Scalability**: list virtualization for 1k+ jobs.
- **Reliability**: event replay for dropped stream connections.
- **Security**: redact secrets, scoped API keys, per-integration auth vault.
- **Auditability**: immutable job transitions and reviewer metadata.

---

## 10) Suggested rollout milestones
1. **M1 (1 week)**: side menu shell + Agents/Skills/Integrations pages.
2. **M2 (1 week)**: Jobs queue + detail + approvals.
3. **M3 (1–2 weeks)**: A2A + AG-UI streaming integration.
4. **M4 (1 week)**: workflow graph + policy packs + hardening.

