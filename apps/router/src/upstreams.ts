import type { AgentTarget } from "./policy.js";

export function getUpstream(target: AgentTarget): string {
  switch (target) {
    case "openclaw":
      return process.env.OPENCLAW_UPSTREAM || "http://host.docker.internal:18789";
    case "openhands":
      return process.env.OPENHANDS_UPSTREAM || "http://host.docker.internal:3000";
    case "deerflow":
      return process.env.DEERFLOW_UPSTREAM || "http://host.docker.internal:2026";
    case "n8n":
      return process.env.N8N_HOST || "http://n8n:5678";
  }
}
