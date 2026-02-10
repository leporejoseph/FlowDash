# FlowDash Control Plane

FlowDash is a Next.js web app for prototyping an AI orchestration dashboard with protocol-aware UX:

- **AG-UI-style** live event traces in chat
- **Google ADK-style** structured output rendering
- **MCP-style** tool call/result visibility
- **A2A-style** delegation trace points
- **HITL** approval gates for risky operations

## Included sections

- Mission Control
- Live Chat (interactive orchestration run simulator)
- Agents (+ Soul.md and A2A card previews)
- Skills
- Integrations
- Workflows
- Jobs / HITL Queue
- Components Library
- Settings (API keys + MCP server URL saved in localStorage)

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Mock orchestration API

The chat UI calls a local BFF endpoint:

- `POST /api/runtime/execute`

Payload:

```json
{ "message": "Prepare a Q4 report and email the team" }
```

Response includes protocol events and a schema-safe structured output object for UI rendering.
